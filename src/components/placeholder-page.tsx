/**
 * Phase 1 route-skeleton scaffold. Every marketing/legal route renders
 * this so links resolve 200 and the information architecture (§5) exists.
 * Real content lands in Phase 2 (marketing) / Phase 10 (legal, post
 * lawyer review). The "In progress" marker is deliberate — nothing here
 * pretends to be finished or states any fact about Anas Ali.
 */
export function PlaceholderPage({
  kicker,
  title,
  description,
  phase = "Phase 2",
}: {
  kicker: string;
  title: string;
  description: string;
  phase?: string;
}) {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-20 pt-28 sm:px-8 md:pb-28 md:pt-36">
      <div className="tick-rule inline-flex items-center gap-2 border px-3 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-phosphor" aria-hidden />
        <span className="tabular text-xs uppercase tracking-widest text-mist">
          {phase} · In progress
        </span>
      </div>

      <p className="tabular mt-10 text-xs uppercase tracking-widest text-risk-ink">
        {kicker}
      </p>
      <h1 className="font-display mt-3 max-w-3xl text-4xl leading-[1.05] tracking-tight sm:text-5xl">
        {title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">
        {description}
      </p>
    </div>
  );
}
