import { notFound } from "next/navigation";
import Hero from "../components/Hero";
import ProjectsGrid from "../components/ProjectsGrid";
import { getDictionary, hasLocale } from "../data/dictionaries";

type Props = { params: Promise<{ lang: string }> };

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = getDictionary(lang);

  return (
    <>
      <Hero lang={lang} hero={dict.hero} />
      {/* Teaser della galleria: i primi 3 progetti, poi link alla pagina completa */}
      <ProjectsGrid
        lang={lang}
        dict={dict.projects}
        title={dict.hero.featuredHeading}
        headingLevel="h2"
        limit={3}
        viewAll={{ href: `/${lang}/work`, label: dict.hero.viewAll }}
      />
    </>
  );
}
