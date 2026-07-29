import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GalleryGrid from "../../components/GalleryGrid";
import { getDictionary, hasLocale } from "../../data/dictionaries";
import { site } from "../../data/site";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = getDictionary(lang);

  return {
    // Il template del layout aggiunge "— BlanqStudio"
    title: dict.gallery.heading,
    description: dict.gallery.subheading,
    alternates: {
      canonical: `/${lang}/gallery`,
      languages: { it: "/it/gallery", en: "/en/gallery" },
    },
    openGraph: {
      title: `${dict.gallery.heading} — ${site.name}`,
      description: dict.gallery.subheading,
      url: `/${lang}/gallery`,
    },
  };
}

export default async function GalleryPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = getDictionary(lang);

  return <GalleryGrid dict={dict.gallery} />;
}
