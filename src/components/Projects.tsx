"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type FocusEvent, type PointerEvent } from "react";
import { createPortal } from "react-dom";
import {
  localizeProject,
  projects,
  projectsSection,
  projectStatus,
  type ProjectCategory,
} from "@/content/projects";
import { useLanguage } from "@/contexts/LanguageContext";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import ProjectDetail from "./projects/ProjectDetail";

type Filter = "all" | ProjectCategory;

const categoryOrder: Filter[] = ["all", "imobiliario", "saas", "pessoal", "landing", "publico"];

const pad = (value: number) => String(value).padStart(3, "0");

// The global focus ring reaches 6px past the chip (2px outline + 4px offset); keep 2px of air beyond it.
const FOCUS_RING_EXTENT = 8;

// On narrow screens the filters are a strip that scrolls sideways. Browsers skip the focus scroll for a
// chip that is only partly visible, so its focus ring would sit under the strip's clipped edge.
// The vertical scroll only looks at the chip's box, so a chip stopped at the viewport edge loses the
// ring's outer band: nudge the page until the whole ring is inside, below the sticky header.
const revealFocusedFilter = (event: FocusEvent<HTMLDivElement>) => {
  const chip = event.target;
  if (!(chip instanceof HTMLElement) || chip === event.currentTarget) return;
  chip.scrollIntoView({ block: "nearest", inline: "nearest" });
  const { top, bottom } = chip.getBoundingClientRect();
  const headerBottom = document.querySelector(".site-header")?.getBoundingClientRect().bottom ?? 0;
  const overflowBelow = bottom + FOCUS_RING_EXTENT - window.innerHeight;
  const overflowAbove = headerBottom - (top - FOCUS_RING_EXTENT);
  if (overflowBelow > 0) window.scrollBy({ top: Math.ceil(overflowBelow), behavior: "instant" });
  else if (overflowAbove > 0) window.scrollBy({ top: -Math.ceil(overflowAbove), behavior: "instant" });
};

