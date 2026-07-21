"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { localizeHref, type Dictionary, type Locale } from "../data/dictionaries";
import { site } from "../data/site";
import ThemeToggle from "./ThemeToggle";
import TransitionLink from "./TransitionLink";
import Wordmark from "./Wordmark";

/* Movimento della pillola attiva: ease-out quint, nessun rimbalzo */
const pillTransition = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

export default function Navbar({
  lang,
  nav,
}: {
  lang: Locale;
  nav: Dictionary["nav"];
}) {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Compact the capsule once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const otherLang: Locale = lang === "it" ? "en" : "it";

  // Sezione corrente senza il prefisso lingua: "/it/work" → "/work", "/it" → "/"
  const section = pathname.replace(new RegExp(`^/${lang}(?=/|$)`), "") || "/";

  // Voce attiva derivata dalla route (incluse eventuali sottopagine future)
  const activeIndex = nav.links.findIndex(
    (link) => section === link.href || section.startsWith(`${link.href}/`),
  );

  // La pillola segue l'hover e, a riposo, torna sulla voce attiva
  const pillIndex = hovered ?? (activeIndex === -1 ? null : activeIndex);

  // Cambio lingua conservando la sezione corrente
  const switchHref = `/${otherLang}${section === "/" ? "" : section}`;

  return (
    <>
      {/* Stile "header-2": nessuno chrome a riposo (si fonde con la pagina),
          capsula flottante con blur solo dopo lo scroll — stessa idea del
          blocco @efferd/header-2 (che tiene fissi mx-auto/max-w e anima solo
          bordo/sfondo/ombra), adattata alla forma a pillola del sito */}
      <header
        className={`nav-anim fixed left-1/2 z-30 w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2 transition-[top] duration-300 ${
          scrolled ? "top-2 sm:top-3" : "top-4 sm:top-6"
        }`}
      >
        <div
          className={`flex items-center gap-2 rounded-full border transition-all duration-300 sm:gap-4 ${
            scrolled
              ? "border-border-strong bg-background/80 py-1 pl-4 pr-1.5 shadow-xl shadow-black/40 backdrop-blur-2xl backdrop-saturate-150 sm:pl-5 sm:pr-2"
              : "border-transparent bg-transparent px-2.5 py-2 sm:px-3"
          }`}
        >
          <TransitionLink
            href={`/${lang}`}
            aria-label={site.name}
            className="flex shrink-0 items-center text-base sm:text-lg"
          >
            <Wordmark />
          </TransitionLink>

          <nav
            onMouseLeave={() => setHovered(null)}
            className="relative hidden flex-1 justify-end gap-1 text-sm text-text-secondary sm:flex"
            aria-label="Main"
          >
            {nav.links.map((link, index) => (
              <TransitionLink
                key={link.href}
                href={localizeHref(lang, link.href)}
                onMouseEnter={() => setHovered(index)}
                aria-current={activeIndex === index ? "page" : undefined}
                className={`relative rounded-full px-3 py-1.5 transition ${
                  activeIndex === index
                    ? "text-foreground"
                    : "hover:text-foreground"
                }`}
              >
                {/* Indicatore condiviso: layoutId lo fa scivolare da una
                    voce all'altra quando cambia sezione o hover */}
                <AnimatePresence initial={false}>
                  {pillIndex === index && (
                    <motion.span
                      layoutId="nav-pill"
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-surface-3"
                      transition={pillTransition}
                      exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    />
                  )}
                </AnimatePresence>
                <span className="relative z-10">{link.label}</span>
              </TransitionLink>
            ))}
          </nav>

          <TransitionLink
            href={switchHref}
            className="hidden shrink-0 rounded-full px-2 py-1.5 text-xs font-medium uppercase tracking-wider text-text-tertiary transition hover:text-foreground sm:block"
          >
            {otherLang}
          </TransitionLink>

          {/* Tema chiaro/scuro, accanto al cambio lingua */}
          <ThemeToggle
            className="hidden text-text-secondary hover:text-foreground sm:flex"
            labelLight={nav.themeToLight}
            labelDark={nav.themeToDark}
          />

          {/* CTA contatto: label breve, ma il link resta mailto verso
              l'indirizzo centralizzato in app/data/site.ts */}
          <a
            href={`mailto:${site.email}`}
            className="btn btn-primary hidden shrink-0 !px-5 !py-2 sm:inline-flex"
          >
            {nav.contact}
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label={nav.menuOpen}
            className="ml-auto flex h-9 w-9 items-center justify-center rounded-full text-foreground sm:hidden"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M4 8h16M4 16h16" />
            </svg>
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="menu-overlay fixed inset-0 z-40 flex flex-col bg-background/95 backdrop-blur-2xl sm:hidden">
          <div className="flex items-center justify-between px-6 py-6">
            <Wordmark className="text-sm" />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label={nav.menuClose}
              className="flex h-9 w-9 items-center justify-center rounded-full text-foreground"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <nav
            className="menu-anim flex flex-1 flex-col items-start justify-center gap-6 px-8"
            aria-label="Mobile"
          >
            {nav.links.map((link, index) => (
              <TransitionLink
                key={link.href}
                href={localizeHref(lang, link.href)}
                onClick={() => setMenuOpen(false)}
                aria-current={activeIndex === index ? "page" : undefined}
                className="text-3xl font-semibold tracking-tight text-foreground"
              >
                {link.label}
              </TransitionLink>
            ))}

            {/* Cambio lingua e tema, appaiati come richiesto */}
            <div className="mt-2 flex items-center gap-3">
              <TransitionLink
                href={switchHref}
                onClick={() => setMenuOpen(false)}
                className="text-sm uppercase tracking-widest text-text-tertiary transition hover:text-foreground"
              >
                {lang === "it" ? "English" : "Italiano"}
              </TransitionLink>
              <span aria-hidden className="text-text-tertiary">
                ·
              </span>
              <ThemeToggle
                className="text-text-tertiary hover:text-foreground"
                labelLight={nav.themeToLight}
                labelDark={nav.themeToDark}
              />
            </div>
          </nav>
          <div className="px-8 pb-12">
            <a
              href={`mailto:${site.email}`}
              onClick={() => setMenuOpen(false)}
              className="btn btn-primary"
            >
              {nav.contact}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
