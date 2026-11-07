"use client";

import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

export default function Education() {
  const { copy } = useLanguage();
  const certificates = copy.education.certificates;
  return (
    <section id="education" className="education-section" aria-labelledby="education-title">
      <div className="section formation-block">
        <div className="shell formation-grid">
          <div className="formation-intro">
            <SectionLabel text={copy.education.label} />
            <h2 id="education-title">{copy.education.title}</h2>
            <p>{copy.education.languages.join(" · ")}</p>
          </div>
          <div className="education-list">
            {copy.education.items.map((item, index) => (
              <Reveal key={`${item.course}-${item.period}`} className="education-item" delay={index * 50} variant="slide">
                <span>{item.period}</span>
                <div><h3>{item.course}</h3><p>{item.institution}</p></div>
                <strong>{item.status}</strong>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="section certificates-block">
        <div className="shell">
          <div className="certificates-heading">
            <div>
              <SectionLabel text={certificates.label} />
              <h2>{certificates.title}</h2>
            </div>
            <p>{certificates.intro}<strong>{copy.ui.certificatesCount}</strong></p>
          </div>
          <div className="certificate-grid">
            {certificates.items.map((certificate, index) => {
              const content = (
                <>
                  <div className="certificate-meta"><span>{certificate.issuer}</span><span>{certificate.date}</span></div>
                  <strong className="certificate-value">{certificate.value}</strong>
                  <h3>{certificate.title}</h3>
                  <span className="certificate-code">{certificate.href ? `[ ${certificates.verify} ↗ ] ` : ""}{certificate.code}</span>
                </>
              );
              return certificate.href ? (
                <a key={certificate.title} className={`certificate-card ${index === 7 ? "is-accent" : ""}`} href={certificate.href} target="_blank" rel="noreferrer" aria-label={`${certificates.verify}: ${certificate.title}, ${certificate.issuer}`}>{content}<ArrowUpRight aria-hidden="true" /></a>
              ) : (
                <article key={certificate.title} className={`certificate-card ${index === 7 ? "is-accent" : ""}`}>{content}</article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
