@AGENTS.md

# BlanqStudio — convenzioni per Claude

- **Next pinnato a 16.2.10**: non alzare mai la versione senza verificare `app/components/PageTransition.tsx` (dipende dall'internal `LayoutRouterContext`).
- **Design**: identità dark visionOS-glass ereditata da `../sitoweb-1` — token e utility (`.glass`, `.card`, `.btn*`, `.text-display`) vivono tutti in `app/globals.css`. Non introdurre palette o radius nuovi; l'accento è `--accent` usato con parsimonia.
- **i18n**: ogni stringa visibile all'utente vive in `app/data/dictionaries.ts`, sempre in entrambe le lingue (it + en). Le route sono localizzate sotto `app/[lang]`; i link interni usano `TransitionLink` + `localizeHref`.
- **Galleria progetti**: dati in `app/data/projects.ts`. Workflow immagini: l'utente lascia i file in `asset/` (drop zone) → `npm run sync-assets` li copia in `public/asset/` → referenziare come `/asset/<file>` nel campo `image`. Quando Mr. Maffei chiede di aggiungere un progetto, eseguire il sync e aggiornare `projects.ts` (descrizioni in entrambe le lingue).
- **Niente backend**: nessun DB, auth o API route. Il sito è interamente statico/prerenderizzato.
