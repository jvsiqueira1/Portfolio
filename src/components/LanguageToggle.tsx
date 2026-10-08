"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const next = language === "pt" ? "EN" : "PT";
  const label = language === "pt" ? "EN, Switch to English" : "PT, Mudar para Português";

  return (
    <button
      type="button"
      className="language-button"
      onClick={toggleLanguage}
      aria-label={label}
      title={label}
    >
      {next}
    </button>
  );
}
