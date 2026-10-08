"use client";

import { content, type Language, type SiteContent } from "@/content";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type LanguageContextValue = {
  language: Language;
  copy: SiteContent;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  cvHref: string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, updateLanguage] = useState<Language>("pt");

  useEffect(() => {
    const saved = window.localStorage.getItem("language");
    if (saved === "pt" || saved === "en") updateLanguage(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
  }, [language]);

  const setLanguage = useCallback((next: Language) => {
    updateLanguage(next);
    window.localStorage.setItem("language", next);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === "pt" ? "en" : "pt");
  }, [language, setLanguage]);

  const value = useMemo(
    () => ({
      language,
      copy: content[language],
      setLanguage,
      toggleLanguage,
      cvHref: `/cv/joao-vitor-siqueira-cv-${language}.pdf`,
    }),
    [language, setLanguage, toggleLanguage]
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
