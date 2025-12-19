"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Briefcase,
  Code,
  GraduationCap,
  Mail,
  Phone,
  Rocket,
} from "lucide-react";
import { Badge } from "./ui/badge";
import {
  Timeline,
  TimelineItem,
  TimelineItemDate,
  TimelineItemDescription,
  TimelineItemTitle,
} from "./ui/timeline";

export default function About() {
  const { t } = useLanguage();
  const isDesktop = useMediaQuery("(min-width: 768px)");

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
    {
      year: "2025",
      type: "education",
      titleKey: "about.roadmap.graduation.title",
      subtitleKey: "about.roadmap.graduation.subtitle",
      descriptionKey: "about.roadmap.graduation.description",
      icon: <GraduationCap className="w-6 h-6" />,
    },
  ];

  const getVariantForType = (type: string) => {
    switch (type) {
      case "education":
        return "secondary";
      case "work":
        return "default";
      case "growth":
        return "secondary";
      default:
        return "default";
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
        <Timeline
          orientation="vertical"
          alternating={isDesktop}
          vertItemSpacing={80}
          vertItemMaxWidth={isDesktop ? 450 : 320}
          className="max-w-5xl mx-auto"
        >
          {roadmap.map((item, index) => (
            <TimelineItem
              key={index}
              variant={
                getVariantForType(item.type) as
                  | "default"
                  | "secondary"
                  | "destructive"
                  | "outline"
              }
            >
              <TimelineItemDate>{item.year}</TimelineItemDate>
              <TimelineItemTitle>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span>{t(item.titleKey)}</span>
                      <Badge
                        variant={
                          item.type === "education"
                            ? "secondary"
                            : item.type === "work"
                            ? "default"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {item.type === "education"
                          ? t("about.types.education")
                          : item.type === "work"
                          ? t("about.types.work")
                          : t("about.types.growth")}
                      </Badge>
                    </div>
                  </div>
                </div>
              </TimelineItemTitle>
              <TimelineItemDescription>
                <p className="text-primary font-medium mb-2">
                  {t(item.subtitleKey)}
                </p>
                <p>{t(item.descriptionKey)}</p>
              </TimelineItemDescription>
            </TimelineItem>
          ))}
        </Timeline>

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
