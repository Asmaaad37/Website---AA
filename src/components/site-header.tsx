import Link from "next/link";
import { BalanceBeamMark } from "@/components/balance-beam-mark";
import { TelegramButton } from "@/components/telegram-button";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/#community", label: "Community" },
  { href: "/#press", label: "Press" },
  { href: "/#testimonials", label: "Testimonials" },
] as const;

export function SiteHeader() {
  return (
    <header className="tick-rule sticky top-0 z-40 border-b bg-background/85 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="Anas Ali — home"
        >
          <BalanceBeamMark className="h-5 w-5 text-phosphor" />
          <span className="font-display text-lg text-foreground">Anas Ali</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7 text-sm text-mist">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <TelegramButton size="sm">Join Telegram</TelegramButton>
      </div>
    </header>
  );
}
