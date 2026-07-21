"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

const MAX_TILT_DEG = 3;

/* Tilt attivo solo con puntatore hover e senza reduced-motion, letto con
   useSyncExternalStore (stesso pattern di ThemeProvider): niente setState
   negli effect, e reagisce anche se le preferenze cambiano a runtime.
   Server snapshot `false` → in SSR resta il div statico, come prima. */
const HOVER_QUERY = "(hover: hover)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeTiltEnabled(callback: () => void) {
  const hover = window.matchMedia(HOVER_QUERY);
  const reduced = window.matchMedia(REDUCED_MOTION_QUERY);
  hover.addEventListener("change", callback);
  reduced.addEventListener("change", callback);
  return () => {
    hover.removeEventListener("change", callback);
    reduced.removeEventListener("change", callback);
  };
}

function readTiltEnabled() {
  return (
    window.matchMedia(HOVER_QUERY).matches &&
    !window.matchMedia(REDUCED_MOTION_QUERY).matches
  );
}

export default function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const enabled = useSyncExternalStore(
    subscribeTiltEnabled,
    readTiltEnabled,
    () => false,
  );

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(900px) rotateX(${(-py * MAX_TILT_DEG).toFixed(2)}deg) rotateY(${(px * MAX_TILT_DEG).toFixed(2)}deg)`;
    });
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(raf.current);
    el.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
