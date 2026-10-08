"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import DarkModeToggle from "./DarkModeToggle";
import LanguageToggle from "./LanguageToggle";

export default function Header() {
  const { copy } = useLanguage();
  const [open, setOpen] = useState(false);
  const links = [
    ["#about", copy.nav.about],
    ["#projects", copy.nav.projects],
    ["#experience", copy.nav.experience],
    ["#technologies", copy.nav.stack],
    ["#education", copy.nav.education],
  ];

  return (
    <header className="site-header">
      <div className="shell nav-shell">
        <a href="#top" className="brand">
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-name">João Vitor</span>
        </a>

        <nav className="desktop-nav" aria-label={copy.nav.mainLabel}>
          {links.map(([href, label]) => (
            <a href={href} key={href}>{label}</a>
          ))}
          <a className="nav-contact" href="#contact">{copy.nav.contact}</a>
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
          <a href={href} key={href} onClick={() => setOpen(false)}>{label}</a>
        ))}
        <a href="#contact" onClick={() => setOpen(false)}>{copy.nav.contact}</a>
      </nav>
    </header>
  );
}
