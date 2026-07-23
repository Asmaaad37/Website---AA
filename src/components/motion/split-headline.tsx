"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * Mask reveal for the hero headline: the text rises in from behind a clip.
 *
 * Deliberately plugin-free — a block-level overflow-clip + transform gets
 * the same "rise from behind the line" feel as GSAP SplitText's line-mask
 * without shipping the SplitText plugin (~28KB), keeping marketing-route JS
 * under the 180KB budget. Reduced-motion users get the plain heading (the
 * resting state is fully visible), and no-JS keeps it visible too.
 */
export function SplitHeadline({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const inner = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = inner.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(el, {
          yPercent: 115,
          duration: 0.9,
          ease: "power4.out",
        });
      });
    },
    { scope: inner },
  );

  return (
    <h1 className={`overflow-hidden pb-[0.12em] ${className ?? ""}`}>
      <span ref={inner} className="block">
        {text}
      </span>
    </h1>
  );
}
