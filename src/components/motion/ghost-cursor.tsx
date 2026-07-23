"use client";

// Ported to TypeScript from React Bits (GhostCursor). Heavy: pulls in
// three + postprocessing, so it is ONLY ever rendered by GhostCursorLayer,
// which lazy-loads it on the first pointer move for fine-pointer +
// no-reduced-motion desktops. Never mounts on mobile / reduced-motion, and
// is code-split out of the initial bundle.
//
// Changes vs the original: global pointer tracking on `window` (so the
// full-screen overlay can stay pointer-events:none and never block clicks),
// an idle-timeout that lets the render loop stop when the cursor rests, and
// amber defaults to match the brand.

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

const baseVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float iTime;
  uniform vec3  iResolution;
  uniform vec2  iMouse;
  uniform vec2  iPrevMouse[MAX_TRAIL_LENGTH];
  uniform float iOpacity;
  uniform float iScale;
  uniform vec3  iBaseColor;
  uniform float iBrightness;
  uniform float iEdgeIntensity;
  varying vec2  vUv;

  float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7))) * 43758.5453123); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    f *= f * (3. - 2. * f);
    return mix(mix(hash(i + vec2(0.,0.)), hash(i + vec2(1.,0.)), f.x),
               mix(hash(i + vec2(0.,1.)), hash(i + vec2(1.,1.)), f.x), f.y);
  }
  float fbm(vec2 p){
    float v = 0.0;
    float a = 0.5;
    mat2 m = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for(int i=0;i<5;i++){
      v += a * noise(p);
      p = m * p * 2.0;
      a *= 0.5;
    }
    return v;
  }
  vec3 tint1(vec3 base){ return mix(base, vec3(1.0), 0.15); }
  vec3 tint2(vec3 base){ return mix(base, vec3(0.8, 0.9, 1.0), 0.25); }

  vec4 blob(vec2 p, vec2 mousePos, float intensity, float activity) {
    vec2 q = vec2(fbm(p * iScale + iTime * 0.1), fbm(p * iScale + vec2(5.2,1.3) + iTime * 0.1));
    vec2 r = vec2(fbm(p * iScale + q * 1.5 + iTime * 0.15), fbm(p * iScale + q * 1.5 + vec2(8.3,2.8) + iTime * 0.15));

    float smoke = fbm(p * iScale + r * 0.8);
    float radius = 0.5 + 0.3 * (1.0 / iScale);
    float distFactor = 1.0 - smoothstep(0.0, radius * activity, length(p - mousePos));
    float alpha = pow(smoke, 2.5) * distFactor;

    vec3 c1 = tint1(iBaseColor);
    vec3 c2 = tint2(iBaseColor);
    vec3 color = mix(c1, c2, sin(iTime * 0.5) * 0.5 + 0.5);

    return vec4(color * alpha * intensity, alpha * intensity);
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy / iResolution.xy * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);
    vec2 mouse = (iMouse * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);

    vec3 colorAcc = vec3(0.0);
    float alphaAcc = 0.0;

    vec4 b = blob(uv, mouse, 1.0, iOpacity);
    colorAcc += b.rgb;
    alphaAcc += b.a;

    for (int i = 0; i < MAX_TRAIL_LENGTH; i++) {
      vec2 pm = (iPrevMouse[i] * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);
      float t = 1.0 - float(i) / float(MAX_TRAIL_LENGTH);
      t = pow(t, 2.0);
      if (t > 0.01) {
        vec4 bt = blob(uv, pm, t * 0.8, iOpacity);
        colorAcc += bt.rgb;
        alphaAcc += bt.a;
      }
    }

    colorAcc *= iBrightness;

    vec2 uv01 = gl_FragCoord.xy / iResolution.xy;
    float edgeDist = min(min(uv01.x, 1.0 - uv01.x), min(uv01.y, 1.0 - uv01.y));
    float distFromEdge = clamp(edgeDist * 2.0, 0.0, 1.0);
    float k = clamp(iEdgeIntensity, 0.0, 1.0);
    float edgeMask = mix(1.0 - k, 1.0, distFromEdge);

    float outAlpha = clamp(alphaAcc * iOpacity * edgeMask, 0.0, 1.0);
    gl_FragColor = vec4(colorAcc, outAlpha);
  }
