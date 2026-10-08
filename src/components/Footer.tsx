"use client";

import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { copy } = useLanguage();
  return (
    <footer id="contact" className="site-footer">
      <div className="shell footer-main">
        <div>
          <h2>{copy.contact.title}</h2>
          <p>{copy.contact.text}</p>
        </div>
        <div className="contact-links">
          <a href="mailto:contato@jvsdev.com.br"><Mail aria-hidden="true" />{copy.contact.emailLabel}<ArrowUpRight aria-hidden="true" /></a>
          <a href="https://www.linkedin.com/in/joaovitorsiqueira1/" target="_blank" rel="noreferrer"><Linkedin aria-hidden="true" />{copy.contact.linkedinLabel}<ArrowUpRight aria-hidden="true" /></a>
          <a href="https://github.com/jvsiqueira1" target="_blank" rel="noreferrer"><Github aria-hidden="true" />{copy.contact.githubLabel}<ArrowUpRight aria-hidden="true" /></a>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>{copy.footer}</span>
        <span>{copy.contact.location}</span>
      </div>
    </footer>
  );
}
