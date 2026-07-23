"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Drives Lenis smooth-scroll off the GSAP ticker (the current, correct
 * wiring — the old scrollerProxy pattern is obsolete). Lenis scrolls the
 * window, so ScrollTrigger's default scroller works with no proxy.
 *
 * Accessibility: under prefers-reduced-motion we DON'T instantiate Lenis
 * at all — native scroll only, as required. GSAP animations self-gate via
 * gsap.matchMedia in the individual components.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis();

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
