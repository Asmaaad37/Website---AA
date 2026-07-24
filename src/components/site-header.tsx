"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { BalanceBeamMark } from "@/components/balance-beam-mark";
import { TelegramButton } from "@/components/telegram-button";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/#community", label: "Community" },
  { href: "/#press", label: "Press" },
  { href: "/#testimonials", label: "Testimonials" },
] as const;

/** True once the page has scrolled past `threshold`px. */
function useScrolled(threshold = 24) {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener("scroll", onChange, { passive: true });
      return () => window.removeEventListener("scroll", onChange);
    },
    () => window.scrollY > threshold,
    () => false,
  );
}

export function SiteHeader() {
  const scrolled = useScrolled();

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Morphs from a full-width transparent bar into a floating frosted
            pill on scroll. bg-depth/55 + backdrop-blur = content shows
            through, blurred. */}
        <div
          className={`mx-auto flex items-center justify-between gap-4 transition-all duration-300 ease-out ${
            scrolled
              ? "mt-3 max-w-4xl rounded-2xl border border-rule bg-depth/55 px-4 py-2.5 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl"
              : "mt-0 max-w-6xl rounded-2xl border border-transparent bg-transparent px-1.5 py-4"
          }`}
        >
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
      </div>
    </header>
  );
}
