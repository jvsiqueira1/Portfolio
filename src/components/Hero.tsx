"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              João Vitor de Siqueira Campos
              <span className="block text-primary mt-2">{t("hero.title")}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              {t("hero.description")}
            </p>
            <button
              onClick={handleCTAClick}
              className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary-600 transition-colors flex items-center gap-2 dark:text-black"
            >
              {t("hero.cta")}
              <ArrowRight size={18} />
            </button>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="relative w-72 h-72 md:w-96 md:h-96 overflow-hidden border-4 border-primary shadow-lg rounded-xl">
              <Image
                src="/me-image.jpg"
                alt="João Vitor de Siqueira Campos"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
