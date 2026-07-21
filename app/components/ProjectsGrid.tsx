import Image from "next/image";
import type { Dictionary, Locale } from "../data/dictionaries";
import { projects, type Project } from "../data/projects";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import TransitionLink from "./TransitionLink";

type ProjectsDict = Dictionary["projects"];

function ProjectVisual({ project }: { project: Project }) {
  if (project.image) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  /* Placeholder visivo mostrato finché l'immagine del progetto non viene
     impostata in app/data/projects.ts (workflow: asset/ → sync-assets) */
  return (
    <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-800 via-neutral-900 to-black">
      <span className="text-display text-5xl font-semibold tracking-tight sm:text-6xl">
        {project.title.charAt(0)}
      </span>
    </div>
  );
}

function ProjectCard({
  project,
  lang,
  dict,
}: {
  project: Project;
  lang: Locale;
  dict: ProjectsDict;
}) {
  return (
    <TiltCard className="h-full">
      <article className="card group flex h-full flex-col overflow-hidden">
        <ProjectVisual project={project} />
        <div className="flex flex-1 flex-col gap-4 p-6 sm:p-8">
          <h3 className="text-lg font-semibold sm:text-xl">{project.title}</h3>
          <p className="text-sm leading-relaxed text-text-secondary">
            {project.description[lang]}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-surface-3 px-3 py-1 text-xs text-text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
          {/* Bottone "Visita Sito": compare solo se il progetto ha un URL live */}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-glass mt-auto w-fit !px-5 !py-2 text-sm"
            >
              {dict.visit}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          )}
        </div>
      </article>
    </TiltCard>
  );
}

export default function ProjectsGrid({
  lang,
  dict,
  title,
  subtitle,
  headingLevel = "h1",
  limit,
  viewAll,
}: {
  lang: Locale;
  dict: ProjectsDict;
  /** Intestazione della sezione; se assente l'intro non viene renderizzata */
  title?: string;
  subtitle?: string;
  /** h1 sulla pagina Progetti, h2 quando la griglia è una sezione della home */
  headingLevel?: "h1" | "h2";
  /** Numero massimo di card (teaser in home); assente = tutti i progetti */
  limit?: number;
  /** Link "Tutti i progetti" mostrato sotto la griglia (usato in home) */
  viewAll?: { href: string; label: string };
}) {
  const Heading = headingLevel;
  const shown = limit ? projects.slice(0, limit) : projects;

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-24 sm:px-10">
      {title && (
        <Reveal>
          <Heading className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </Heading>
          {subtitle && (
            <p className="mt-3 max-w-xl text-text-secondary">{subtitle}</p>
          )}
        </Reveal>
      )}

      {/* Griglia progetti */}
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.12} variant="scale">
            <ProjectCard project={project} lang={lang} dict={dict} />
          </Reveal>
        ))}
      </div>

      {viewAll && (
        <Reveal delay={0.2}>
          <div className="mt-12 flex justify-center">
            <TransitionLink href={viewAll.href} className="btn btn-glass">
              {viewAll.label}
              <span aria-hidden>→</span>
            </TransitionLink>
          </div>
        </Reveal>
      )}
    </section>
  );
}
