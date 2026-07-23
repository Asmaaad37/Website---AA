import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = {
  title: "The Program",
  description:
    "Curriculum, cohort structure, time commitment, pricing, and what is not included.",
};

export default function ProgramPage() {
  return (
    <PlaceholderPage
      kicker="How it works"
      title="The program"
      description="Curriculum, cohort structure, time commitment, transparent pricing — and an explicit list of what is not included and who this is not for. Awaiting confirmed structure and pricing."
    />
  );
}
