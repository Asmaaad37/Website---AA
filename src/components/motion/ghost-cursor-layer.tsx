"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";

// Code-split: three + the effect live in a separate chunk that is only
// fetched when <GhostCursor /> actually renders — i.e. never in the initial
// bundle, and never on mobile / reduced-motion.
const GhostCursor = dynamic(
  () => import("./ghost-cursor").then((m) => m.GhostCursor),
  { ssr: false },
);

const QUERY = "(pointer: fine) and (prefers-reduced-motion: no-preference)";

/** True only on fine-pointer devices with motion allowed. */
function useDesktopMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(QUERY);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(QUERY).matches,
    () => false, // SSR: assume off, so nothing ships to first paint
  );
}

/**
 * Global amber cursor glow. Renders nothing until (a) the device qualifies
 * and (b) the user actually moves the pointer — so three.js is fetched on
 * first move, keeping LCP and the initial bundle untouched everywhere.
 */
export function GhostCursorLayer() {
  const enabled = useDesktopMotion();
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (!enabled || armed) return;
    const onMove = () => setArmed(true);
    window.addEventListener("pointermove", onMove, {
      once: true,
      passive: true,
    });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, armed]);

  if (!enabled || !armed) return null;

  return (
    <div className="ghost-cursor-layer" aria-hidden>
      <GhostCursor />
    </div>
  );
}
