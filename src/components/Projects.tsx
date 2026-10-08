"use client";

import { useMemo, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  localizeProject,
  projects,
  projectsSection,
  type ProjectCategory,
} from "@/content/projects";
import Reveal from "./Reveal";
import ProjectCard from "./projects/ProjectCard";
import ProjectDetail from "./projects/ProjectDetail";
import "./projects/projects.css";

type Filter = "all" | ProjectCategory;

const categoryOrder: Filter[] = [
  "all",
  "imobiliario",
  "saas",
  "pessoal",
  "landing",
  "publico",
];

export default function Projects() {
  const { language } = useLanguage();
  const copy = projectsSection[language];
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  const localizedProjects = useMemo(
    () => projects.map((project) => localizeProject(project, language)),
    [language]
  );
  const featuredProjects = localizedProjects.filter((project) => project.featured);
  const archiveProjects = localizedProjects.filter(
    (project) =>
      !project.featured && (filter === "all" || project.category === filter)
  );
  const selectedProject = localizedProjects.find(
    (project) => project.slug === selectedSlug
  );

  const openProject = (slug: string, trigger: HTMLButtonElement) => {
    openerRef.current = trigger;
    setSelectedSlug(slug);
  };

  const closeProject = () => {
    setSelectedSlug(null);
    window.requestAnimationFrame(() => openerRef.current?.focus());
  };

  return (
    <section id="projects" className="section portfolio-projects-section">
      <div className="shell portfolio-projects-shell">
        <Reveal className="portfolio-projects-heading">
          <h2>{copy.title}</h2>
          <p>{copy.intro}</p>
        </Reveal>

        <div className="featured-projects-block">
          <div className="projects-subhead">
            <h3>{copy.featuredTitle}</h3>
            <span aria-hidden="true">{String(featuredProjects.length).padStart(2, "0")}</span>
          </div>
          <div className="featured-projects-grid">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.slug} delay={(index % 2) * 70}>
                <ProjectCard
                  project={project}
                  copy={copy}
                  featured
                  onOpen={openProject}
                />
              </Reveal>
            ))}
          </div>
        </div>

        <div className="projects-archive">
          <div className="projects-archive-heading">
            <div>
              <h3>{copy.allTitle}</h3>
              <p>{copy.allIntro}</p>
            </div>
            <span className="projects-count" aria-live="polite">
              {String(archiveProjects.length).padStart(2, "0")}
            </span>
          </div>

          <div className="project-filters" aria-label={copy.filterLabel}>
            {categoryOrder.map((category) => (
              <button
                key={category}
                type="button"
                className={filter === category ? "is-active" : undefined}
                aria-pressed={filter === category}
                onClick={() => setFilter(category)}
              >
                {copy.filters[category]}
              </button>
            ))}
          </div>

          <div className="projects-archive-grid">
            {archiveProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                copy={copy}
                onOpen={openProject}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          copy={copy}
          onClose={closeProject}
        />
      )}
    </section>
  );
}
