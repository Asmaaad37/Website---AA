"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

/** Reactively tracks prefers-reduced-motion without setState-in-effect. */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(REDUCED_QUERY);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => true, // SSR: assume reduced (poster only) until the client hydrates
  );
}

/**
 * Hero visual: a small poster image is the LCP element (priority next/image,
 * served as AVIF/WebP), and the encoded loop fades in on top once it can
 * play — so LCP never waits on the video.
 *
 * The <video> is decorative (muted, aria-hidden); the poster carries the alt
 * text. Under prefers-reduced-motion we never mount the video at all — the
 * static poster is the whole experience, as required.
 */
export function HeroVideo({
  poster,
  webm,
  mp4,
  alt,
}: {
  poster: string;
  webm: string;
  mp4: string;
  alt: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);

  return (
    <div className="tick-rule relative aspect-[3/4] overflow-hidden border bg-surface/40">
      <Image
        src={poster}
        alt={alt}
        fill
        priority
        sizes="(max-width: 768px) 100vw, 40vw"
        className="object-cover"
      />

      {!reduced && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          aria-hidden
          onCanPlay={() => setReady(true)}
        >
          <source src={webm} type="video/webm" />
          <source src={mp4} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
