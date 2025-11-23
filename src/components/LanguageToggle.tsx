"use client";

import { BrazilFlag, USAFlag } from "@/assets/flags";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  // Mostra a bandeira do idioma que será ativado ao clicar
  const nextLanguage = language === "pt" ? "en" : "pt";
  const tooltip =
    nextLanguage === "pt" ? "Mudar para Português" : "Switch to English";

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center justify-center w-10 h-10 rounded-lg bg-background border border-gray-800 hover:border-primary/50 transition-all duration-200 hover:scale-110 overflow-hidden"
      aria-label="Toggle language"
      title={tooltip}
    >
      {nextLanguage === "pt" ? (
        <BrazilFlag className="w-6 h-6" />
      ) : (
        <USAFlag className="w-6 h-6" />
      )}
    </button>
  );
}
