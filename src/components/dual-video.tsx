"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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

export type VideoItem = {
  poster: string;
  webm: string;
  mp4: string;
  label: string;
};

function SoundIcon({ on }: { on: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
      {on ? (
        <>
          <path d="M15.5 8.5a5 5 0 0 1 0 7" />
          <path d="M18.5 6a9 9 0 0 1 0 12" />
        </>
      ) : (
        <path d="M22 9l-6 6M16 9l6 6" />
      )}
    </svg>
  );
}

/**
 * Two portrait videos side by side. Autoplay muted+loop (paused under
 * reduced motion), each with a sound toggle — unmuting one mutes the other
 * so two audio tracks never play at once. Entrance animation is gated to
 * no-reduced-motion.
 */
export function DualVideo({ videos }: { videos: [VideoItem, VideoItem] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [unmuted, setUnmuted] = useState<number | null>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const el = rootRef.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = el.querySelectorAll("[data-video-item]");
        gsap.from(items, {
          autoAlpha: 0,
          y: 30,
          scale: 0.96,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        });
      });
    },
    { scope: rootRef },
  );

  const toggle = (i: number) => {
    const next = unmuted === i ? null : i;
    setUnmuted(next);
    videoRefs.current.forEach((v, idx) => {
      if (!v) return;
      v.muted = idx !== next;
      if (idx === next && v.paused) void v.play().catch(() => {});
    });
  };

  return (
    <div ref={rootRef} className="mx-auto grid max-w-2xl grid-cols-2 gap-3 sm:gap-5">
      {videos.map((v, i) => (
        <figure
          key={v.mp4}
          data-video-item
          className="tick-rule relative aspect-[9/16] overflow-hidden rounded-sm border bg-surface/40"
        >
          <video
            ref={(el) => {
              videoRefs.current[i] = el;
              // React's `muted` attribute is unreliable — set the property.
              if (el) el.muted = unmuted !== i;
            }}
            className="h-full w-full object-cover"
            muted
            autoPlay={!reduced}
            loop
            playsInline
            preload="metadata"
            poster={v.poster}
          >
            <source src={v.webm} type="video/webm" />
            <source src={v.mp4} type="video/mp4" />
          </video>

          <button
            type="button"
            onClick={() => toggle(i)}
            className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-depth/70 px-3 py-1.5 text-xs text-ledger backdrop-blur-sm transition-colors hover:bg-depth/90"
            aria-label={
              unmuted === i
                ? `Mute ${v.label}`
                : `Play sound for ${v.label}`
            }
            aria-pressed={unmuted === i}
          >
            <SoundIcon on={unmuted === i} />
            <span className="tabular">{unmuted === i ? "Sound on" : "Sound"}</span>
          </button>
        </figure>
      ))}
    </div>
  );
}
