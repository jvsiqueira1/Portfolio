"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Reveal from "./Reveal";
import { ScrollHeading } from "./motion";

export default function About() {
  const { copy } = useLanguage();
  return (
    <section id="about" className="section about-section">
      <div className="shell about-grid">
        <ScrollHeading className="about-heading" title={copy.about.title} />
        <div className="about-copy">
          <Reveal variant="mask"><p className="lead">{copy.about.lead}</p></Reveal>
          <Reveal delay={70} variant="slide"><p>{copy.about.body}</p></Reveal>
          <div className="pillar-grid">
            {copy.about.pillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 90} className="pillar" variant="scale">
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
