/**
 * A clearly-labelled stand-in for real imagery we must NOT fabricate
 * (photos of a real person, real student testimonials). Swapped for real
 * assets once the client provides them. Never ships as if it were real.
 */
export function PlaceholderMedia({
  label,
  ratio = "square",
  className = "",
}: {
  label: string;
  ratio?: "square" | "portrait" | "wide";
  className?: string;
}) {
  const ratios = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    wide: "aspect-[16/10]",
  } as const;

  return (
    <div
      className={`tick-rule flex items-center justify-center border bg-surface/40 ${ratios[ratio]} ${className}`}
      role="img"
      aria-label={`Placeholder: ${label}`}
    >
      <span className="tabular px-3 text-center text-[0.65rem] uppercase tracking-widest text-mist">
        {label}
      </span>
    </div>
  );
}
