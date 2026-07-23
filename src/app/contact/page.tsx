import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the team.",
};

export default function ContactPage() {
  return (
    <PlaceholderPage
      kicker="Get in touch"
      title="Contact"
      description="Questions about the program, the community, or billing. The contact form arrives in Phase 7."
      phase="Phase 7"
    />
  );
}
