"use client";

import { content, type Language, type SiteContent } from "@/content";
import { createContext, useContext, useEffect, useMemo } from "react";

type LanguageContextValue = {
  language: Language;
  copy: SiteContent;
  cvHref: string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

// Before the language had its own URL, the choice was kept under this key.
const LEGACY_LANGUAGE_KEY = "language";

/** The language comes from the route ("/" or "/en"); nothing stored in the browser can change it. */
export function LanguageProvider({ language, children }: { language: Language; children: React.ReactNode }) {
  useEffect(() => {
    try {
      window.localStorage.removeItem(LEGACY_LANGUAGE_KEY);
    } catch {
      // Storage can be blocked; there is nothing to clean up then.
    }
  }, []);

  const value = useMemo(
    () => ({
      language,
      copy: content[language],
      cvHref: `/cv/joao-vitor-siqueira-cv-${language}.pdf`,
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLanguage must be used within LanguageProvider");
  return value;
}
