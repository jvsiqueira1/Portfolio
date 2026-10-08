"use client";

import { Menu, X } from "lucide-react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import DarkModeToggle from "./DarkModeToggle";
import LanguageToggle from "./LanguageToggle";

export default function Header() {
  const { copy } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#top");
  const { scrollY } = useScroll();
  const links = [
    ["#about", copy.nav.about],
    ["#projects", copy.nav.projects],
    ["#experience", copy.nav.experience],
    ["#technologies", copy.nav.stack],
    ["#education", copy.nav.education],
  ];

  useMotionValueEvent(scrollY, "change", (value) => setScrolled(value > 28));

  useEffect(() => {
    const sections = ["top", "about", "projects", "experience", "technologies", "education", "contact"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(`#${visible.target.id}`);
      },
      { rootMargin: "-18% 0px -68%", threshold: [0, 0.2, 0.55] }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-header" data-scrolled={scrolled}>
      <div className="shell nav-shell">
        <a href="#top" className="brand">
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-name">João Vitor</span>
        </a>

        <nav className="desktop-nav" aria-label={copy.nav.mainLabel}>
          {links.map(([href, label]) => (
            <a href={href} key={href} data-active={activeSection === href} aria-current={activeSection === href ? "location" : undefined}>{label}</a>
          ))}
          <a className="nav-contact" href="#contact" data-active={activeSection === "#contact"}>{copy.nav.contact}</a>
        </nav>

        <div className="nav-actions">
          <LanguageToggle />
          <DarkModeToggle />
          <button
            type="button"
            className="icon-button menu-button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? copy.nav.close : copy.nav.menu}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-navigation"
        className="mobile-nav"
        data-open={open}
        aria-label={copy.nav.mobileLabel}
      >
        {links.map(([href, label]) => (
          <a href={href} key={href} onClick={() => setOpen(false)} data-active={activeSection === href}>{label}</a>
        ))}
        <a href="#contact" onClick={() => setOpen(false)}>{copy.nav.contact}</a>
      </nav>
    </header>
  );
}
