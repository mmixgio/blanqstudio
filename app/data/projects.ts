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
  /** Dimensioni reali dell'immagine: servono alla Gallery per il ratio naturale */
  imageSize?: { width: number; height: number };
  /** URL live del progetto; se assente il bottone non viene mostrato */
  link?: string;
};

export const projects: Project[] = [
  {
    slug: "gazu",
    title: "GAZU",
    description: {
      it: "E-commerce concept per un brand di moda: hero tipografica in bianco e nero, categorie uomo/donna/kids e vetrina prodotti dal ritmo editoriale.",
      en: "E-commerce concept for a fashion brand: black-and-white typographic hero, men/women/kids categories and a product showcase with an editorial rhythm.",
    },
    stack: ["E-commerce", "Fashion", "UI Design"],
    image: "/asset/IMG_1807.JPG",
    imageSize: { width: 967, height: 1627 },
  },
  {
    slug: "dentiva",
    title: "Dentiva",
    description: {
      it: "Sito per una clinica dentistica: palette azzurro polvere, render 3D dell'impianto, numeri dello studio e servizi presentati in card scure.",
      en: "Website for a dental clinic: powder-blue palette, 3D implant render, practice stats and services presented in dark cards.",
    },
    stack: ["Healthcare", "Landing Page", "UI Design"],
    image: "/asset/IMG_1821.JPG",
    imageSize: { width: 1200, height: 2159 },
  },
  {
    slug: "swatch",
    title: "S'WATCH",
    description: {
      it: "Hero per una boutique di orologi: sfondo sagomato a clessidra, oro su toni cioccolato e focus totale sul prodotto.",
      en: "Hero for a watch boutique: hourglass-shaped backdrop, gold on chocolate tones and total focus on the product.",
    },
    stack: ["Jewelry", "E-commerce", "Hero"],
    image: "/asset/IMG_1819.JPG",
    imageSize: { width: 1199, height: 786 },
  },
  {
    slug: "modo",
    title: "MODO",
    description: {
      it: "Sito vetrina per un'azienda di case modulari chiavi in mano: catalogo modelli con prezzi, processo in sei step e form di consulenza.",
      en: "Showcase site for a turnkey modular-home company: model catalog with pricing, six-step process and a consultation form.",
    },
    stack: ["Corporate", "Real Estate", "Web Design"],
    image: "/asset/IMG_1808.JPG",
    imageSize: { width: 935, height: 1683 },
  },
  {
    slug: "hotle",
    title: "Hotle",
    description: {
      it: "Landing per eco-ville e cabin modulari a Bali: fotografia calda al tramonto, tipografia mista serif/sans e sezioni che respirano.",
      en: "Landing page for eco-villas and modular cabins in Bali: warm dusk photography, mixed serif/sans typography and sections that breathe.",
    },
    stack: ["Hospitality", "Architecture", "Landing Page"],
    image: "/asset/IMG_1814.JPG",
    imageSize: { width: 1200, height: 2400 },
  },
  {
    slug: "aura-store",
    title: "Aura Store",
    description: {
      it: "Home concept per uno store di abbigliamento: logotipo spezzato attorno al soggetto, monospace grafico e anteprima della nuova collezione.",
      en: "Home concept for a clothing store: logotype split around the subject, graphic monospace type and a new-collection preview.",
    },
    stack: ["E-commerce", "Fashion", "Art Direction"],
    image: "/asset/IMG_1817.JPG",
    imageSize: { width: 1200, height: 823 },
  },
  {
    slug: "urban-collection",
    title: "Urban Collection",
    description: {
      it: "Home page per uno store streetwear: palette sabbia, carosello della nuova collezione e griglia dei capi più venduti.",
      en: "Home page for a streetwear store: sand palette, new-collection carousel and a grid of best-selling pieces.",
    },
    stack: ["E-commerce", "Streetwear", "UI Design"],
    image: "/asset/IMG_1815.JPG",
    imageSize: { width: 736, height: 1104 },
  },
  {
    slug: "vision-glasses",
    title: "Future of Vision",
    description: {
      it: "Sito per un brand di smart glasses: hero fotografico ad alto impatto, listino modelli e sezione community con newsletter.",
      en: "Website for a smart-glasses brand: high-impact photographic hero, model lineup and a community section with newsletter.",
    },
    stack: ["Tech", "E-commerce", "Web Design"],
    image: "/asset/IMG_1816.JPG",
    imageSize: { width: 604, height: 1200 },
  },
  {
    slug: "hoodie-app",
    title: "Hoodie Store App",
    description: {
      it: "App mobile per uno shop di streetwear: schede prodotto con vista 3D del capo, varianti colore/taglia e checkout rapido.",
      en: "Mobile app for a streetwear shop: product pages with a 3D garment view, color/size variants and quick checkout.",
    },
    stack: ["Mobile App", "E-commerce", "UI Design"],
    image: "/asset/IMG_1809.JPG",
    imageSize: { width: 1024, height: 768 },
  },
  {
    slug: "vandal-bar",
    title: "Vandal Bar",
    description: {
      it: "App mobile per un wine bar: catalogo di vini e drink con recensioni, dettaglio bottiglia con abbinamenti e carrello immediato.",
      en: "Mobile app for a wine bar: wine and drinks catalog with reviews, bottle detail with pairings and instant cart.",
    },
    stack: ["Mobile App", "Food & Drink", "UI Design"],
    image: "/asset/IMG_1818.JPG",
    imageSize: { width: 1200, height: 900 },
  },
  {
    slug: "airpods-max",
    title: "AirPods Max",
    description: {
      it: "Landing page prodotto in stile Apple: gerarchia tipografica pulita, tanto spazio bianco e le cuffie protagoniste assolute della scena.",
      en: "Apple-style product landing page: clean typographic hierarchy, generous white space and the headphones as the absolute star.",
    },
    stack: ["Landing Page", "Product", "UI Design"],
    image: "/asset/IMG_1810.JPG",
    imageSize: { width: 736, height: 1380 },
  },
  {
    slug: "heymale",
    title: "HEYMALE",
    description: {
      it: "Lookbook editoriale per una linea di t-shirt oversize: griglia fotografica in bianco e nero e copy essenziale da rivista.",
      en: "Editorial lookbook for an oversized tee line: black-and-white photo grid and minimal magazine-style copy.",
    },
    stack: ["Editorial", "Fashion", "Branding"],
    image: "/asset/IMG_1811.JPG",
    imageSize: { width: 733, height: 978 },
  },
  {
    slug: "zrobim-architects",
    title: "Terra Cotta",
    description: {
      it: "Hero concept per uno studio di architettura: titolo monumentale sovrapposto al render, scheda tecnica del progetto e atmosfera cinematografica.",
      en: "Hero concept for an architecture studio: monumental title layered over the render, project spec card and a cinematic mood.",
    },
    stack: ["Architecture", "Web Design", "Hero"],
    image: "/asset/IMG_1812.JPG",
    imageSize: { width: 735, height: 462 },
  },
  {
    slug: "glass-pricing",
    title: "Glass Pricing",
    description: {
      it: "Pagina pricing in glassmorphism scuro per un'app di pagamenti: tre piani a confronto, card traslucide e contrasto netto sulle CTA.",
      en: "Dark glassmorphism pricing page for a payments app: three plans side by side, translucent cards and sharp CTA contrast.",
    },
    stack: ["Fintech", "Pricing", "Glassmorphism"],
    image: "/asset/IMG_1813.JPG",
    imageSize: { width: 1200, height: 900 },
  },
  {
    slug: "tenista",
    title: "TENISTA",
    description: {
      it: "Sito per un club di tennis: fotografia in motion blur, numeri della community e tour dei campi tra cemento e terra rossa.",
      en: "Website for a tennis club: motion-blur photography, community stats and a tour of hard and clay courts.",
    },
    stack: ["Sport", "Landing Page", "Web Design"],
    image: "/asset/IMG_1820.JPG",
    imageSize: { width: 1200, height: 2159 },
  },
  {
    slug: "seven",
    title: "seven",
    description: {
      it: "Concept editoriale per una piattaforma di tecnologia e robotica: tipografia gigante, still-life industriali e struttura a colonne.",
      en: "Editorial concept for a technology and robotics platform: giant typography, industrial still-lifes and a columned structure.",
    },
    stack: ["Editorial", "Tech", "Art Direction"],
    image: "/asset/IMG_1822.JPG",
    imageSize: { width: 1000, height: 1500 },
  },
  {
    slug: "kinetic-studio",
    title: "Kinetic Studio",
    description: {
      it: "Sito per un'agenzia social: lettering cinetico, scie di luce arancio e card dei servizi dal ritmo alternato.",
      en: "Website for a social media agency: kinetic lettering, orange light trails and service cards with an alternating rhythm.",
    },
    stack: ["Agency", "Branding", "Web Design"],
    image: "/asset/IMG_1823.JPG",
    imageSize: { width: 736, height: 1104 },
  },
];
