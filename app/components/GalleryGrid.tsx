import Image from "next/image";
import type { Dictionary } from "../data/dictionaries";
import { projects } from "../data/projects";
import Reveal from "./Reveal";

type GalleryDict = Dictionary["gallery"];

/* Parete masonry: colonne CSS così ogni visual mantiene il suo ratio naturale
   (mix di screenshot verticali e orizzontali). I dati arrivano da projects.ts:
   ogni progetto con image + imageSize compare automaticamente anche qui. */
export default function GalleryGrid({ dict }: { dict: GalleryDict }) {
  const items = projects.filter(
    (p): p is typeof p & { image: string; imageSize: { width: number; height: number } } =>
      Boolean(p.image && p.imageSize),
  );

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {dict.heading}
        </h1>
        <p className="mt-3 max-w-xl text-text-secondary">{dict.subheading}</p>
      </Reveal>

      <div className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3">
        {items.map((project, i) => (
          <div key={project.slug} className="mb-6 break-inside-avoid">
            <Reveal delay={Math.min(i, 6) * 0.08} variant="scale">
              <a
                href={project.image}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} — ${dict.openImage}`}
                className="card group block overflow-hidden"
              >
                <div className="relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={project.imageSize.width}
                    height={project.imageSize.height}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-auto w-full transition duration-500 group-hover:scale-[1.02]"
                  />
                  {/* Didascalia in overlay, visibile su hover/focus */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 opacity-0 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {project.title}
                      </p>
                      <p className="text-xs text-white/70">
                        {project.stack.join(" · ")}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
