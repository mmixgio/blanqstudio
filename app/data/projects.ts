import type { Locale } from "./dictionaries";

type Localized = Record<Locale, string>;

export type Project = {
  slug: string;
  title: string;
  description: Localized;
  stack: string[];
  /** Percorso servito, es. "/asset/nome-file.jpg".
      Workflow: lascia l'originale in asset/, poi `npm run sync-assets`. */
  image?: string;
  /** URL live del progetto; se assente il bottone non viene mostrato */
  link?: string;
};

export const projects: Project[] = [
  {
    slug: "glass-ui-kit",
    title: "Glass UI Kit",
    description: {
      it: "Una collezione di componenti in stile visionOS-glass: card, bottoni e superfici traslucide costruite con Tailwind CSS.",
      en: "A collection of visionOS-glass style components: cards, buttons and translucent surfaces built with Tailwind CSS.",
    },
    stack: ["React", "Tailwind CSS", "TypeScript"],
  },
  {
    slug: "blanqstudio",
    title: "BlanqStudio",
    description: {
      it: "Questo sito: Next.js App Router, localizzazione IT/EN, tema chiaro/scuro e transizioni di pagina animate.",
      en: "This very site: Next.js App Router, IT/EN localization, light/dark theming and animated page transitions.",
    },
    stack: ["Next.js", "TypeScript", "Motion"],
  },
  {
    slug: "ai-playground",
    title: "AI Playground",
    description: {
      it: "Esperimenti con modelli di intelligenza artificiale applicati a piccoli strumenti web quotidiani.",
      en: "Experiments applying AI models to small, everyday web tools.",
    },
    stack: ["Python", "OpenAI API", "Next.js"],
  },
];
