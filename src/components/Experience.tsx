"use client";

import { motion, useReducedMotion, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Experience() {
  const { copy } = useLanguage();
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 62%", "end 72%"] });

  useEffect(() => {
    const items = listRef.current?.querySelectorAll<HTMLElement>("[data-experience]");
    if (!items?.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(Number((visible.target as HTMLElement).dataset.experience));
      },
      { rootMargin: "-24% 0px -55%", threshold: [0.15, 0.45, 0.75] }
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [copy.experience.items]);

  return (
    <section id="experience" className="section experience-section" ref={sectionRef}>
      <div className="shell experience-grid">
        <div className="experience-intro">
          <h2>{copy.experience.title}</h2>
          <p>{copy.experience.intro}</p>
          <div className="route-progress" aria-hidden="true">
            <motion.span style={{ scaleY: reduceMotion ? (active + 1) / copy.experience.items.length : scrollYProgress }} />
          </div>
        </div>

        <div className="experience-list" ref={listRef}>
          {copy.experience.items.map((item, index) => (
            <motion.article
              className="experience-item"
              data-active={active === index}
              data-experience={index}
              key={`${item.company}-${item.period}`}
              initial={reduceMotion ? false : { opacity: 0.32, x: 44, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.28 }}
              transition={{ duration: 0.68, delay: Math.min(index * 0.035, 0.14) }}
            >
              <div className="experience-meta">
                <span>{item.period}</span>
                <span>{item.location}</span>
              </div>
              <h3>{item.role}</h3>
              <p className="experience-company">{item.company}</p>
              <p className="experience-summary">{item.summary}</p>
              <ul>
                {item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
              </ul>
              <div className="tag-list" aria-label="Stack">
                {item.stack.map((technology) => <span key={technology}>{technology}</span>)}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
