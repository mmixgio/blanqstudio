/* Copia le immagini dalla drop zone asset/ a public/asset/, da cui Next
   le serve come /asset/<file>. Uso: npm run sync-assets */
import { cpSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";

const SRC = "asset";
const DEST = join("public", "asset");

mkdirSync(DEST, { recursive: true });

let copied = 0;
for (const entry of readdirSync(SRC)) {
  if (entry.startsWith(".")) continue; // .DS_Store, .gitkeep
  cpSync(join(SRC, entry), join(DEST, entry), { recursive: true });
  copied++;
}

console.log(`sync-assets: ${copied} file → public/asset/`);
