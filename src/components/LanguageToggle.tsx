"use client";

import type { MouseEvent } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { HTML_LANG, LANGUAGE_PATH } from "@/lib/site";

// The accessible name starts with the visible "PT / EN" (WCAG 2.5.3) and adds where the link goes,
// in the language of the current page.
const TOGGLE_LABEL = {
  pt: "PT / EN, mudar para inglês",
  en: "PT / EN, switch to Portuguese",
} as const;

export default function LanguageToggle() {
  const { language } = useLanguage();
  const target = language === "pt" ? "en" : "pt";
  const href = LANGUAGE_PATH[target];

  // A normal navigation to the other route; the current section's hash comes along.
  const keepSection = (event: MouseEvent<HTMLAnchorElement>) => {
    const { hash } = window.location;
    if (!hash || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    window.location.assign(`${href}${hash}`);
  };

  return (
    <a className="language-button" href={href} hrefLang={HTML_LANG[target]} onClick={keepSection} aria-label={TOGGLE_LABEL[language]} title={TOGGLE_LABEL[language]}>
      <span data-active={language === "pt"}>PT</span>{" "}
      <span>/</span>{" "}
      <span data-active={language === "en"}>EN</span>
    </a>
  );
}
