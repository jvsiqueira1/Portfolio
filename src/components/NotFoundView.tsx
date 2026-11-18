import Image from "next/image";
import Link from "next/link";
import type { Language } from "@/content";
import { HTML_LANG, LANGUAGE_PATH } from "@/lib/site";

const COPY: Record<Language, { label: string; text: string; home: string; other: string }> = {
  pt: {
    label: "Página não encontrada",
    text: "Este endereço não existe ou mudou de lugar.",
    home: "Voltar ao início",
    other: "English home",
  },
  en: {
    label: "Page not found",
    text: "This address does not exist or has moved.",
    home: "Back to home",
    other: "Início em português",
  },
};

// The 404 in the site's own frame: brand, the "[NNN] //" label, a display h1 and a way back home (44px+
// targets), in the language of the route that missed. Both 404 routes render it inside SiteDocument.
export default function NotFoundView({ language }: { language: Language }) {
  const copy = COPY[language];
  const other: Language = language === "pt" ? "en" : "pt";
  return (
    <main id="main" className="not-found">
      <div className="shell not-found-shell">
        <Link href={LANGUAGE_PATH[language]} className="brand not-found-brand">
          <Image src="/brand/jvs-mark.svg" alt="" width={36} height={36} />
          <Image className="brand-wordmark" src="/brand/jvs-wordmark.svg" alt="JVS//SYS" width={138} height={28} />
        </Link>
        <p className="section-label"><span className="section-label-index">[404]</span><span>{"// "}{copy.label}</span></p>
        <h1 className="not-found-title">404<span className="block-cursor" aria-hidden="true" /></h1>
        <p className="not-found-text">{copy.text}</p>
        <div className="not-found-actions">
          <Link className="button button-primary" href={LANGUAGE_PATH[language]}>{copy.home}</Link>
          <Link className="button button-secondary" href={LANGUAGE_PATH[other]} lang={HTML_LANG[other]} hrefLang={HTML_LANG[other]}>{copy.other}</Link>
        </div>
      </div>
    </main>
  );
}
