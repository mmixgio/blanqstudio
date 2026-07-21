import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectsGrid from "../../components/ProjectsGrid";
import { getDictionary, hasLocale } from "../../data/dictionaries";
import { site } from "../../data/site";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = getDictionary(lang);

  return {
    // Il template del layout aggiunge "— BlanqStudio"
    title: dict.projects.heading,
    description: dict.projects.subheading,
    alternates: {
      canonical: `/${lang}/work`,
      languages: { it: "/it/work", en: "/en/work" },
    },
    openGraph: {
      title: `${dict.projects.heading} — ${site.name}`,
      description: dict.projects.subheading,
      url: `/${lang}/work`,
    },
  };
}

export default async function WorkPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = getDictionary(lang);

  return (
    <ProjectsGrid
      lang={lang}
      dict={dict.projects}
      title={dict.projects.heading}
      subtitle={dict.projects.subheading}
      headingLevel="h1"
    />
  );
}
