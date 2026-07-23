import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";
import { RiskDisclosure } from "@/components/risk-disclosure";

export const metadata: Metadata = {
  title: "Risk Disclosure",
  description:
    "The full risk disclosure for this trading-education service. Education only — not investment advice.",
};

export default function RiskDisclosurePage() {
  return (
    <>
      <PlaceholderPage
        kicker="Legal"
        title="Risk disclosure"
        description="The full statement below is live now and appears on every page. The expanded legal version will be reviewed by a Pakistani lawyer before launch."
        phase="Phase 10"
      />
      <div className="mx-auto -mt-8 w-full max-w-6xl px-5 pb-16 sm:px-8">
        <RiskDisclosure />
      </div>
    </>
  );
}
