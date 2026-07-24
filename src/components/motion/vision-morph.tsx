"use client";

import { useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Real photos (anas-2..8). Order is arbitrary; repeats are fine in a
// decorative ring.
const CARDS = [
  "anas-2",
  "anas-3",
  "anas-4",
  "anas-5",
  "anas-7",
  "anas-8",
  "anas-6",
  "anas-4",
] as const;

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(REDUCED_QUERY);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => true,
  );
}

// --- position maths (offsets from stage centre; +y = down) ---
function circlePos(i: number, n: number, w: number, h: number) {
  const R = Math.min(Math.min(w, h) * 0.32, 280);
  const ang = (i / n) * Math.PI * 2 - Math.PI / 2;
  return {
    x: Math.cos(ang) * R,
    y: Math.sin(ang) * R,
    rotation: (ang * 180) / Math.PI + 90,
    scale: 1,
  };
}
function arcPos(i: number, n: number, w: number, h: number) {
  const mobile = w < 768;
  const spread = mobile ? 112 : 142; // degrees the fan covers
  const startA = -90 - spread / 2;
  const step = spread / (n - 1);
  const bigR = Math.min(w, h * 1.4) * (mobile ? 1.25 : 0.95);
  const apex = h * (mobile ? 0.2 : 0.16); // arch apex above centre
  const a = startA + i * step;
  const rad = (a * Math.PI) / 180;
  return {
    x: Math.cos(rad) * bigR,
    y: Math.sin(rad) * bigR + (bigR - apex),
    rotation: a + 90,
    scale: mobile ? 1.15 : 1.4,
  };
}

export function VisionMorph() {
  const reduced = usePrefersReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (reduced) return;
      const stage = stageRef.current;
      if (!stage) return;
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      const n = cards.length;
      if (!n) return;

      const w0 = stage.clientWidth;
      const h0 = stage.clientHeight;
      cards.forEach((card, i) => {
        const c = circlePos(i, n, w0, h0);
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          x: c.x,
          y: c.y,
          rotation: c.rotation,
          scale: c.scale,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: "+=140%",
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Function-based targets re-evaluate on refresh (resize/orientation).
      cards.forEach((card, i) => {
        tl.to(
          card,
          {
            x: () => arcPos(i, n, stage.clientWidth, stage.clientHeight).x,
            y: () => arcPos(i, n, stage.clientWidth, stage.clientHeight).y,
            rotation: () =>
              arcPos(i, n, stage.clientWidth, stage.clientHeight).rotation,
            scale: () =>
              arcPos(i, n, stage.clientWidth, stage.clientHeight).scale,
            ease: "none",
          },
          0,
        );
      });

      tl.to(".vision-center", { autoAlpha: 0, scale: 0.92, ease: "none" }, 0);
    },
    { scope: stageRef, dependencies: [reduced] },
  );

  // Reduced-motion: no pin/scrub — a calm static gallery with the heading.
  if (reduced) {
    return (
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
        <p className="tabular text-xs uppercase tracking-widest text-phosphor">
          The vision
        </p>
        <h2 className="font-display mt-3 max-w-2xl text-3xl leading-tight tracking-tight sm:text-4xl">
          I am waiting for you at the top.
        </h2>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {CARDS.slice(0, 4).map((n, i) => (
            <div
              key={`${n}-${i}`}
              className="tick-rule relative aspect-[3/4] overflow-hidden rounded-md border"
            >
              <Image
                src={`/media/${n}.jpg`}
                alt=""
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={stageRef} className="relative h-[100svh] w-full overflow-hidden">
      <div className="vision-center pointer-events-none absolute left-1/2 top-1/2 z-10 w-full max-w-md -translate-x-1/2 -translate-y-1/2 px-5 text-center">
        <p className="tabular text-xs uppercase tracking-widest text-phosphor">
          The vision
        </p>
        <h2 className="font-display mt-2 text-3xl leading-tight tracking-tight sm:text-4xl">
          I am waiting for you at the top.
        </h2>
      </div>

      {CARDS.map((name, i) => (
        <div
          key={`${name}-${i}`}
          ref={(el) => {
            cardsRef.current[i] = el;
          }}
          className="absolute left-1/2 top-1/2 h-[110px] w-[78px] sm:h-[150px] sm:w-[106px]"
        >
          <div className="tick-rule relative h-full w-full overflow-hidden rounded-md border shadow-lg">
            <Image
              src={`/media/${name}.jpg`}
              alt=""
              fill
              sizes="120px"
              className="object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
