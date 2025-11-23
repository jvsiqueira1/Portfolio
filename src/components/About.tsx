"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import {
  Briefcase,
  Code,
  GraduationCap,
  Mail,
  Phone,
  Rocket,
} from "lucide-react";
import { Card } from "./ui/card";

export default function About() {
  const { t } = useLanguage();

  const roadmap = [
    {
      year: "2021",
      type: "education",
      titleKey: "about.roadmap.education.title",
      subtitleKey: "about.roadmap.education.subtitle",
      descriptionKey: "about.roadmap.education.description",
      icon: <GraduationCap className="w-6 h-6" />,
    },
    {
      year: "2021",
      type: "work",
      titleKey: "about.roadmap.internship.title",
      subtitleKey: "about.roadmap.internship.subtitle",
      descriptionKey: "about.roadmap.internship.description",
      icon: <Briefcase className="w-6 h-6" />,
    },
    {
      year: "2023",
      type: "work",
      titleKey: "about.roadmap.frontend.title",
      subtitleKey: "about.roadmap.frontend.subtitle",
      descriptionKey: "about.roadmap.frontend.description",
      icon: <Code className="w-6 h-6" />,
    },
    {
      year: "2024",
      type: "growth",
      titleKey: "about.roadmap.growth.title",
      subtitleKey: "about.roadmap.growth.subtitle",
      descriptionKey: "about.roadmap.growth.description",
      icon: <Rocket className="w-6 h-6" />,
    },
    {
      year: "2025",
      type: "work",
      titleKey: "about.roadmap.fullstack1.title",
      subtitleKey: "about.roadmap.fullstack1.subtitle",
      descriptionKey: "about.roadmap.fullstack1.description",
      icon: <Code className="w-6 h-6" />,
    },
    {
      year: "2025",
      type: "work",
      titleKey: "about.roadmap.fullstack2.title",
      subtitleKey: "about.roadmap.fullstack2.subtitle",
      descriptionKey: "about.roadmap.fullstack2.description",
      icon: <Rocket className="w-6 h-6" />,
    },
  ];

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "education":
        return {
          bg: "bg-blue-500/20",
          text: "text-blue-400",
          border: "border-blue-500/30",
          dot: "bg-blue-500",
        };
      case "work":
        return {
          bg: "bg-green-500/20",
          text: "text-green-400",
          border: "border-green-500/30",
          dot: "bg-green-500",
        };
      case "growth":
        return {
          bg: "bg-purple-500/20",
          text: "text-purple-400",
          border: "border-purple-500/30",
          dot: "bg-purple-500",
        };
      default:
        return {
          bg: "bg-primary/20",
          text: "text-primary",
          border: "border-primary/30",
          dot: "bg-primary",
        };
    }
  };

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            {t("about.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("about.subtitle")}
          </p>
        </div>

        {/* Timeline Vertical */}
        <div className="relative">
          {/* Linha vertical */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary transform md:-translate-x-1/2"></div>

          {/* Itens do roadmap */}
          <div className="space-y-12">
            {roadmap.map((item, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-start gap-6 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Ponto na linha */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 md:-translate-x-1/2 z-10">
                  <div
                    className={`w-4 h-4 rounded-full border-4 border-background ${
                      getTypeStyles(item.type).dot
                    }`}
                  ></div>
                </div>

                {/* Card do item */}
                <Card
                  className={`bg-card p-6 border shadow-lg hover:shadow-xl transition-all duration-300 flex-1 ml-12 md:ml-0 ${
                    index % 2 === 0
                      ? "md:mr-auto md:max-w-[45%]"
                      : "md:ml-auto md:max-w-[45%]"
                  } ${getTypeStyles(item.type).border}`}
                >
                  <div className="flex items-start gap-4 mb-3">
                    <div
                      className={`p-2 rounded-lg ${
                        getTypeStyles(item.type).bg
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-primary font-bold text-sm">
                          {item.year}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            getTypeStyles(item.type).bg
                          } ${getTypeStyles(item.type).text} ${
                            getTypeStyles(item.type).border
                          }`}
                        >
                          {item.type === "education"
                            ? t("about.types.education")
                            : item.type === "work"
                            ? t("about.types.work")
                            : t("about.types.growth")}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-1">
                        {t(item.titleKey)}
                      </h3>
                      <p className="text-sm text-primary font-medium mb-3">
                        {t(item.subtitleKey)}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {t(item.descriptionKey)}
                  </p>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Seção de Contato */}
        <div className="mt-20 border-t border-gray-800 pt-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              {t("about.contact.title")}
            </h3>
            <p className="text-muted-foreground">
              {t("about.contact.subtitle")}
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <a
              href="tel:+5565996209961"
              className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
            >
              <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <span className="font-medium text-sm md:text-base">
                (65) 99620-9961
              </span>
            </a>
            <a
              href="mailto:contato@jvsdev.com.br"
              className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
            >
              <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <span className="font-medium text-sm md:text-base">
                contato@jvsdev.com.br
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
