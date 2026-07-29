import type { MetadataRoute } from "next";
import { locales } from "./data/dictionaries";
import { site } from "./data/site";

/* Route pubbliche del sito ("" = home) */
const sections = ["", "/work", "/gallery", "/about"];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((lang) =>
    sections.map((section) => ({
      url: `${site.url}/${lang}${section}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: section === "" ? (lang === "it" ? 1 : 0.9) : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${site.url}/${l}${section}`]),
        ),
      },
    })),
  );
}
