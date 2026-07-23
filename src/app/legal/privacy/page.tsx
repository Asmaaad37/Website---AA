import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How personal data is collected, used, and protected.",
};

export default function PrivacyPage() {
  return (
    <PlaceholderPage
      kicker="Legal"
      title="Privacy policy"
      description="How personal data is collected, used, and protected. To be drafted and reviewed before launch."
      phase="Phase 10"
    />
  );
}
