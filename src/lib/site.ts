import type { Metadata, Viewport } from "next";
import { content, type Language } from "@/content";
// A static import gets a content-hashed URL: the Open Graph and Twitter cards share it, and a new image
// gets a new URL, so the immutable cache never keeps serving the old one.
import socialImage from "@/assets/opengraph-image.png";

export const SITE_URL = "https://www.jvsdev.com.br";
export const SITE_NAME = "JVS//SYS";

/** The route is the source of truth for the language: "/" is Portuguese and "/en" is English. */
export const LANGUAGE_PATH: Record<Language, string> = { pt: "/", en: "/en" };
export const HTML_LANG: Record<Language, string> = { pt: "pt-BR", en: "en" };

const OG_LOCALE: Record<Language, string> = { pt: "pt_BR", en: "en_US" };

// hreflang is reciprocal: both pages list every version, and x-default points to the Portuguese home.
const LANGUAGE_ALTERNATES = { "pt-BR": LANGUAGE_PATH.pt, en: LANGUAGE_PATH.en, "x-default": LANGUAGE_PATH.pt };

const GITHUB_URL = "https://github.com/jvsiqueira1";
const LINKEDIN_URL = "https://www.linkedin.com/in/joaovitorsiqueira1/";

const seo: Record<Language, {
  title: string;
  description: string;
  socialTitle: string;
  socialDescription: string;
  imageAlt: string;
  keywords: string[];
}> = {
  pt: {
    title: "JVS//SYS | João Vitor",
    description:
      "Portfólio de João Vitor, desenvolvedor full-stack e Analista de TI no DETRAN-MT. Projetos, experiência, stack e CV em português e inglês.",
    socialTitle: "João Vitor | Desenvolvedor Full-Stack",
    socialDescription: "Sistemas que conectam produto, dados e operação.",
    imageAlt:
      "Cartão JVS//SYS com o nome João Vitor em letras grandes sobre uma malha de pontos e linhas, e a frase: full-stack, sistemas que aguentam o mundo real.",
    keywords: ["João Vitor", "Desenvolvedor Full-Stack", "Node.js", "Nest.js", "React", "Next.js", "PostgreSQL", "Cuiabá"],
  },
  en: {
    title: "JVS//SYS | João Vitor",
    description:
      "Portfolio of João Vitor, full-stack developer and IT Analyst at DETRAN-MT. Projects, experience, stack and CV in English and Portuguese.",
    socialTitle: "João Vitor | Full-Stack Developer",
    socialDescription: "Systems that connect product, data and operations.",
    imageAlt:
      "JVS//SYS card with the name João Vitor in large type over a mesh of dots and lines, and the Portuguese line: full-stack, systems that hold up in the real world.",
    keywords: ["João Vitor", "Full-Stack Developer", "Node.js", "Nest.js", "React", "Next.js", "PostgreSQL", "Cuiabá, Brazil"],
  },
};

export const siteViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07080A",
};

export function buildMetadata(language: Language): Metadata {
  const page = seo[language];
  const other: Language = language === "pt" ? "en" : "pt";
  const image = {
    url: socialImage.src,
    width: socialImage.width,
    height: socialImage.height,
    alt: page.imageAlt,
    type: "image/png",
  };

  return {
    metadataBase: new URL(SITE_URL),
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    authors: [{ name: "João Vitor de Siqueira Campos", url: SITE_URL }],
    alternates: {
      canonical: LANGUAGE_PATH[language],
      languages: LANGUAGE_ALTERNATES,
    },
    openGraph: {
      title: page.socialTitle,
      description: page.socialDescription,
      url: LANGUAGE_PATH[language],
      siteName: SITE_NAME,
      locale: OG_LOCALE[language],
      alternateLocale: [OG_LOCALE[other]],
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: page.socialTitle,
      description: page.socialDescription,
      images: [image],
    },
  };
}

/** ProfilePage + Person with the public data the page already shows. No phone number. */
export function buildProfileJsonLd(language: Language) {
  const copy = content[language];
  const url = new URL(LANGUAGE_PATH[language], SITE_URL).href;

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${url}#profile`,
    url,
    name: seo[language].title,
    description: seo[language].description,
    inLanguage: HTML_LANG[language],
    mainEntity: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "João Vitor de Siqueira Campos",
      alternateName: copy.hero.name,
      jobTitle: copy.hero.role,
      url: new URL(LANGUAGE_PATH.pt, SITE_URL).href,
      email: `mailto:${copy.contact.email}`,
      sameAs: [GITHUB_URL, LINKEDIN_URL],
    },
  };
}
