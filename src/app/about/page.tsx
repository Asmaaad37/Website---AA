import type { Metadata } from "next";
import { PRESS } from "@/lib/site";
import { MediaImage } from "@/components/media-image";
import { TelegramButton } from "@/components/telegram-button";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeadline } from "@/components/motion/split-headline";

export const metadata: Metadata = {
  title: "About Anas Ali",
  description:
    "Muhammad Anas Ali is a 24-year-old Pakistani entrepreneur and founder of Wealth University, a free education platform covered by Khaleej Times, SAMAA TV, GNN, and Daily Pakistan.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-16 pt-28 sm:px-8 md:pb-24 md:pt-36">
      <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-center">
        <MediaImage
          src="/media/anas-2.jpg"
          alt="Muhammad Anas Ali, founder of Wealth University"
          ratio="portrait"
          priority
          sizes="(max-width: 768px) 100vw, 40vw"
        />

        <div>
          <p className="tabular text-xs uppercase tracking-widest text-phosphor">
            The mentor
          </p>
          <SplitHeadline
            text="Muhammad Anas Ali"
            className="font-display mt-3 text-4xl leading-[1.05] tracking-tight sm:text-5xl"
          />
          <Reveal mode="load" delay={0.3}>
            <p className="mt-6 text-lg leading-relaxed text-mist">
              A 24-year-old Pakistani entrepreneur and the founder of{" "}
              <span className="text-foreground">Wealth University</span> — a free
              online platform teaching practical, real-world skills: financial
              literacy, trading, e-commerce, digital marketing, and online
              business.
            </p>
            <p className="mt-4 leading-relaxed text-mist">
              His philosophy is simple and, as the press has put it,{" "}
              <span className="text-foreground">
                &ldquo;skills over certificates&rdquo;
              </span>
              : practical ability matters more than paper qualifications. He
              built the platform around access, mentorship, and peer learning
              rather than a certificate-first system.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Press-cited figures — attributed, not self-declared */}
      <Reveal className="mt-16 grid gap-6 sm:grid-cols-3">
        {[
          { v: "200,000+", l: "learners on Wealth University (per press coverage)" },
          { v: "160K+", l: "members in the Telegram community (self-reported)" },
          { v: "5 skill tracks", l: "finance, trading, e-commerce, marketing, business" },
        ].map((s) => (
          <div key={s.l} className="tick-rule border-t pt-4">
            <p className="font-display text-3xl text-foreground">{s.v}</p>
            <p className="mt-2 text-sm leading-snug text-mist">{s.l}</p>
          </div>
        ))}
      </Reveal>

      {/* Method / positioning — kept honest and education-framed */}
      <Reveal className="mt-16 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl">The approach to trading</h2>
          <p className="mt-3 leading-relaxed text-mist">
            Inside the community, trading is taught as a skill to be studied —
            how markets move, how to think about risk, and how to review your
            own decisions. The goal is understanding, not tips to follow blindly.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl">Why it&rsquo;s free</h2>
          <p className="mt-3 leading-relaxed text-mist">
            Wealth University was built to widen access to financial education
            for young people across Pakistan and the wider region — the reason
            outlets from Khaleej Times to SAMAA TV have covered the mission.
          </p>
        </div>
      </Reveal>

      {/* Attributed press */}
      <Reveal className="mt-16">
        <p className="tabular text-xs uppercase tracking-widest text-mist">
          As featured in
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {PRESS.map((p) => (
            <li key={p.name}>
              {p.url ? (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mist underline underline-offset-2 transition-colors hover:text-foreground"
                >
                  {p.name}
                </a>
              ) : (
                <span className="text-mist">{p.name}</span>
              )}
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="mt-14">
        <TelegramButton size="lg">Join the community</TelegramButton>
      </div>
    </div>
  );
}
