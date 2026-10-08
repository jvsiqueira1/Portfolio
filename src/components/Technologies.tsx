"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Reveal from "./Reveal";
import { ScrollHeading, VelocityMarquee } from "./motion";

export default function Technologies() {
  const { copy } = useLanguage();
  const marquee = copy.stack.categories.flatMap((category) => category.items).slice(0, 16);

  return (
    <section id="technologies" className="section technologies-section">
      <VelocityMarquee items={marquee} />
      <div className="shell">
        <ScrollHeading title={copy.stack.title} description={copy.stack.intro} />
        <div className="technology-grid">
          {copy.stack.categories.map((category, index) => (
            <Reveal key={category.title} delay={(index % 3) * 75} variant={index % 2 ? "slide" : "scale"} className={`technology-group technology-group-${index + 1}`}>
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
