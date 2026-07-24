import Link from "next/link";
import Image from "next/image";
import { SITE, STATS, PRESS, COMMUNITY_VALUE } from "@/lib/site";
import { TelegramButton } from "@/components/telegram-button";
import { MediaImage } from "@/components/media-image";
import { DualVideo } from "@/components/dual-video";
import { RiskDisclosure } from "@/components/risk-disclosure";
import { Reveal } from "@/components/motion/reveal";
import { RotatingHeadline } from "@/components/motion/rotating-headline";
import { VisionMorph } from "@/components/motion/vision-morph";

const TESTIMONIALS = [1, 2, 3, 4, 5, 6] as const;

export default function Home() {
  return (
    <>
      {/* ============================ HERO ============================ */}
      <section className="relative">
        {/* Full-bleed hero background — the portrait carries the section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <Image
              src="/media/anas-6.jpg"
              alt="Anas Ali, founder of Wealth University"
              fill
              priority
              quality={62}
              sizes="100vw"
              className="object-cover object-center"
            />
            {/* Scrims keep the overlaid text readable (WCAG contrast) */}
            <div className="absolute inset-0 bg-gradient-to-r from-depth via-depth/90 to-depth/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-depth via-transparent to-depth/50" />
          </div>

          <div className="mx-auto flex min-h-[86vh] w-full max-w-6xl flex-col justify-center px-5 py-24 sm:px-8">
            <div className="max-w-2xl">
              <p className="tabular text-xs uppercase tracking-widest text-phosphor">
                {SITE.role} · Wealth University
              </p>

              {/* Rotating-word headline (GSAP-driven; static first word under
                  reduced motion). */}
              <RotatingHeadline className="font-display mt-4 text-4xl leading-[1.05] tracking-tight text-foreground sm:text-6xl" />

              <Reveal mode="load" delay={0.35}>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist">
                  Free daily market breakdowns, 24/7 community support, and
                  direct mentorship from me — Anas Ali. Learn the strategies.
                  Build the mindset. Start today, completely free.
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <TelegramButton size="lg">
                    Join {SITE.telegramHandle}
                  </TelegramButton>
                  <Link
                    href="/#community"
                    className="group inline-flex items-center gap-2 text-foreground"
                  >
                    What you get
                    <span
                      aria-hidden
                      className="transition-transform group-hover:translate-x-1"
                    >
                      &darr;
                    </span>
                  </Link>
                </div>

                {/* Self-reported community figures (his own published numbers) */}
                <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6">
                  {STATS.map((s) => (
                    <div key={s.label} className="tick-rule border-l pl-4">
                      <dt className="font-display text-2xl text-foreground sm:text-3xl">
                        {s.value}
                      </dt>
                      <dd className="mt-1 text-xs leading-snug text-mist">
                        {s.label}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Official channel verification bar */}
        <div className="tick-rule border-y bg-graphite">
          <p className="mx-auto w-full max-w-6xl px-5 py-3 text-center text-xs text-mist sm:px-8">
            Official community only:{" "}
            <a
              href={SITE.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="tabular text-foreground underline underline-offset-2"
            >
              t.me/anasalitrader
            </a>{" "}
            — beware of fake channels. In Pakistan, a VPN may be required to
            reach Telegram.
          </p>
        </div>
      </section>

      {/* ====================== WHAT YOU GET (FREE) ====================== */}
      <section id="community" className="scroll-mt-20">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
          <Reveal>
            <p className="tabular text-xs uppercase tracking-widest text-phosphor">
              100% free
            </p>
            <h2 className="font-display mt-3 max-w-2xl text-3xl leading-tight tracking-tight sm:text-4xl">
              What you get when you join
            </h2>
            <p className="mt-4 max-w-2xl text-mist">
              Everything you need to start your trading{" "}
              <span className="text-foreground">education</span> journey — no
              fees, no catch.
            </p>
          </Reveal>

          <Reveal className="mt-12 grid gap-px overflow-hidden rounded-sm sm:grid-cols-2">
            {COMMUNITY_VALUE.map((item, i) => (
              <div
                key={item.title}
                className="tick-rule border bg-surface/30 p-7"
              >
                <span className="tabular text-xs text-mist">0{i + 1}</span>
                <h3 className="font-display mt-3 text-xl text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">
                  {item.body}
                </p>
              </div>
            ))}
          </Reveal>

          {/* Compliance: education framing made explicit here. */}
          <div className="mt-6 max-w-2xl">
            <RiskDisclosure variant="inline" />
          </div>
        </div>
      </section>

      {/* ===================== VIDEO / SEE INSIDE ===================== */}
      <section id="watch" className="tick-rule border-t bg-depth">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
          <Reveal className="mx-auto max-w-xl text-center">
            <p className="tabular text-xs uppercase tracking-widest text-phosphor">
              Watch
            </p>
            <h2 className="font-display mt-3 text-3xl leading-tight tracking-tight sm:text-4xl">
              See what it&rsquo;s about
            </h2>
            <p className="mt-4 leading-relaxed text-mist">
              A quick look inside the community — what you&rsquo;ll learn, how it
              works, and why 160,000+ members choose to be here. Tap the sound
              icon to listen.
            </p>
          </Reveal>

          <div className="mt-12">
            <DualVideo
              videos={[
                {
                  poster: "/media/video-1-poster.jpg",
                  webm: "/media/video-1.webm",
                  mp4: "/media/video-1.mp4",
                  label: "the first clip",
                },
                {
                  poster: "/media/video-2-poster.jpg",
                  webm: "/media/video-2.webm",
                  mp4: "/media/video-2.mp4",
                  label: "the second clip",
                },
              ]}
            />
          </div>

          <div className="mt-12 flex justify-center">
            <TelegramButton>Join {SITE.telegramHandle}</TelegramButton>
          </div>
        </div>
      </section>

      {/* ========================= LIFESTYLE ========================= */}
      <section id="lifestyle" className="tick-rule border-t bg-depth">
        <VisionMorph />
        <div className="mx-auto flex w-full max-w-6xl justify-center px-5 pb-20 sm:px-8">
          <TelegramButton>Start your journey</TelegramButton>
        </div>
      </section>

      {/* =========================== PRESS =========================== */}
      <section id="press" className="scroll-mt-20 tick-rule border-t">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
          <Reveal>
            <p className="tabular text-xs uppercase tracking-widest text-phosphor">
              Featured in the press
            </p>
            <h2 className="font-display mt-3 max-w-3xl text-3xl leading-tight tracking-tight sm:text-4xl">
              Recognised for making education more accessible
            </h2>
            <p className="mt-4 max-w-2xl text-mist">
              Coverage of Anas Ali&rsquo;s work building Wealth University — a
              free platform helping learners develop practical skills over
              certificates.
            </p>
          </Reveal>

          {/* Attributable coverage — links to the real articles */}
          <Reveal className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PRESS.filter((p) => p.url).map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="tick-rule group flex h-full flex-col justify-between gap-4 border bg-surface/30 p-6 transition-colors hover:border-phosphor/50"
              >
                <p className="text-sm leading-snug text-foreground">
                  &ldquo;{p.headline}&rdquo;
                </p>
                <span className="tabular flex items-center gap-2 text-xs uppercase tracking-widest text-mist">
                  {p.name}
                  <span
                    aria-hidden
                    className="text-phosphor transition-transform group-hover:translate-x-0.5"
                  >
                    &nearr;
                  </span>
                </span>
              </a>
            ))}
          </Reveal>

          {/* Outlets listed without an article link yet */}
          {PRESS.some((p) => !p.url) && (
            <div className="mt-6">
              <p className="tabular text-xs uppercase tracking-widest text-mist">
                Also featured in
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-mist">
                {PRESS.filter((p) => !p.url).map((p) => (
                  <li key={p.name}>{p.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* ======================= TESTIMONIALS ======================= */}
      <section
        id="testimonials"
        className="scroll-mt-20 tick-rule border-t bg-depth"
      >
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
          <Reveal>
            <p className="tabular text-xs uppercase tracking-widest text-phosphor">
              Student experiences
            </p>
            <h2 className="font-display mt-3 max-w-2xl text-3xl leading-tight tracking-tight sm:text-4xl">
              Real students, real experiences
            </h2>
            <p className="mt-4 max-w-2xl text-mist">
              What members say about learning inside the community.
            </p>
          </Reveal>

          <Reveal className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {TESTIMONIALS.map((n) => (
              <MediaImage
                key={n}
                src={`/media/testimonial-${n}.jpeg`}
                alt={`Student testimonial ${n}`}
                ratio="tall"
                fit="contain"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
            ))}
          </Reveal>

          {/* §8.2 ResultsDisclaimer — adjacent to outcome/testimonial claims */}
          <p className="mt-6 max-w-2xl text-xs leading-relaxed text-mist">
            Individual experiences vary and are not typical. Past performance
            does not indicate future results. Testimonials are shared with
            permission and reflect individual views, not a promise of any
            outcome.
          </p>
        </div>
      </section>

      {/* ========================= FINAL CTA ========================= */}
      <section className="tick-rule border-t">
        <Reveal className="mx-auto w-full max-w-6xl px-5 py-24 text-center sm:px-8">
          <h2 className="font-display mx-auto max-w-3xl text-4xl leading-[1.05] tracking-tight sm:text-5xl">
            Ready to start your trading journey?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-mist">
            Join the exclusive Telegram community and get instant access to the
            breakdowns, mentorship, and support you need to learn and grow.
          </p>

          <ul className="mx-auto mt-8 flex max-w-md flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-mist">
            <li className="flex items-center gap-2">
              <span className="text-phosphor" aria-hidden>
                ✓
              </span>{" "}
              100% free access
            </li>
            <li className="flex items-center gap-2">
              <span className="text-phosphor" aria-hidden>
                ✓
              </span>{" "}
              Instant setup
            </li>
            <li className="flex items-center gap-2">
              <span className="text-phosphor" aria-hidden>
                ✓
              </span>{" "}
              No hidden fees
            </li>
          </ul>

          <div className="mt-9 flex justify-center">
            <TelegramButton size="lg">Join the community now</TelegramButton>
          </div>

          <p className="mx-auto mt-6 max-w-xl text-xs leading-relaxed text-mist">
            <span className="text-risk-ink">Security warning:</span> beware of
            fake groups and impersonators. Confirm the link is exactly{" "}
            <span className="tabular text-foreground">t.me/anasalitrader</span>.
            Pakistan users may need a VPN to access Telegram.
          </p>
        </Reveal>
      </section>
    </>
  );
}
