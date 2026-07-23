"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Staggered reveal of a container's direct children. `mode="scroll"` plays
 * once when the block enters the viewport; `mode="load"` plays immediately
 * (for the above-the-fold hero sequence).
 *
 * Reduced motion: the whole tween lives inside a gsap.matchMedia
 * no-preference branch, so reduced-motion users never have their content
 * hidden — the resting DOM is the final, visible state (gsap.from pattern),
 * and progressive-enhancement means no-JS keeps everything visible too.
 */
export function Reveal({
  children,
  className,
  mode = "scroll",
  y = 24,
  stagger = 0.09,
  delay = 0,
  duration = 0.7,
}: {
  children: ReactNode;
  className?: string;
  mode?: "scroll" | "load";
  y?: number;
  stagger?: number;
  delay?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = el.children;
        if (!targets.length) return;

        const vars: gsap.TweenVars = {
          autoAlpha: 0,
          y,
          duration,
          ease: "power3.out",
          stagger,
          delay,
        };
        if (mode === "scroll") {
          vars.scrollTrigger = { trigger: el, start: "top 82%", once: true };
        }
        gsap.from(targets, vars);
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
