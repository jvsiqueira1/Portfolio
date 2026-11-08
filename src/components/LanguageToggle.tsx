"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { PAGE_SECTION_IDS, sectionAtReadingLine, trackUserScroll, type UserScroll } from "@/lib/sections";
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

  // Where the user put the page. Focus alone (Tabbing to this link) must not change the section the
  // toggle carries, even if the browser scrolls to the focused element.
  const userScroll = useRef<UserScroll | null>(null);
  useEffect(() => {
    const tracker = trackUserScroll();
    userScroll.current = tracker;
    return () => {
      tracker.stop();
      userScroll.current = null;
    };
  }, []);

  // A normal navigation to the other route that lands on the section in view, by the header's
  // reading-line rule at the position the user chose. That position wins over the URL hash, which
  // may be left over from an earlier menu click. From the hero the plain href goes to the top, and
  // modified clicks (new tab, new window, download) keep the link's default behavior.
  const keepSection = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const section = sectionAtReadingLine(PAGE_SECTION_IDS, userScroll.current?.scrollY() ?? window.scrollY);
    if (section === PAGE_SECTION_IDS[0]) return;
    event.preventDefault();
    window.location.assign(`${href}#${section}`);
  };

  return (
    <a className="language-button" href={href} hrefLang={HTML_LANG[target]} onClick={keepSection} aria-label={TOGGLE_LABEL[language]} title={TOGGLE_LABEL[language]}>
      <span data-active={language === "pt"}>PT</span>{" "}
      <span>/</span>{" "}
      <span data-active={language === "en"}>EN</span>
    </a>
  );
}
