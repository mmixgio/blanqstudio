"use client";

import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "./ThemeProvider";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

function SunIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v2.2M12 19.3v2.2M4.2 4.2l1.55 1.55M18.25 18.25l1.55 1.55M2.5 12h2.2M19.3 12h2.2M4.2 19.8l1.55-1.55M18.25 5.75l1.55-1.55" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" />
    </svg>
  );
}

/**
 * Toggle chiaro/scuro. Vive nella navbar, capsula sempre scura per design
 * (vedi nota in Navbar.tsx): l'icona segue lo stesso stile neutro degli
 * altri pulsanti della capsula, non i token di tema.
 */
export default function ThemeToggle({
  className,
  labelLight,
  labelDark,
}: {
  /** Colori (testo/hover) a carico del chiamante: nessun default, per non
      competere in specificità con le classi passate da fuori */
  className: string;
  /** Etichetta annunciata quando si è in chiaro (azione: passa a scuro) */
  labelLight: string;
  /** Etichetta annunciata quando si è in scuro (azione: passa a chiaro) */
  labelDark: string;
}) {
  const { theme, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? labelDark : labelLight}
      className={`relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full transition ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, rotate: -50, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 50, scale: 0.6 }}
          transition={{ duration: 0.35, ease: EASE_OUT }}
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
