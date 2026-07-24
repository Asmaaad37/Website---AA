"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

const QUERY = "(pointer: fine) and (prefers-reduced-motion: no-preference)";

function useDesktopMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(QUERY);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}

/**
 * A frosted-glass lens that follows the cursor. Unlike a WebGL lens (which
 * can only refract its own scene), CSS backdrop-filter samples the REAL page
 * behind it — so it actually frosts/brightens the content under the cursor.
 * Cheap (no three.js, no 3D model), desktop-only, off under reduced motion.
 * Position + fade are driven by CSS variables + a transform transition, so
 * there's no per-frame JS loop.
 */
export function GlassCursor() {
  const enabled = useDesktopMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      el.style.setProperty("--x", `${e.clientX}px`);
      el.style.setProperty("--y", `${e.clientY}px`);
      el.dataset.active = "true";
    };
    const onLeave = () => {
      el.dataset.active = "false";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return <div ref={ref} className="glass-cursor" data-active="false" aria-hidden />;
}
