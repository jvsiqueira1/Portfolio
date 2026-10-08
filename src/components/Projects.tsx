"use client";

import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import Reveal from "./Reveal";

export default function Projects() {
  const { copy } = useLanguage();
  return (
    <section id="projects" className="section projects-section">
      <div className="shell">
        <Reveal className="section-heading">
          <h2>{copy.projects.title}</h2>
          <p>{copy.projects.intro}</p>
        </Reveal>

        <div className="projects-grid">
          {copy.projects.items.map((project, index) => (
            <Reveal
              key={project.title}
              delay={(index % 2) * 80}
              className={`project-card project-card-${index + 1}`}
            >
              <div className="project-media">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes={index === 0 ? "(max-width: 767px) 100vw, 68vw" : "(max-width: 767px) 100vw, 45vw"}
                  className="project-image"
                />
              </div>
              <div className="project-body">
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
                <div className="tag-list" aria-label="Stack">
                  {project.stack.map((technology) => <span key={technology}>{technology}</span>)}
                </div>
                {project.note && <p className="project-note">{project.note}</p>}
                {project.href ? (
                  <a className="text-link" href={project.href} target="_blank" rel="noreferrer">
                    {copy.projects.visit}<ArrowUpRight aria-hidden="true" />
                  </a>
                ) : (
                  <span className="project-private">
                    {project.linkStatus ?? copy.projects.privateLabel}
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="other-projects">
          <div>
            <h3>{copy.projects.othersTitle}</h3>
            <p>{copy.projects.othersIntro}</p>
          </div>
          <div className="repo-grid">
            {copy.projects.others.map((project) => (
              <a href={project.href} target="_blank" rel="noreferrer" key={project.name}>
                <Github aria-hidden="true" />
                <span>{project.name}</span>
                <small>{project.language}</small>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
