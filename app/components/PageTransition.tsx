"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { usePathname } from "next/navigation";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useContext, useState, type ReactNode } from "react";

/**
 * Congela il contesto del router per il sottoalbero in uscita.
 *
 * In App Router i figli del layout leggono sempre lo stato corrente del
 * router: senza questo "freeze", durante l'exit animation la pagina vecchia
 * verrebbe sostituita subito dal contenuto nuovo. Fissando il valore del
 * contesto al primo render, il ramo in uscita continua a mostrare la route
 * precedente finché AnimatePresence non lo smonta.
 *
 * Nota: LayoutRouterContext è un'API interna di Next (verificata su 16.2.x);
 * da ricontrollare a ogni major upgrade.
 */
function FrozenRouter({ children }: { children: ReactNode }) {
  const context = useContext(LayoutRouterContext);
  // L'inizializzatore di useState gira solo al mount: cattura il valore del
  // contesto una volta e non lo aggiorna mai (il "freeze" vero e proprio)
  const [frozen] = useState(() => context);

  if (!frozen) return children;

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

/* Curve ease-out esponenziali (mai lineari): entrata decisa con coda
   morbida, uscita più rapida (~75% della durata di entrata). */
const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_OUT_QUINT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* Transizione "reveal": la pagina nuova si scopre da un clip verticale
   mentre risale; quella in uscita si allontana verso l'alto dissolvendosi. */
const reveal: Variants = {
  // Stato di partenza della pagina in entrata: più in basso, trasparente,
  // "chiusa" da un sipario di clip sopra e sotto
  hidden: {
    opacity: 0,
    y: 24,
    clipPath: "inset(8% 0% 8% 0%)",
  },
  // Il sipario si apre mentre il contenuto risale al suo posto
  enter: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.5, ease: EASE_OUT_EXPO },
  },
  // La pagina in uscita arretra appena e sale, dissolvendosi
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.985,
    transition: { duration: 0.35, ease: EASE_OUT_QUINT },
  },
};

/* Alternativa per prefers-reduced-motion: solo crossfade, nessun movimento */
const fade: Variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.25, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: "easeOut" } },
};

/**
 * Avvolge il contenuto delle pagine (non la navbar) e anima il cambio di
 * route. La chiave è il pathname: quando cambia, AnimatePresence completa
 * l'exit della pagina corrente e solo dopo monta la nuova (mode="wait").
 */
export default function PageTransition({
  children,
  footer,
}: {
  children: ReactNode;
  /** Slot renderizzato dopo la pagina, dentro l'area animata (es. Footer) */
  footer?: ReactNode;
}) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? fade : reveal;

  return (
    // initial={false}: nessuna animazione al primo caricamento (ci pensano
    // le entrance CSS della hero); le transizioni valgono solo tra route
    <AnimatePresence
      mode="wait"
      initial={false}
      onExitComplete={() => {
        // I link usano scroll={false} (vedi TransitionLink): riportiamo la
        // viewport in cima a exit conclusa, così la nuova pagina parte
        // sempre dall'alto senza salti visibili durante l'animazione
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }}
    >
      <motion.main
        key={pathname}
        // pt-*: respiro tra la navbar fissa e l'inizio del contenuto,
        // uguale per tutte le pagine (la hero, alta 100svh, lo compensa)
        className="relative z-10 flex flex-1 flex-col pt-16 sm:pt-20"
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
      >
        <FrozenRouter>{children}</FrozenRouter>
        {/* Il footer viaggia con la pagina; mt-auto lo ancora in fondo
            anche nelle pagine più corte */}
        {footer && <div className="mt-auto">{footer}</div>}
      </motion.main>
    </AnimatePresence>
  );
}
