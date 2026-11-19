"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CvDownloadIcon } from "./motion";
import SectionLabel from "./SectionLabel";

export default function Footer() {
  const { copy, cvHref } = useLanguage();
  const [cvClicks, setCvClicks] = useState(0);
  return (
    <footer id="contact" className="site-footer">
      <div className="shell footer-main">
        <SectionLabel text={copy.contact.label} />
        <h2>{copy.contact.title}<span className="block-cursor" aria-hidden="true" /></h2>
        <div className="footer-contact-row">
          <div className="footer-email-block">
            <p>{copy.ui.writeTo}</p>
            <a className="footer-email" href={`mailto:${copy.contact.email}`}>{copy.contact.email}<ArrowUpRight aria-hidden="true" /></a>
          </div>
          <div className="footer-links">
            <a href="https://www.linkedin.com/in/joaovitorsiqueira1/" target="_blank" rel="noreferrer">[ {copy.contact.linkedinLabel} ↗ ]</a>
            <a href="https://github.com/jvsiqueira1" target="_blank" rel="noreferrer">[ {copy.contact.githubLabel} ↗ ]</a>
            {/* transitions.dev: spinner-check-morph confirms the click (CvDownloadIcon). */}
            <a className="button button-primary" href={cvHref} download onClick={() => setCvClicks((count) => count + 1)}>{copy.hero.cvLabel}<CvDownloadIcon clicks={cvClicks} /></a>
          </div>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© 2026 JVS DEVELOPMENT</span>
        <span>{copy.ui.build}</span>
        <a href="#top">↑ {copy.contact.backToTop}</a>
      </div>
    </footer>
  );
}
