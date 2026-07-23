import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = {
  title: "Free Resources",
  description:
    "Articles, a trading glossary, and market basics — the free learning library.",
};

export default function ResourcesPage() {
  return (
    <PlaceholderPage
      kicker="Learn for free"
      title="Resources"
      description="Articles, a plain-language glossary, and market basics — the free, SEO-driven library that earns trust before anyone pays a rupee."
    />
  );
}
