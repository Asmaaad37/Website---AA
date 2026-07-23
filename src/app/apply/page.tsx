import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "A short qualification form to see whether the next cohort is a fit.",
};

export default function ApplyPage() {
  return (
    <PlaceholderPage
      kicker="Next cohort"
      title="Apply"
      description="A short, honest qualification form — designed to check fit in both directions, not to hard-sell. The multi-step form and booking flow arrive in Phase 7."
      phase="Phase 7"
    />
  );
}
