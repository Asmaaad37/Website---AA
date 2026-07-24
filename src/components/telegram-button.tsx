import { SITE } from "@/lib/site";

/** The one conversion action on the site: join the official Telegram. */
export function TelegramButton({
  children = "Join Telegram — Free",
  size = "md",
  className = "",
}: {
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg",
  } as const;

  return (
    <a
      href={SITE.telegram}
      target="_blank"
      rel="noopener noreferrer"
      className={`flow-btn group inline-flex items-center justify-center gap-2 font-medium ${sizes[size]} ${className}`}
    >
      {children}
      <span
        aria-hidden
        className="transition-transform duration-300 group-hover:translate-x-0.5"
      >
        &rarr;
      </span>
    </a>
  );
}
