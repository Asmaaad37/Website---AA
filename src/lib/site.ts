/**
 * Single source of truth for external links, community figures, and press.
 *
 * Numbers here are Anas Ali's OWN published figures (reproduced from his
 * site), not claims invented by us. Anything marked `todo` needs the real
 * URL/asset from the client before launch. Education-only: no signal /
 * entry / SL / TP language anywhere in this file.
 */

export const SITE = {
  name: "Anas Ali",
  role: "Wealth Mentor",
  domain: "https://anasali.school",

  // Verified official channel — anti-impersonation is a real concern,
  // so this exact URL must be matched wherever it appears.
  telegram: "https://t.me/anasalitrader",
  telegramHandle: "@anasalitrader",

  // Confirmed social profiles.
  instagram: "https://www.instagram.com/anasali/",
  tiktok: "https://www.tiktok.com/@anasali",
  youtube: "https://www.youtube.com/@anasali11011",
  socialHandle: "@anasali",
} as const;

/** Community figures as published on his site (self-reported). */
export const STATS: { value: string; label: string }[] = [
  { value: "160K+", label: "Telegram members" },
  { value: "150K+", label: "Wealth University students" },
  { value: "Mon–Fri", label: "Market breakdowns" },
];

/**
 * Press coverage of Anas Ali / Wealth University. Entries with a `url` are
 * attributable (link to the real article, headlines verified where the
 * page was reachable). Name-only entries are outlets listed on his site
 * without an article link supplied yet.
 */
export type PressItem = { name: string; url?: string; headline?: string };

export const PRESS: PressItem[] = [
  {
    name: "Khaleej Times",
    url: "https://www.khaleejtimes.com/business/a-young-entrepreneur-redefining-access-to-education",
    headline: "A young entrepreneur redefining access to education",
  },
  {
    name: "Daily Pakistan",
    url: "https://en.dailypakistan.com.pk/07-Jan-2026/24-year-old-entrepreneur-muhammad-anas-ali-builds-free-online-university-challenges-traditional-education-models",
    headline:
      "24-year-old entrepreneur builds a free online university, challenging traditional education",
  },
  {
    name: "GNN",
    url: "https://gnnhd.tv/news/53321/preparing-youth-for-digital-economy-inside-pakistan-s-wealth-university",
    headline:
      "Preparing youth for the digital economy: inside Pakistan's Wealth University",
  },
  {
    name: "SAMAA TV",
    url: "https://www.samaa.tv/2087344589-skills-over-certificates",
    headline: "Skills over certificates",
  },
  {
    name: "OK! Magazine",
    url: "https://okmagazine.com/p/muhammad-anas-alis-journey-building-asias-largest-free-university/",
    headline: "Muhammad Anas Ali's journey building Asia's largest free university",
  },
  { name: "Pakistan Observer" },
  { name: "LA Weekly" },
  { name: "Business Bytes" },
];

/**
 * "What you get, free" — reframed to EDUCATION-ONLY. Note the deliberate
 * rename of the old "signals with entry/SL/TP" into learning-framed
 * market breakdowns. No item promises or implies a trade to place.
 */
export const COMMUNITY_VALUE: { title: string; body: string }[] = [
  {
    title: "Daily market breakdowns",
    body: "Monday–Friday analysis of what's moving and why — taught as lessons you can learn from, not tips to blindly follow.",
  },
  {
    title: "Expert moderators",
    body: "A moderated community with experienced traders — and Anas himself — answering questions and guiding members.",
  },
  {
    title: "Direct mentorship",
    body: "Guidance drawn from years of trading experience, shared openly with the whole community.",
  },
  {
    title: "Learn the fundamentals",
    body: "Educational content that builds real skill — how markets work, how to think about risk, how to study your own decisions.",
  },
];
