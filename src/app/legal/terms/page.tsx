import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing use of this site and the program.",
};

export default function TermsPage() {
  return (
    <PlaceholderPage
      kicker="Legal"
      title="Terms of service"
      description="To be drafted and reviewed by a Pakistani lawyer before launch (SECP education-vs-advice line). Not yet in force."
      phase="Phase 10"
    />
  );
}
