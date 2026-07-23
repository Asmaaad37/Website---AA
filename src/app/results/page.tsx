import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = {
  title: "Student Results",
  description:
    "Verified, dated student outcomes with full context and disclaimers.",
};

export default function ResultsPage() {
  return (
    <PlaceholderPage
      kicker="Outcomes"
      title="Student results"
      description="Only verified, attributable outcomes — with dates, starting context, and an inline disclaimer on every claim. Awaiting documented, consented results before anything is published here."
    />
  );
}
