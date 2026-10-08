"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Reveal from "./Reveal";

export default function About() {
  const { copy } = useLanguage();
  return (
    <section id="about" className="section about-section">
      <div className="shell about-grid">
        <Reveal className="about-heading">
          <h2>{copy.about.title}</h2>
        </Reveal>
        <div className="about-copy">
          <Reveal><p className="lead">{copy.about.lead}</p></Reveal>
          <Reveal delay={70}><p>{copy.about.body}</p></Reveal>
          <div className="pillar-grid">
            {copy.about.pillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 70} className="pillar">
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
