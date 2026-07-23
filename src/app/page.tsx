import Link from "next/link";

const SWATCHES = [
  { name: "depth", hex: "#0E141C", role: "base" },
  { name: "graphite", hex: "#242C38", role: "surface" },
  { name: "ledger", hex: "#E8E6E0", role: "paper" },
  { name: "phosphor", hex: "#E9A23B", role: "signal" },
  { name: "drawdown", hex: "#A8443B", role: "risk" },
  { name: "mist", hex: "#8A94A3", role: "muted" },
] as const;

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
      {/* Foundation badge — honest signal that content is not yet real */}
      <div className="tick-rule mt-10 inline-flex items-center gap-2 border px-3 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-phosphor" aria-hidden />
        <span className="tabular text-xs uppercase tracking-widest text-mist">
          Phase 1 · Foundation
        </span>
      </div>

      {/* Hero placeholder — positioning line, not a fabricated claim */}
      <section className="grid gap-8 py-16 md:grid-cols-[1.5fr_1fr] md:items-end md:py-24">
        <div>
          <h1 className="font-display text-4xl leading-[1.05] tracking-tight text-foreground sm:text-6xl">
            Learn to trade like it&rsquo;s a{" "}
            <span className="text-phosphor">profession</span>, not a lottery.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist">
            A risk-first mentorship led by Anas Ali. Built on records and
            evidence — honest about what trading really involves.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/apply"
              className="rounded-sm bg-phosphor px-6 py-3 font-medium text-depth transition-opacity hover:opacity-90"
            >
              Apply for the next cohort
            </Link>
            <Link
              href="/program"
              className="group inline-flex items-center gap-2 text-foreground"
            >
              See how it works
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </Link>
          </div>
        </div>

        {/* Credibility marker — honest positioning (leads with risk) */}
        <aside className="tick-rule border-l pl-5">
          <p className="tabular text-xs uppercase tracking-widest text-risk-ink">
            We start here
          </p>
          <p className="mt-2 text-sm leading-relaxed text-mist">
            Most retail traders lose money. Any program that opens with returns
            instead of risk is selling you something. This one opens with risk.
          </p>
        </aside>
      </section>

      {/* Design-system proof strip (Phase 1 verification, not final UI) */}
      <section
        aria-label="Design system tokens"
        className="tick-rule border-t py-12"
      >
        <p className="tabular mb-6 text-xs uppercase tracking-widest text-mist">
          Ledger &amp; Terminal — tokens
        </p>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {SWATCHES.map((s) => (
            <li key={s.name} className="tick-rule border p-3">
              <span
                className="block h-12 w-full rounded-sm"
                style={{ backgroundColor: s.hex }}
                aria-hidden
              />
              <p className="mt-2 text-sm text-foreground">{s.name}</p>
              <p className="tabular text-xs text-mist">{s.hex}</p>
              <p className="tabular text-[0.65rem] uppercase tracking-wider text-mist">
                {s.role}
              </p>
            </li>
          ))}
        </ul>

        {/* Type roles proof */}
        <dl className="mt-10 grid gap-6 sm:grid-cols-3">
          <div>
            <dt className="tabular text-xs uppercase tracking-widest text-mist">
              Display · Fraunces
            </dt>
            <dd className="font-display mt-2 text-3xl">Records, not hype</dd>
          </div>
          <div>
            <dt className="tabular text-xs uppercase tracking-widest text-mist">
              Body · Hanken Grotesk
            </dt>
            <dd className="mt-2 text-base leading-relaxed text-mist">
              The body face carries the argument at 16px on a mid-range Android.
            </dd>
          </div>
          <div>
            <dt className="tabular text-xs uppercase tracking-widest text-mist">
              Data · IBM Plex Mono
            </dt>
            <dd className="tabular mt-2 text-2xl text-foreground">
              1,240.50 &middot; 2.0% &middot; 1:3R
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
