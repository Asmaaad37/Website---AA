import Image from "next/image";

/**
 * next/image wrapper for local assets in /public/media. `cover` for photos
 * (crops to fill), `contain` for screenshots (shows the whole image so text
 * stays readable). Optimised + lazy by default; pass `priority` for the LCP
 * hero image only.
 */
export function MediaImage({
  src,
  alt,
  ratio = "square",
  fit = "cover",
  sizes = "(max-width: 768px) 50vw, 25vw",
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  ratio?: "square" | "portrait" | "wide" | "tall";
  fit?: "cover" | "contain";
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const ratios = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    wide: "aspect-[16/10]",
    tall: "aspect-[4/5]",
  } as const;

  return (
    <div
      className={`tick-rule relative overflow-hidden border bg-surface/40 ${ratios[ratio]} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={fit === "cover" ? "object-cover" : "object-contain"}
      />
    </div>
  );
}
