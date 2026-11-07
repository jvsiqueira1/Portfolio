"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const label = language === "pt" ? "Switch to English" : "Mudar para português";

  return (
    <button
      type="button"
      className="language-button"
      onClick={toggleLanguage}
      aria-label={label}
      title={label}
      lang={language === "pt" ? "en" : "pt-BR"}
    >
      <span data-active={language === "pt"}>PT</span>
      <span aria-hidden="true">/</span>
      <span data-active={language === "en"}>EN</span>
    </button>
  );
}
