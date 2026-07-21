import type { Dictionary } from "../data/dictionaries";
import { site } from "../data/site";
import Reveal from "./Reveal";

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.78 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.04.77 2.1v3.12c0 .3.21.66.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H5.9v-2.91h4.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.47H15.2c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  );
}

export default function Contact({
  contact,
}: {
  contact: Dictionary["contact"];
}) {
  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-4xl px-6 py-28 text-center sm:px-10"
    >
      <Reveal>
        <h2 className="text-display mx-auto max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">
          {contact.heading}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-text-secondary sm:text-lg">
          {contact.subheading}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${site.email}`}
            className="btn btn-primary !px-7 !py-3.5"
          >
            {site.email}
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="btn btn-glass h-12 w-12 !p-0 text-text-secondary hover:text-foreground"
          >
            <GitHubIcon />
          </a>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="btn btn-glass h-12 w-12 !p-0 text-text-secondary hover:text-foreground"
          >
            <InstagramIcon />
          </a>
          <a
            href={site.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="btn btn-glass h-12 w-12 !p-0 text-text-secondary hover:text-foreground"
          >
            <FacebookIcon />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
