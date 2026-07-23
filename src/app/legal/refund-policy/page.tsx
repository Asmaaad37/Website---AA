import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "The refund policy, stated plainly.",
};

export default function RefundPolicyPage() {
  return (
    <PlaceholderPage
      kicker="Legal"
      title="Refund policy"
      description="Stated plainly here and on the pricing page — never buried in the terms. Awaiting the confirmed policy."
      phase="Phase 10"
    />
  );
}
