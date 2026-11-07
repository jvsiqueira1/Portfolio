"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

export default function Experience() {
  const { copy } = useLanguage();
  return (
    <section id="experience" className="section log-section" aria-labelledby="experience-title">
      <div className="shell">
        <div className="log-heading">
          <div>
            <SectionLabel text={copy.experience.label} />
            <h2 id="experience-title">{copy.experience.command}</h2>
          </div>
          <span>{copy.experience.items.length} {copy.ui.commits} · {copy.experience.head}</span>
        </div>

        <div className="career-terminal">
          <div className="terminal-bar" aria-hidden="true">
            <span className="terminal-dots"><i /><i /><i /></span>
            <span>{copy.ui.terminalPath}</span>
            <strong>main</strong>
          </div>
          {copy.experience.items.map((item, index) => (
            <Reveal key={`${item.company}-${item.period}`} className="career-commit" delay={index * 50} variant="slide">
              <div className="commit-meta">
                <strong>{item.period}</strong>
                {index === 0 && <span>■ {copy.ui.running}</span>}
              </div>
              <div>
                <h3>{item.role}</h3>
                <p className="commit-company">@ {item.company}</p>
                <p>{item.summary}</p>
              </div>
              {index === 0 && <strong className="commit-head">HEAD</strong>}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
