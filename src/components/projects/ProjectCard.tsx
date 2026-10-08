"use client";

import { ArrowUpRight, LockKeyhole } from "lucide-react";
import Image from "next/image";
import type { CSSProperties, PointerEvent } from "react";
import type { LocalizedProject, projectsSection } from "@/content/projects";

type ProjectCopy = (typeof projectsSection)[keyof typeof projectsSection];

type ProjectCardProps = {
  project: LocalizedProject;
  copy: ProjectCopy;
  featured?: boolean;
  onOpen: (slug: string, trigger: HTMLButtonElement) => void;
};

type TiltStyle = CSSProperties & {
  "--tilt-x"?: string;
  "--tilt-y"?: string;
};

function statusLabel(project: LocalizedProject, copy: ProjectCopy) {
  if (project.linkStatus === "public") return copy.publicLabel;
  if (project.linkStatus === "unavailable") return copy.unavailableLabel;
  return copy.privateLabel;
}

export default function ProjectCard({
  project,
  copy,
  featured = false,
  onOpen,
}: ProjectCardProps) {
  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--tilt-x", `${y * -2.2}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${x * 2.2}deg`);
  };

  const resetTilt = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <article
      className={`portfolio-project-card ${featured ? "is-featured" : "is-archive"}`}
      style={{ "--tilt-x": "0deg", "--tilt-y": "0deg" } as TiltStyle}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      <div className="portfolio-project-media">
        <Image
          src={project.image}
          alt={project.alt}
          fill
          sizes={
            featured
              ? "(max-width: 767px) 100vw, 50vw"
              : "(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 33vw"
          }
          className="portfolio-project-image"
        />
        <div className="portfolio-project-badges">
          <span className={`status-${project.linkStatus}`}>
            {statusLabel(project, copy)}
          </span>
          {project.codePrivate && (
            <span>
              <LockKeyhole aria-hidden="true" />
              {copy.privateCodeLabel}
            </span>
          )}
        </div>
      </div>

      <div className="portfolio-project-body">
        <div className="portfolio-project-meta">
          <span>{copy.filters[project.category]}</span>
          <span>{project.period}</span>
        </div>
        <div className="portfolio-project-copy">
          <div>
            <h4>{project.name}</h4>
            <p className="portfolio-project-context">{project.context}</p>
          </div>
          <p>{project.shortDescription}</p>
        </div>
        <div className="portfolio-project-footer">
          <div className="portfolio-project-stack" aria-label={copy.stackLabel}>
            {project.stack.slice(0, featured ? 5 : 3).map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
          <button
            type="button"
            className="portfolio-project-open"
            aria-label={`${copy.openDetails}: ${project.name}`}
            onClick={(event) => onOpen(project.slug, event.currentTarget)}
          >
            <span>{copy.openDetails}</span>
            <ArrowUpRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
