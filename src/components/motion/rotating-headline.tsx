"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// The rotating-word effect (à la the shadcn "animated-hero"), rebuilt with
// GSAP so we don't add framer-motion, and styled to our brand.
const WORDS = ["profession", "discipline", "skill", "craft", "calling"];
const INTERVAL_MS = 2200;

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

export function RotatingHeadline({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const firstRun = useRef(true);

  // Advance the word on an interval — never under reduced motion.
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % WORDS.length),
      INTERVAL_MS,
    );
    return () => clearInterval(id);
  }, [reduced]);

  useGSAP(
    () => {
      if (reduced) return;
      wordsRef.current.forEach((w, i) => {
        if (!w) return;
        const vars = {
          yPercent: i === index ? 0 : i < index ? -120 : 120,
          autoAlpha: i === index ? 1 : 0,
        };
        if (firstRun.current) gsap.set(w, vars);
        else gsap.to(w, { ...vars, duration: 0.6, ease: "back.out(1.4)" });
      });
      firstRun.current = false;
    },
    { dependencies: [index, reduced] },
  );

  return (
    <h1 className={className}>
      <span className="block">Trade like it&rsquo;s a</span>
      {reduced ? (
        <span className="block font-semibold text-phosphor">{WORDS[0]}</span>
      ) : (
        <span className="relative block h-[1.25em] overflow-hidden">
          {WORDS.map((word, i) => (
            <span
              key={word}
              ref={(el) => {
                wordsRef.current[i] = el;
              }}
              className="absolute left-0 top-0 font-semibold text-phosphor"
            >
              {word}
            </span>
          ))}
        </span>
      )}
    </h1>
  );
}
