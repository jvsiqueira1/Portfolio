"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

export default function About() {
  const { copy } = useLanguage();
  return (
    <section id="about" className="section about-section" aria-labelledby="about-title">
      <div className="shell about-grid">
        <Reveal className="about-portrait" variant="scale">
          <figure className="reticle-figure">
            <div className="reticle-frame">
              <Image src="/effects/portrait-halftone.png" alt={copy.hero.portraitAlt} fill sizes="(max-width: 900px) 100vw, 42vw" />
              <Image className="hud-ring" src="/effects/hud-ring.png" alt="" fill sizes="(max-width: 900px) 100vw, 42vw" aria-hidden="true" />
              <span className="reticle-corner reticle-corner-start" aria-hidden="true" />
              <span className="reticle-corner reticle-corner-end" aria-hidden="true" />
            </div>
            <figcaption><span aria-hidden="true">■</span> {copy.ui.subject}</figcaption>
          </figure>
        </Reveal>

        <div className="about-copy">
          <SectionLabel text={copy.about.label} />
          <Reveal variant="mask"><h2 id="about-title">{copy.about.title}</h2></Reveal>
          <Reveal delay={70}><p className="lead">{copy.about.body}</p></Reveal>
          <div className="pillar-list">
            {copy.about.pillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 70} className="pillar-row" variant="slide">
                <span>P.{String(index + 1).padStart(2, "0")}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
