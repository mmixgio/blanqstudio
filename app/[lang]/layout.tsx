import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { notFound } from "next/navigation";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PageTransition from "../components/PageTransition";
import { ThemeProvider } from "../components/ThemeProvider";
import {
  getDictionary,
  hasLocale,
  locales,
  type Locale,
} from "../data/dictionaries";
import { site } from "../data/site";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = getDictionary(lang as Locale);

  return {
    metadataBase: new URL(site.url),
    title: {
      default: dict.meta.title,
      template: `%s — ${site.name}`,
    },
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { it: "/it", en: "/en" },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${lang}`,
      siteName: site.name,
      locale: lang === "it" ? "it_IT" : "en_US",
      type: "website",
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050506" },
    { media: "(prefers-color-scheme: light)", color: "#f5f5f7" },
  ],
};

/* Imposta data-theme su <html> PRIMA dell'idratazione: senza questo script
   la pagina lampeggerebbe nel tema sbagliato per un frame (FOUC) ogni volta
   che il tema salvato differisce dalla preferenza di sistema. */
const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var theme = stored === "light" || stored === "dark"
      ? stored
      : (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    document.documentElement.dataset.theme = theme;
  } catch (e) {}
})();
`;

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-foreground">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
        <ThemeProvider>
          {/* Sfondo e navbar vivono nel layout: restano montati e immobili
              mentre le pagine transiscono sotto di loro */}
          <div aria-hidden className="ambient-bg" />
          <Navbar lang={lang} nav={dict.nav} />

          {/* Solo il contenuto delle pagine (e il footer) è animato */}
          <PageTransition
            footer={
              <Footer lang={lang} nav={dict.nav} footer={dict.footer} />
            }
          >
            {children}
          </PageTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}
