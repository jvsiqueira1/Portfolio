'use client'

import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  
  const handleCTAClick = () => {
    const element = document.getElementById("projects");
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="hero" className="pt-32 pb-16 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            João Vitor de Siqueira Campos
            <span className="block text-primary mt-2">
              {t('hero.title')}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
            {t('hero.description')}
          </p>
          <button
            onClick={handleCTAClick}
            className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary-600 transition-colors flex items-center gap-2 dark:text-black"
          >
            {t('hero.cta')}
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
