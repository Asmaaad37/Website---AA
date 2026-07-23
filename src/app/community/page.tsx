import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = {
  title: "Community",
  description:
    "What membership actually gives you: live sessions, reviews, and the group.",
};

export default function CommunityPage() {
  return (
    <PlaceholderPage
      kicker="Membership"
      title="The community"
      description="What membership actually gives you — live sessions, trade reviews, and the group. Awaiting confirmed details of the community offering."
    />
  );
}
