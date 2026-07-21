import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Contact from "../../components/Contact";
import Reveal from "../../components/Reveal";
import { getDictionary, hasLocale } from "../../data/dictionaries";
import { site } from "../../data/site";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = getDictionary(lang);

  return {
    // Il template del layout aggiunge "— BlanqStudio"
    title: dict.about.heading,
    description: dict.about.intro[0],
    alternates: {
      canonical: `/${lang}/about`,
      languages: { it: "/it/about", en: "/en/about" },
    },
    openGraph: {
      title: `${dict.about.heading} — ${site.name}`,
      description: dict.about.intro[0],
      url: `/${lang}/about`,
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = getDictionary(lang);

  return (
    <>
      <section className="mx-auto w-full max-w-5xl px-6 py-24 sm:px-10">
        <Reveal>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {dict.about.heading}
          </h1>
        </Reveal>

        <div className="mt-8 max-w-2xl space-y-5">
          {dict.about.intro.map((paragraph, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p className="leading-relaxed text-text-secondary sm:text-lg">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <h2 className="mt-16 text-xs uppercase tracking-[0.2em] text-text-tertiary">
            {dict.about.focusHeading}
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {dict.about.focusAreas.map((area) => (
              <span
                key={area}
                className="rounded-full bg-surface-3 px-4 py-1.5 text-sm text-foreground"
              >
                {area}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      <Contact contact={dict.contact} />
    </>
  );
}
