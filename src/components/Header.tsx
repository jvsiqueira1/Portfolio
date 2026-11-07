"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "./LanguageToggle";

export default function Header() {
  const { copy } = useLanguage();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#top");
  const [clock, setClock] = useState("--:--:-- AMT");
  const links = useMemo(() => [
    ["#about", copy.nav.about],
    ["#projects", copy.nav.projects],
    ["#experience", copy.nav.experience],
    ["#technologies", copy.nav.stack],
    ["#contact", copy.nav.contact],
  ], [copy.nav]);

  useEffect(() => {
    const updateClock = () => {
      const value = new Intl.DateTimeFormat("pt-BR", {
        timeZone: "America/Cuiaba",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date());
      setClock(`${value} AMT`);
    };
    updateClock();
    const timer = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const sections = ["top", "about", "projects", "experience", "technologies", "contact"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(`#${visible.target.id}`);
    }, { rootMargin: "-20% 0px -68%", threshold: [0, 0.2, 0.55] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-header">
      <div className="shell nav-shell">
        <a href="#top" className="brand" aria-label="JVS//SYS">
          <Image src="/brand/jvs-mark.svg" alt="" width={36} height={36} priority />
          <Image className="brand-wordmark" src="/brand/jvs-wordmark.svg" alt="JVS//SYS" width={138} height={28} priority />
          <span className="brand-version" aria-hidden="true">v26.11</span>
        </a>

        <nav className="desktop-nav" aria-label={copy.nav.mainLabel}>
          {links.map(([href, label], index) => (
            <a href={href} key={href} data-active={activeSection === href} aria-current={activeSection === href ? "location" : undefined}>
              <span>{String(index + 1).padStart(2, "0")}</span>{label}
            </a>
          ))}
        </nav>

        <div className="nav-meta" role="group" aria-label={copy.ui.statusLabel}>
          <span>CUIABÁ · <time suppressHydrationWarning>{clock}</time></span>
          <strong>■ ONLINE</strong>
        </div>

        <div className="nav-actions">
          <LanguageToggle />
          <button
            type="button"
            className="icon-button menu-button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? copy.nav.close : copy.nav.menu}
          >
            {open ? <X aria-hidden="true" /> : <><span>MENU</span><Menu aria-hidden="true" /></>}
          </button>
        </div>
      </div>

      <nav id="mobile-navigation" className="mobile-nav" data-open={open} aria-label={copy.nav.mobileLabel}>
        {links.map(([href, label], index) => (
          <a href={href} key={href} onClick={() => setOpen(false)} data-active={activeSection === href}>
            <span>{String(index + 1).padStart(2, "0")}</span>{label}
          </a>
        ))}
      </nav>
    </header>
  );
}
