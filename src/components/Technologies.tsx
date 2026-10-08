"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Reveal from "./Reveal";

export default function Technologies() {
  const { copy } = useLanguage();
  const marquee = copy.stack.categories.flatMap((category) => category.items).slice(0, 16);

  return (
    <section id="technologies" className="section technologies-section">
      <div className="stack-marquee" aria-hidden="true">
        <div className="stack-track">
          {[...marquee, ...marquee].map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}
        </div>
      </div>
      <div className="shell">
        <Reveal className="section-heading">
          <h2>{copy.stack.title}</h2>
          <p>{copy.stack.intro}</p>
        </Reveal>
        <div className="technology-grid">
          {copy.stack.categories.map((category, index) => (
            <Reveal key={category.title} delay={(index % 3) * 60} className={`technology-group technology-group-${index + 1}`}>
              <h3>{category.title}</h3>
              <div className="technology-list">
                {category.items.map((item) => <span key={item}>{item}</span>)}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
