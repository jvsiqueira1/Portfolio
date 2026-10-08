"use client";

import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const { copy, cvHref } = useLanguage();

  return (
    <section id="top" className="hero-section">
      <div className="shell hero-grid">
        <div className="hero-copy">
          <p className="hero-availability">{copy.hero.availability}</p>
          <h1>
            <span>{copy.hero.name}</span>
            {copy.hero.headline}
          </h1>
          <p className="hero-summary">{copy.hero.summary}</p>
          <div className="hero-actions">
            <a className="button button-primary" href={cvHref} download>
              {copy.hero.cvLabel}
              <ArrowDownToLine aria-hidden="true" />
            </a>
            <a className="button button-secondary" href="#contact">
              {copy.hero.contactLabel}
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="portrait-frame">
          <Image
            src="/me-image.jpg"
            alt={copy.hero.portraitAlt}
            fill
            priority
            sizes="(max-width: 767px) 100vw, 42vw"
            className="portrait-image"
          />
          <div className="portrait-card">
            <strong>{copy.hero.role}</strong>
            <span>{copy.hero.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
