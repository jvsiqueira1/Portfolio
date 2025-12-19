"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { Card } from "./ui/card";

export default function Experience() {
  const { t, language } = useLanguage();

  const experiences = [
    {
      id: 1,
      title: "Desenvolvedor Full Stack",
      company: "Grupo Optimus",
      locationKey: "experience.location.brazil",
      period: { pt: "Set. de 2025 - Presente", en: "Sep. 2025 - Present" },
      descriptionKey: "experience.optimus.description",
      technologies: [
        "Java",
        "Spring Boot",
        "React.js",
        "Python",
        "Web Scraping",
      ],
    },
    {
      id: 2,
      title: "Desenvolvedor Full Stack",
      company: "Agilizei",
      locationKey: "experience.location.brazil",
      period: {
        pt: "Mar. de 2025 - Jun. de 2025",
        en: "Mar. 2025 - Jun. 2025",
      },
      descriptionKey: "experience.agilizei.description",
      technologies: [
        "React",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Prisma ORM",
        "Git",
        "APIs RESTful",
      ],
    },
    {
      id: 3,
      title: "Desenvolvedor Front End",
      company: "Central IT",
      locationKey: "experience.location.brazil",
      period: {
        pt: "Out. de 2023 - Dez. de 2024",
        en: "Oct. 2023 - Dec. 2024",
      },
      descriptionKey: "experience.centralit.description",
      technologies: [
        "React.js",
        "Tailwind CSS",
        "APIs RESTful",
        "Git",
        "GitLab",
        "Scrum",
      ],
    },
    {
      id: 4,
      title: "Estagiário de Suporte",
      company: "Detran MT",
      location: { pt: "Cuiabá - MT", en: "Cuiabá - MT" },
      period: {
        pt: "Set. de 2021 - Set. de 2023",
        en: "Sep. 2021 - Sep. 2023",
      },
      descriptionKey: "experience.detran.description",
      technologies: [
        "Suporte Técnico",
        "Redes",
        "Manutenção de Hardware",
        "Sistemas Internos",
      ],
    },
  ];

  return (
    <section id="experience" className="py-24 bg-card">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Briefcase className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t("experience.title")}
            </h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("experience.subtitle")}
          </p>
        </div>
        <div className="space-y-6">
          {experiences.map((experience) => (
            <Card
              key={experience.id}
              className="bg-background p-6 md:p-8 border border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/30"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-4">
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                    {experience.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <Briefcase className="w-4 h-4" />
                      {experience.company}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {experience.locationKey
                        ? t(experience.locationKey)
                        : typeof experience.location === "object"
                        ? experience.location[language]
                        : experience.location}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {typeof experience.period === "object"
                        ? experience.period[language]
                        : experience.period}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
                {t(experience.descriptionKey)}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {experience.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs md:text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
