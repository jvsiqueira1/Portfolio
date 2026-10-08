"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Reveal from "./Reveal";
import { ScrollHeading } from "./motion";

export default function Education() {
  const { copy } = useLanguage();
  return (
    <section id="education" className="section education-section">
      <div className="shell">
        <ScrollHeading title={copy.education.title} description={copy.education.intro} />
        <div className="education-layout">
          <div className="education-list">
            {copy.education.items.map((item, index) => (
              <Reveal key={`${item.course}-${item.period}`} delay={index * 55} className="education-item" variant="slide">
                <div className="education-main">
                  <h3>{item.course}</h3>
                  <p>{item.institution}</p>
                  {item.description && <p className="education-description">{item.description}</p>}
                </div>
                <div className="education-meta">
                  <span>{item.period}</span>
                  <strong>{item.status}</strong>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="languages-card" variant="scale">
            <h3>{copy.education.languagesTitle}</h3>
            {copy.education.languages.map((language) => <p key={language}>{language}</p>)}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
