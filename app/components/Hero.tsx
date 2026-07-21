import type { Dictionary, Locale } from "../data/dictionaries";
import { site } from "../data/site";
import TransitionLink from "./TransitionLink";

export default function Hero({
  lang,
  hero,
}: {
  lang: Locale;
  hero: Dictionary["hero"];
}) {
  return (
    // Altezza = viewport meno il padding-top globale di PageTransition,
    // così la hero riempie esattamente il primo schermo
    <section className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-center overflow-hidden px-6 sm:min-h-[calc(100svh-5rem)] sm:px-10">
      {/* Soft accent light behind the headline */}
      <div
        aria-hidden
        className="hero-glow pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgb(10 132 255 / 0.12), rgb(255 255 255 / 0.04) 55%, transparent)",
        }}
      />

      {/* Floating light orbs */}
      <div
        aria-hidden
        className="float-a pointer-events-none absolute right-[12%] top-[18%] h-40 w-40 rounded-full bg-foreground/[0.05] blur-2xl sm:h-56 sm:w-56"
      />
      <div
        aria-hidden
        className="float-b pointer-events-none absolute bottom-[16%] left-[8%] h-32 w-32 rounded-full blur-2xl sm:h-44 sm:w-44"
        style={{ background: "rgb(10 132 255 / 0.08)" }}
      />

      <div className="hero-anim relative mx-auto flex w-full max-w-5xl flex-col items-start gap-6">
        <p className="text-xs uppercase tracking-[0.3em] text-text-tertiary sm:text-sm">
          {hero.eyebrow}
        </p>

        {/* Wordmark a scala display: sheen sul "Blanq", "Studio" leggero */}
        <h1 className="max-w-4xl text-[clamp(3.25rem,9vw,6rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
          <span className="text-display text-sheen">Blanq</span>
          <span className="font-light text-text-tertiary">Studio</span>
        </h1>

        <p className="max-w-2xl text-lg leading-relaxed text-text-secondary sm:text-xl">
          {hero.intro}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          {/* CTA verso la galleria progetti (con transizione di route) */}
          <TransitionLink href={`/${lang}/work`} className="btn btn-primary">
            {hero.ctaPrimary}
          </TransitionLink>
          {/* CTA email: l'indirizzo è centralizzato in app/data/site.ts */}
          <a href={`mailto:${site.email}`} className="btn btn-glass">
            {hero.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  );
}
