"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

export default function Technologies() {
  const { copy } = useLanguage();
  return (
    <section id="technologies" className="section stack-section" aria-labelledby="stack-title">
      <div className="shell">
        <SectionLabel text={copy.stack.label} />
        <h2 id="stack-title">{copy.stack.title}</h2>
        <div className="module-grid">
          {copy.stack.categories.map((category, index) => (
            <Reveal key={category.module} className={`module-cell ${index === 5 ? "is-accent" : ""}`} delay={(index % 3) * 60} variant="scale">
              <div className="module-meta"><strong>{category.module}</strong><span>{String(index + 1).padStart(2, "0")}/06</span></div>
              <h3>{category.title}</h3>
              <div className="module-items">
                {category.items.map((item) => <span key={item}>{item}</span>)}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
