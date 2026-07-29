const dictionaries = {
  it: {
    meta: {
      title: "BlanqStudio — Tecnologia, Design, Sviluppo Web",
      description:
        "BlanqStudio è il mio spazio personale tra tecnologia, design e sviluppo web: progetti, esperimenti e interfacce curate nei dettagli.",
    },
    nav: {
      // href = path della route di sezione (senza prefisso lingua); "/" = home
      links: [
        { href: "/", label: "Home" },
        { href: "/work", label: "Progetti" },
        { href: "/gallery", label: "Galleria" },
        { href: "/about", label: "About" },
      ],
      contact: "Scrivimi",
      themeToLight: "Passa al tema chiaro",
      themeToDark: "Passa al tema scuro",
      menuOpen: "Apri menu",
      menuClose: "Chiudi menu",
    },
    hero: {
      eyebrow: "Tecnologia · Design · Sviluppo Web",
      intro:
        "Uno studio personale dove codice e design si incontrano: costruisco interfacce, siti e piccoli esperimenti digitali, curati nei dettagli.",
      ctaPrimary: "Guarda i progetti",
      ctaSecondary: "Scrivimi",
      featuredHeading: "Progetti in evidenza",
      viewAll: "Tutti i progetti",
    },
    projects: {
      heading: "Progetti",
      subheading:
        "La galleria dei lavori di BlanqStudio: siti, interfacce ed esperimenti tra web e design.",
      visit: "Visita Sito",
    },
    gallery: {
      heading: "Galleria",
      subheading:
        "Tutti i visual dei progetti in un'unica parete: e-commerce, cliniche, boutique, app e landing page.",
      openImage: "Apri l'immagine a piena risoluzione",
    },
    about: {
      heading: "About",
      intro: [
        "BlanqStudio è lo studio personale di Giovanni Maffei: uno spazio dove tecnologia, design e sviluppo web si incontrano. Qui raccolgo i progetti che costruisco nel tempo libero, dagli esperimenti con l'intelligenza artificiale alle interfacce curate pixel per pixel.",
        "Amo partire da un'idea semplice e trasformarla in qualcosa di elegante e funzionale: prima capisco il problema, poi progetto la soluzione e la costruisco con tecnologie moderne, dall'idea al rilascio.",
        "Ogni progetto in galleria rappresenta una sfida superata e una competenza nuova: questo sito è il punto d'incontro di tutto ciò che ho imparato fin qui.",
      ],
      focusHeading: "Di cosa mi occupo",
      focusAreas: ["Sviluppo Web", "UI Design", "Next.js", "Sperimentazione AI"],
    },
    contact: {
      heading: "Creiamo qualcosa insieme.",
      subheading: "Raccontami la tua idea: ti rispondo entro 24 ore.",
    },
    footer: {
      tagline: "Tecnologia, design e sviluppo web, curati nei dettagli.",
      colophon: "Progettato e sviluppato da Giovanni Maffei",
      rights: "Tutti i diritti riservati.",
    },
  },
  en: {
    meta: {
      title: "BlanqStudio — Technology, Design, Web Development",
      description:
        "BlanqStudio is my personal space between technology, design and web development: projects, experiments and interfaces crafted with care.",
    },
    nav: {
      // href = path della route di sezione (senza prefisso lingua); "/" = home
      links: [
        { href: "/", label: "Home" },
        { href: "/work", label: "Projects" },
        { href: "/gallery", label: "Gallery" },
        { href: "/about", label: "About" },
      ],
      contact: "Get in touch",
      themeToLight: "Switch to light mode",
      themeToDark: "Switch to dark mode",
      menuOpen: "Open menu",
      menuClose: "Close menu",
    },
    hero: {
      eyebrow: "Technology · Design · Web Development",
      intro:
        "A personal studio where code and design meet: I build interfaces, websites and small digital experiments, crafted with care.",
      ctaPrimary: "View projects",
      ctaSecondary: "Get in touch",
      featuredHeading: "Featured projects",
      viewAll: "All projects",
    },
    projects: {
      heading: "Projects",
      subheading:
        "The BlanqStudio gallery: websites, interfaces and experiments between web and design.",
      visit: "Visit Site",
    },
    gallery: {
      heading: "Gallery",
      subheading:
        "All the project visuals on a single wall: e-commerce, clinics, boutiques, apps and landing pages.",
      openImage: "Open the full-resolution image",
    },
    about: {
      heading: "About",
      intro: [
        "BlanqStudio is Giovanni Maffei's personal studio: a space where technology, design and web development meet. Here I collect the projects I build in my free time, from AI experiments to interfaces crafted pixel by pixel.",
        "I love starting from a simple idea and turning it into something elegant and functional: first I understand the problem, then I design the solution and build it with modern technologies, from idea to launch.",
        "Every project in the gallery represents a challenge overcome and a new skill gained: this site is the meeting point of everything I've learned so far.",
      ],
      focusHeading: "What I do",
      focusAreas: ["Web Development", "UI Design", "Next.js", "AI Experiments"],
    },
    contact: {
      heading: "Let's build something together.",
      subheading:
        "Tell me about your idea — I'll get back to you within 24 hours.",
    },
    footer: {
      tagline: "Technology, design and web development, crafted with care.",
      colophon: "Designed & built by Giovanni Maffei",
      rights: "All rights reserved.",
    },
  },
} as const;

export type Locale = keyof typeof dictionaries;
export type Dictionary = (typeof dictionaries)[Locale];

export const locales = Object.keys(dictionaries) as Locale[];

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = (locale: Locale): Dictionary =>
  dictionaries[locale];

/* Compone l'URL localizzato di una voce di navigazione ("/" = home) */
export const localizeHref = (lang: Locale, href: string) =>
  href === "/" ? `/${lang}` : `/${lang}${href}`;
