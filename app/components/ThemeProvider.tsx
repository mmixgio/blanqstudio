"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const listeners = new Set<() => void>();

/* Legge il tema effettivo dal DOM: la fonte di verità è l'attributo
   data-theme su <html>, già impostato senza flash dallo script inline
   in [lang]/layout.tsx prima dell'idratazione. */
function readTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // storage non disponibile: il tema resta valido solo per questa pagina
  }
  listeners.forEach((listener) => listener());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  // Sincronizza tra tab diverse dello stesso sito
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
} | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Il valore lato server (getServerSnapshot) non conta: lo script inline
  // beforeInteractive ha già impostato l'attributo prima dell'idratazione,
  // quindi il primo render client legge subito il valore corretto.
  const theme = useSyncExternalStore(
    subscribe,
    readTheme,
    (): Theme => "dark",
  );

  const toggle = useCallback(() => {
    applyTheme(readTheme() === "light" ? "dark" : "light");
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme va usato dentro ThemeProvider");
  return context;
}
