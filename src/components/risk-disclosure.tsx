/**
 * <RiskDisclosure /> — §8.1, non-negotiable compliance component.
 * Persistent, visible on every page (rendered in the footer).
 * Copy is deliberately risk-first and contains NO guaranteed-return
 * language. Do not soften this without legal sign-off.
 *
 * `variant="inline"` is a compact form for placing next to a CTA;
 * `variant="footer"` (default) is the full statement.
 */
export function RiskDisclosure({
  variant = "footer",
}: {
  variant?: "footer" | "inline";
}) {
  if (variant === "inline") {
    return (
      <p className="text-xs leading-relaxed text-mist">
        Trading involves substantial risk of loss. Most retail traders lose
        money. Education only — not investment advice.
      </p>
    );
  }

  return (
    <section
      aria-label="Risk disclosure"
      className="tick-rule border-t border-drawdown/40 bg-drawdown/[0.06] px-5 py-6 sm:px-8"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2">
        <p className="tabular text-xs uppercase tracking-widest text-risk-ink">
          Risk disclosure
        </p>
        <p className="max-w-3xl text-sm leading-relaxed text-mist">
          Trading financial instruments involves a substantial risk of loss and
          is not suitable for every investor. The majority of retail traders
          lose money. Nothing on this site is investment advice, a solicitation,
          or a recommendation to trade — it is educational content only. Past
          performance does not indicate future results, and individual results
          vary. You are solely responsible for your own trading decisions.
        </p>
      </div>
    </section>
  );
}
