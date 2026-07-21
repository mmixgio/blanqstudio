"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { localizeHref, type Dictionary, type Locale } from "../data/dictionaries";
import { site } from "../data/site";
import TransitionLink from "./TransitionLink";
import Wordmark from "./Wordmark";

/**
 * Footer ispirato allo stile di @efferd/footer-6 (blob di gradiente
 * decorativi, colonne che sfumano dentro allo scroll) ma adattato al
 * contenuto reale del sito: brand + navigazione, senza colonne fittizie.
 */

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

function FadeInColumn({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: -8, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ delay, duration: 0.7, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

function GitHubIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.78 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.04.77 2.1v3.12c0 .3.21.66.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H5.9v-2.91h4.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.47H15.2c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  );
}

const socialLinks = [
  { label: "GitHub", href: site.github, icon: <GitHubIcon /> },
  { label: "Instagram", href: site.instagram, icon: <InstagramIcon /> },
  { label: "Facebook", href: site.facebook, icon: <FacebookIcon /> },
];

export default function Footer({
  lang,
  nav,
  footer,
}: {
  lang: Locale;
  nav: Dictionary["nav"];
  footer: Dictionary["footer"];
}) {
  return (
    <footer className="relative overflow-hidden border-t border-border-subtle px-6 py-16 sm:px-10">
      {/* Blob decorativi (adattati dai gradienti radiali di footer-6 ai
          token del sito, invece dei colori fissi dell'originale) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <div
          className="absolute -left-24 -top-40 h-96 w-96 -rotate-45 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 40%, rgb(10 132 255 / 0.06), transparent 75%)",
          }}
        />
        <div
          className="absolute -right-32 top-0 h-72 w-72 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, color-mix(in srgb, var(--foreground) 4%, transparent), transparent 80%)",
          }}
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand + social */}
          <FadeInColumn className="sm:col-span-2 lg:col-span-2">
            <TransitionLink
              href={`/${lang}`}
              aria-label={site.name}
              className="inline-flex items-center text-lg"
            >
              <Wordmark />
            </TransitionLink>
            <p className="mt-4 max-w-xs text-sm text-text-secondary">
              {footer.tagline}
            </p>
            <div className="mt-5 flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="btn btn-glass !h-9 !w-9 !p-0 text-text-secondary hover:text-foreground"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </FadeInColumn>

          {/* Naviga: le voci reali del menu + cambio lingua */}
          <FadeInColumn delay={0.1}>
            <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-text-tertiary">
              {lang === "it" ? "Naviga" : "Navigate"}
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {nav.links.map((link) => (
                <li key={link.href}>
                  <TransitionLink
                    href={localizeHref(lang, link.href)}
                    className="text-text-secondary transition hover:text-foreground"
                  >
                    {link.label}
                  </TransitionLink>
                </li>
              ))}
              <li>
                <TransitionLink
                  href={`/${lang === "it" ? "en" : "it"}`}
                  className="text-text-secondary transition hover:text-foreground"
                >
                  {lang === "it" ? "English" : "Italiano"}
                </TransitionLink>
              </li>
            </ul>
          </FadeInColumn>
        </div>

        <div className="flex flex-col items-center justify-between gap-2 border-t border-border-subtle pt-6 text-sm text-text-tertiary sm:flex-row">
          <span>
            © {new Date().getFullYear()} {site.name}. {footer.rights}
          </span>
          <span>{footer.colophon}</span>
        </div>
      </div>
    </footer>
  );
}