`;

const filmGrainVertex = `
  varying vec2 vUv;
  void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;
const filmGrainFragment = `
  uniform sampler2D tDiffuse;
  uniform float iTime;
  uniform float intensity;
  varying vec2 vUv;
  float hash1(float n){ return fract(sin(n)*43758.5453); }
  void main(){
    vec4 color = texture2D(tDiffuse, vUv);
    float n = hash1(vUv.x*1000.0 + vUv.y*2000.0 + iTime) * 2.0 - 1.0;
    color.rgb += n * intensity * color.rgb;
    gl_FragColor = color;
  }
`;
const unpremultiplyFragment = `
  uniform sampler2D tDiffuse;
  varying vec2 vUv;
  void main(){
    vec4 c = texture2D(tDiffuse, vUv);
    float a = max(c.a, 1e-5);
    vec3 straight = c.rgb / a;
    gl_FragColor = vec4(clamp(straight, 0.0, 1.0), c.a);
  }
`;

export function GhostCursor({
  color = "#AEB4BD", // greyish smoke, not amber
  brightness = 1.0,
  edgeIntensity = 0,
  trailLength = 26,
  inertia = 0.5,
  grainIntensity = 0.04,
  bloomStrength = 0.08,
  bloomRadius = 1.0,
  bloomThreshold = 0.02,
  maxDevicePixelRatio = 0.5,
  targetPixels = 1.3e6,
  fadeDelayMs = 900,
  fadeDurationMs = 1400,
}: {
  color?: string;
  brightness?: number;
  edgeIntensity?: number;
  trailLength?: number;
  inertia?: number;
  grainIntensity?: number;
  bloomStrength?: number;
  bloomRadius?: number;
  bloomThreshold?: number;
  maxDevicePixelRatio?: number;
  targetPixels?: number;
  fadeDelayMs?: number;
  fadeDurationMs?: number;
}) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let active = true;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        depth: false,
        stencil: false,
        powerPreference: "high-performance",
        premultipliedAlpha: false,
        preserveDrawingBuffer: false,
      });
    } catch {
      return; // no WebGL — silently no-op
    }

    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.pointerEvents = "none";
    renderer.domElement.style.mixBlendMode = "screen";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geom = new THREE.PlaneGeometry(2, 2);

    const maxTrail = Math.max(1, Math.floor(trailLength));
    const trailBuf = Array.from(
      { length: maxTrail },
      () => new THREE.Vector2(0.5, 0.5),
    );
    let head = 0;

    const baseColor = new THREE.Color(color);
    const material = new THREE.ShaderMaterial({
      defines: { MAX_TRAIL_LENGTH: maxTrail },
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector3(1, 1, 1) },
        iMouse: { value: new THREE.Vector2(0.5, 0.5) },
        iPrevMouse: { value: trailBuf.map((v) => v.clone()) },
        iOpacity: { value: 1.0 },
        iScale: { value: 1.0 },
        iBaseColor: {
          value: new THREE.Vector3(baseColor.r, baseColor.g, baseColor.b),
        },
        iBrightness: { value: brightness },
        iEdgeIntensity: { value: edgeIntensity },
      },
      vertexShader: baseVertexShader,
      fragmentShader,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });

    scene.add(new THREE.Mesh(geom, material));

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(1, 1),
      bloomStrength,
      bloomRadius,
      bloomThreshold,
    );
    composer.addPass(bloomPass);

    const filmPass = new ShaderPass({
      uniforms: {
        tDiffuse: { value: null },
        iTime: { value: 0 },
        intensity: { value: grainIntensity },
      },
      vertexShader: filmGrainVertex,
      fragmentShader: filmGrainFragment,
    });
    composer.addPass(filmPass);

    composer.addPass(
      new ShaderPass({
        uniforms: { tDiffuse: { value: null } },
        vertexShader: filmGrainVertex,
        fragmentShader: unpremultiplyFragment,
      }),
    );

    const calcScale = () => {
      const r = host.getBoundingClientRect();
      const current = Math.min(Math.max(1, r.width), Math.max(1, r.height));
      return Math.max(0.5, Math.min(2.0, current / 600));
    };

    let hasSize = false;
    const resize = () => {
      if (!active) return;
      const rect = host.getBoundingClientRect();
      const cssW = Math.floor(rect.width);
      const cssH = Math.floor(rect.height);
      if (cssW <= 0 || cssH <= 0) {
        hasSize = false;
        return;
      }
      const dpr = Math.min(window.devicePixelRatio || 1, maxDevicePixelRatio);
      const need = cssW * cssH * dpr * dpr;
      const scale =
        need <= targetPixels
          ? 1
          : Math.max(0.5, Math.min(1, Math.sqrt(targetPixels / Math.max(1, need))));
      const pixelRatio = dpr * scale;

      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(cssW, cssH, false);
      composer.setPixelRatio?.(pixelRatio);
      composer.setSize(cssW, cssH);

      const wpx = Math.max(1, Math.floor(cssW * pixelRatio));
      const hpx = Math.max(1, Math.floor(cssH * pixelRatio));
      material.uniforms.iResolution.value.set(wpx, hpx, 1);
      material.uniforms.iScale.value = calcScale();
      bloomPass.setSize(wpx, hpx);
      hasSize = true;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const currentMouse = new THREE.Vector2(0.5, 0.5);
    const velocity = new THREE.Vector2(0, 0);
    let fadeOpacity = 1.0;
    let lastMoveTime = performance.now();
    let pointerActive = false;
    let running = false;
    let rafId = 0;
    const start = performance.now();

    const animate = () => {
      if (!active) return;
      if (!hasSize) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      const now = performance.now();
      const t = (now - start) / 1000;

      // Treat the cursor as "stopped" shortly after the last move so the
      // effect can fade out and the loop can shut down when idle.
      if (pointerActive && now - lastMoveTime > 80) pointerActive = false;

      if (pointerActive) {
        velocity.set(
          currentMouse.x - material.uniforms.iMouse.value.x,
          currentMouse.y - material.uniforms.iMouse.value.y,
        );
        material.uniforms.iMouse.value.copy(currentMouse);
        fadeOpacity = 1.0;
      } else {
        velocity.multiplyScalar(inertia);
        if (velocity.lengthSq() > 1e-6) {
          material.uniforms.iMouse.value.add(velocity);
        }
        const dt = now - lastMoveTime;
        if (dt > fadeDelayMs) {
          const k = Math.min(1, (dt - fadeDelayMs) / fadeDurationMs);
          fadeOpacity = Math.max(0, 1 - k);
        }
      }

      const N = trailBuf.length;
      head = (head + 1) % N;
      trailBuf[head].copy(material.uniforms.iMouse.value);
      const arr = material.uniforms.iPrevMouse.value as THREE.Vector2[];
      for (let i = 0; i < N; i++) {
        const srcIdx = (head - i + N) % N;
        arr[i].copy(trailBuf[srcIdx]);
      }

      material.uniforms.iOpacity.value = fadeOpacity;
      material.uniforms.iTime.value = t;
      filmPass.uniforms.iTime.value = t;

      composer.render();

      if (!pointerActive && fadeOpacity <= 0.001) {
        running = false;
        rafId = 0;
        return;
      }
      rafId = requestAnimationFrame(animate);
    };

    const ensureLoop = () => {
      if (!running) {
        running = true;
        rafId = requestAnimationFrame(animate);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      const x = THREE.MathUtils.clamp(
        (e.clientX - rect.left) / Math.max(1, rect.width),
        0,
        1,
      );
      const y = THREE.MathUtils.clamp(
        1 - (e.clientY - rect.top) / Math.max(1, rect.height),
        0,
        1,
      );
      currentMouse.set(x, y);
      pointerActive = true;
      lastMoveTime = performance.now();
      ensureLoop();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    ensureLoop();

    return () => {
      active = false;
      hasSize = false;
      if (rafId) cancelAnimationFrame(rafId);
      running = false;
      window.removeEventListener("pointermove", onPointerMove);
      ro.disconnect();
      scene.clear();
      geom.dispose();
      material.dispose();
      composer.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
    // Props are static (set once by GhostCursorLayer); run once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={hostRef} className="ghost-cursor" aria-hidden />;
}