export default function Projects() {
  const { language } = useLanguage();
  const copy = projectsSection[language];
  const [filter, setFilter] = useState<Filter>("all");
  const [showArchive, setShowArchive] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // The preview is portaled to <body>: an ancestor transform would otherwise trap position: fixed.
  useEffect(() => setMounted(true), []);

  const localizedProjects = useMemo(() => projects.map((project) => localizeProject(project, language)), [language]);
  const numberOf = (slug: string) => pad(localizedProjects.findIndex((project) => project.slug === slug) + 1);
  const featuredProjects = localizedProjects.filter((project) => project.featured);
  // "All": featured systems sit above the index and the archive waits behind "view all".
  // A category: the featured block steps aside and the index lists every match, featured included.
  const indexProjects = filter === "all"
    ? localizedProjects.filter((project) => !project.featured && (showArchive || !project.archive))
    : localizedProjects.filter((project) => project.category === filter);
  const categoryCount = (category: Filter) => category === "all"
    ? localizedProjects.length
    : localizedProjects.filter((project) => project.category === category).length;
  const archiveCount = localizedProjects.filter((project) => project.archive).length;
  const selectedProject = localizedProjects.find((project) => project.slug === selectedSlug);
  const hoveredProject = localizedProjects.find((project) => project.slug === hoveredSlug);

  const openProject = (slug: string, trigger: HTMLButtonElement) => {
    openerRef.current = trigger;
    setSelectedSlug(slug);
  };

  const closeProject = () => {
    setSelectedSlug(null);
    window.requestAnimationFrame(() => openerRef.current?.focus());
  };

  // Follows the pointer and flips left/up when the preview would leave the viewport.
  const movePreview = (event: PointerEvent<HTMLButtonElement>) => {
    const preview = previewRef.current;
    if (!preview || event.pointerType !== "mouse") return;
    const gap = 28;
    const margin = 12;
    const width = preview.offsetWidth;
    const height = preview.offsetHeight;
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;
    let x = event.clientX + gap;
    if (x + width > viewportWidth - margin) x = event.clientX - gap - width;
    let y = event.clientY - 110;
    if (y + height > viewportHeight - margin) y = event.clientY - gap - height;
    x = Math.min(Math.max(margin, x), Math.max(margin, viewportWidth - width - margin));
    y = Math.min(Math.max(margin, y), Math.max(margin, viewportHeight - height - margin));
    preview.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
  };

  return (
    <section id="projects" className="section systems-section" aria-labelledby="projects-title">
      <div className="shell">
        <div className="systems-heading">
          <div>
            <SectionLabel text={copy.sectionLabel} />
            <Reveal variant="mask"><h2 id="projects-title">{copy.heading}</h2></Reveal>
          </div>
          <div className="systems-copy">
            <p>{copy.intro}</p>
            <div className="project-filters" role="group" aria-label={copy.filterLabel} onFocus={revealFocusedFilter}>
              {categoryOrder.map((category) => (
                <button key={category} type="button" aria-pressed={filter === category} onClick={() => setFilter(category)}>
                  {copy.filters[category]} <span className="filter-count">{categoryCount(category)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {filter === "all" && <div className="featured-systems">
          {featuredProjects.map((project) => (
            <Reveal key={project.slug} className="featured-system">
              <div className="featured-system-copy">
                <div className="system-meta">
                  <span>{numberOf(project.slug)}</span>
                  <span>{project.period}</span>
                  <strong data-status={project.linkStatus}>■ {projectStatus(project, copy)}</strong>
                </div>
                <h3>{project.name}</h3>
                <p className="system-context">{project.context}</p>
                <p>{project.shortDescription}</p>
                <div className="system-tags">
                  {project.stack.slice(0, 5).map((technology) => <span key={technology}>{technology}</span>)}
                </div>
                <button type="button" className="system-open" onClick={(event) => openProject(project.slug, event.currentTarget)}>
                  [ {copy.openDetails} ] <ArrowUpRight aria-hidden="true" />
                </button>
              </div>
              <button
                type="button"
                className="featured-system-media"
                data-kind={project.image.endsWith(".webp") ? "capture" : "generated"}
                onClick={(event) => openProject(project.slug, event.currentTarget)}
                aria-label={`${copy.openDetails}: ${project.name}`}
              >
                <Image src={project.image} alt={project.alt} fill sizes="(max-width: 900px) 100vw, 56vw" />
                <span className="media-shade" aria-hidden="true" />
                <span className="rec-label" aria-hidden="true">REC ● {numberOf(project.slug)}</span>
                <span className="media-data" aria-hidden="true">1600×1000 · {copy.syntheticData}</span>
                <span className="media-corner media-corner-start" aria-hidden="true" />
                <span className="media-corner media-corner-end" aria-hidden="true" />
              </button>
            </Reveal>
          ))}
        </div>}

        <div className="systems-index" data-filtered={filter !== "all"}>
          <div className="index-heading">
            <h3>{copy.indexTitle}</h3>
            <span aria-live="polite">[ {String(indexProjects.length).padStart(2, "0")} {copy.systemsUnit} ]</span>
          </div>
          <div className="index-table">
            <div className="index-table-head" aria-hidden="true">
              <span>{copy.columns.number}</span>
              <span>{copy.columns.project}</span>
              <span>{copy.columns.context}</span>
              <span>{copy.columns.stack}</span>
              <span>{copy.columns.year}</span>
              <span>{copy.columns.status}</span>
            </div>
            {indexProjects.length === 0 && <p className="index-empty">{copy.emptyCategory}</p>}
            <ul className="index-list">
              {indexProjects.map((project) => (
                <li key={project.slug}>
                  <button
                    type="button"
                    className="index-row"
                    onPointerEnter={(event) => { setHoveredSlug(project.slug); movePreview(event); }}
                    onPointerMove={movePreview}
                    onPointerLeave={() => setHoveredSlug(null)}
                    onClick={(event) => openProject(project.slug, event.currentTarget)}
                    aria-label={`${project.name}, ${projectStatus(project, copy)}. ${copy.openDetails}`}
                  >
                    <span className="index-number">{numberOf(project.slug)}</span>
                    <strong>{project.name}</strong>
                    <span className="index-context">{project.shortDescription}</span>
                    <span className="index-stack">{project.stack.slice(0, 2).join(" · ")}</span>
                    <span className="index-year">{project.period.slice(-4)}</span>
                    <span className="index-status" data-status={project.linkStatus}>
                      {projectStatus(project, copy)} <span aria-hidden="true">↗</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {filter === "all" && archiveCount > 0 && (
            <button type="button" className="index-toggle" aria-expanded={showArchive} onClick={() => setShowArchive((value) => !value)}>
              [ {showArchive ? copy.viewFewer : `${copy.viewAll} +${archiveCount}`} <span aria-hidden="true">{showArchive ? "↑" : "↓"}</span> ]
            </button>
          )}
        </div>
      </div>

      {mounted && createPortal(
        <div ref={previewRef} className="index-preview" data-visible={Boolean(hoveredProject)} data-kind={hoveredProject?.image.endsWith(".webp") ? "capture" : "generated"} aria-hidden="true">
          {hoveredProject && <Image src={hoveredProject.image} alt="" fill sizes="340px" />}
          <span className="media-shade" />
        </div>,
        document.body
      )}

      {selectedProject && <ProjectDetail project={selectedProject} copy={copy} onClose={closeProject} />}
    </section>
  );
}
