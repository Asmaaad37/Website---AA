import Link from "next/link";
import { RiskDisclosure } from "@/components/risk-disclosure";
import { BalanceBeamMark } from "@/components/balance-beam-mark";
import { SITE } from "@/lib/site";

type FooterLink = { href: string; label: string; external?: boolean };

const FOOTER_NAV: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Community",
    links: [
      { href: SITE.telegram, label: "Join Telegram", external: true },
      { href: SITE.youtube, label: "YouTube", external: true },
      { href: SITE.instagram, label: "Instagram", external: true },
      { href: SITE.tiktok, label: "TikTok", external: true },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About Anas Ali" },
      { href: "/#press", label: "Press" },
      { href: "/#testimonials", label: "Testimonials" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/legal/risk-disclosure", label: "Risk disclosure" },
      { href: "/legal/terms", label: "Terms" },
      { href: "/legal/privacy", label: "Privacy" },
    ],
  },
];

function FooterLinkItem({ link }: { link: FooterLink }) {
  const className = "transition-colors hover:text-foreground";
  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}

export function SiteFooter() {
  return (
    <footer className="tick-rule border-t bg-background">
      <RiskDisclosure />

      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <BalanceBeamMark className="h-5 w-5 text-phosphor" />
            <span className="font-display text-lg">Anas Ali</span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-mist">
            Free trading education and community, led by Anas Ali. Learn how
            markets work — and how to think about risk.
          </p>
          <p className="tabular text-xs text-mist">
            Education, not advice. Not a licensed investment adviser or fund.
          </p>
        </div>

        {FOOTER_NAV.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <p className="tabular mb-3 text-xs uppercase tracking-widest text-mist">
              {col.heading}
            </p>
            <ul className="flex flex-col gap-2 text-sm text-mist">
              {col.links.map((link) => (
                <li key={link.label}>
                  <FooterLinkItem link={link} />
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Official-channel verification — impersonation is a real problem. */}
      <div className="tick-rule border-t bg-drawdown/[0.06]">
        <div className="mx-auto w-full max-w-6xl px-5 py-4 sm:px-8">
          <p className="text-xs leading-relaxed text-mist">
            <span className="text-risk-ink">Security:</span> beware of fake
            channels and impersonators. The only official Telegram is{" "}
            <a
              href={SITE.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="tabular text-foreground underline underline-offset-2"
            >
              t.me/anasalitrader
            </a>
            . Always confirm the link matches exactly.
          </p>
        </div>
      </div>

      <div className="tick-rule border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-5 py-5 text-xs text-mist sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="tabular">
            © {new Date().getFullYear()} Anas Ali. All rights reserved.
          </p>
          <p className="tabular">Karachi · Dubai · Online</p>
        </div>
      </div>
    </footer>
  );
}
