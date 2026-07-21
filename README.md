# BlanqStudio

Blog/portfolio personale di Giovanni Maffei — tecnologia, design e sviluppo web. Stessa identità visiva dark visionOS-glass di `sitoweb-1`, in versione leggera: nessun database, nessun backend, contenuti in file tipizzati.

## Comandi

```bash
npm run dev          # sviluppo su http://localhost:3000 (redirect → /it)
npm run build        # build di produzione
npm run start        # serve la build
npm run lint         # ESLint
npm run sync-assets  # copia asset/ → public/asset/
```

## Stack

- Next.js 16.2.10 (App Router) — **versione pinnata, non aggiornare** senza verificare `PageTransition` (usa un'API interna di Next). Vedi `AGENTS.md`.
- Tailwind CSS v4 (config CSS-first, tutto in `app/globals.css`)
- `motion` per le animazioni
- Localizzazione IT/EN via routing `app/[lang]` (`/` reindirizza a `/it`)

## Aggiungere un progetto alla galleria

1. Lascia l'immagine (es. `mio-progetto.jpg`) nella cartella **`asset/`** (drop zone: Next non la serve direttamente).
2. Esegui `npm run sync-assets` → il file viene copiato in `public/asset/`.
3. Aggiungi (o aggiorna) la voce in **`app/data/projects.ts`**:

```ts
{
  slug: "mio-progetto",
  title: "Mio Progetto",
  description: {
    it: "Descrizione breve in italiano.",
    en: "Short description in English.",
  },
  stack: ["Next.js", "TypeScript"],
  image: "/asset/mio-progetto.jpg", // opzionale: senza, placeholder automatico
  link: "https://esempio.com",      // opzionale: senza, niente bottone
}
```

Le card senza `image` mostrano un placeholder (gradiente + iniziale del titolo), quindi la galleria funziona anche prima di caricare le immagini.

## Struttura

- `app/[lang]/` — pagine: home (hero + teaser progetti), `work` (galleria completa), `about` (bio + contatti)
- `app/components/` — Navbar a pillola, card glass con tilt, reveal allo scroll, transizioni di pagina, tema chiaro/scuro
- `app/data/` — `site.ts` (identità), `dictionaries.ts` (testi IT/EN), `projects.ts` (galleria)
- `asset/` — drop zone immagini; `public/asset/` — immagini servite
