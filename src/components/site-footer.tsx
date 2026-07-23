import Link from "next/link";
import { RiskDisclosure } from "@/components/risk-disclosure";
import { BalanceBeamMark } from "@/components/balance-beam-mark";

const FOOTER_NAV: { heading: string; links: { href: string; label: string }[] }[] =
  [
    {
      heading: "Learn",
      links: [
        { href: "/program", label: "The program" },
        { href: "/results", label: "Student results" },
        { href: "/resources", label: "Free resources" },
        { href: "/community", label: "Community" },
      ],
    },
    {
      heading: "Company",
      links: [
        { href: "/about", label: "About Anas Ali" },
        { href: "/apply", label: "Apply" },
        { href: "/contact", label: "Contact" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { href: "/legal/risk-disclosure", label: "Risk disclosure" },
        { href: "/legal/terms", label: "Terms" },
        { href: "/legal/privacy", label: "Privacy" },
        { href: "/legal/refund-policy", label: "Refund policy" },
      ],
    },
  ];

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
            Risk-first trading education. Built on evidence and records, not
            hype.
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
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
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
