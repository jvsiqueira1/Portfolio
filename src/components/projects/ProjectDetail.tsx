"use client";

import { ArrowUpRight, LockKeyhole, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import type { LocalizedProject, projectsSection } from "@/content/projects";

type ProjectCopy = (typeof projectsSection)[keyof typeof projectsSection];

type ProjectDetailProps = {
  project: LocalizedProject;
  copy: ProjectCopy;
  onClose: () => void;
};

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function statusLabel(project: LocalizedProject, copy: ProjectCopy) {
  if (project.linkStatus === "public") return copy.publicLabel;
  if (project.linkStatus === "unavailable") return copy.unavailableLabel;
  return copy.privateLabel;
}

export default function ProjectDetail({ project, copy, onClose }: ProjectDetailProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const panel = panelRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel?.querySelector<HTMLElement>(focusableSelector)?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panel) return;
      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(focusableSelector)
      ).filter((element) => !element.hasAttribute("disabled"));
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, project.slug]);

  return createPortal(
    <div className="project-detail-layer" onMouseDown={onClose}>
      <div
        ref={panelRef}
        className="project-detail-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="project-detail-close"
          onClick={onClose}
          aria-label={copy.closeDetails}
        >
          <X aria-hidden="true" />
        </button>

        <div className="project-detail-media">
          <Image
            src={project.image}
            alt={project.alt}
            fill
            sizes="(max-width: 767px) 100vw, 56vw"
            className="portfolio-project-image"
            priority
          />
        </div>

        <div className="project-detail-content">
          <div className="project-detail-title-row">
            <div>
              <p>{project.context}</p>
              <h3 id={titleId}>{project.name}</h3>
            </div>
            <div className="project-detail-status">
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

          <p id={descriptionId} className="project-detail-description">
            {project.longDescription}
          </p>

          <dl className="project-detail-facts">
            <div>
              <dt>{copy.categoryLabel}</dt>
              <dd>{copy.filters[project.category]}</dd>
            </div>
            <div>
              <dt>{copy.roleLabel}</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>{copy.periodLabel}</dt>
              <dd>{project.period}</dd>
            </div>
          </dl>

          <div className="project-detail-section">
            <h4>{copy.highlightsLabel}</h4>
            <ul>
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>

          <div className="project-detail-section">
            <h4>{copy.stackLabel}</h4>
            <div className="portfolio-project-stack">
              {project.stack.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
          </div>

          {project.url && project.linkStatus === "public" ? (
            <a
              className="project-detail-link"
              href={project.url}
              target="_blank"
              rel="noreferrer"
            >
              {copy.visit}
              <ArrowUpRight aria-hidden="true" />
            </a>
          ) : (
            <p className="project-detail-unavailable">
              {statusLabel(project, copy)}
            </p>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
