import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = {
  title: "About Anas Ali",
  description:
    "The track record, method, and teaching philosophy behind the mentorship. Verifiable specifics only.",
};

export default function AboutPage() {
  return (
    <PlaceholderPage
      kicker="The mentor"
      title="About Anas Ali"
      description="Track record, method, and philosophy — built from verifiable specifics, not lifestyle claims. Awaiting confirmed biographical details before this page is written."
    />
  );
}
