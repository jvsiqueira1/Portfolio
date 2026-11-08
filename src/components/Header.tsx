"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { sectionAtReadingLine } from "@/lib/sections";
import LanguageToggle from "./LanguageToggle";

// The sections the menu links to (Education has no menu entry, so its stretch keeps Technologies lit).
const SECTION_IDS = ["top", "about", "projects", "experience", "technologies", "contact"];

export default function Header() {
  const { copy } = useLanguage();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#top");
  const [clock, setClock] = useState("--:--:-- AMT");
  const lockRef = useRef<{ href: string; settled: boolean } | null>(null);
  const settleRef = useRef<(() => void) | null>(null);
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

  // Active section = the one at the reading line (sectionAtReadingLine: 35% of the viewport, the page
  // end means the last one). After a menu click the target stays active through the smooth scroll and until the next scroll
  // that follows it: a section near the page end may stop below the line and still be the destination.
  useEffect(() => {
    let frame = 0;
    let settleTimer = 0;

    const compute = () => {
      frame = 0;
      if (lockRef.current) return;
      setActiveSection(`#${sectionAtReadingLine(SECTION_IDS)}`);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(compute);
    };
    const settle = () => {
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        if (lockRef.current) lockRef.current.settled = true;
      }, 180);
    };
    const handleScroll = () => {
      const lock = lockRef.current;
      if (lock && !lock.settled) settle();
      else {
        lockRef.current = null;
        schedule();
      }
    };

    settleRef.current = settle;
    schedule();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(settleTimer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", schedule);
      settleRef.current = null;
    };
  }, []);

  const selectSection = (href: string) => {
    lockRef.current = { href, settled: false };
    setActiveSection(href);
    settleRef.current?.();
  };

  return (
    <header className="site-header">
      <div className="shell nav-shell">
        <a href="#top" className="brand" onClick={() => selectSection("#top")}>
          <Image src="/brand/jvs-mark.svg" alt="" width={36} height={36} />
          <Image className="brand-wordmark" src="/brand/jvs-wordmark.svg" alt="JVS//SYS" width={138} height={28} />
          <span className="brand-version" aria-hidden="true">v26.11</span>
        </a>

        <nav className="desktop-nav" aria-label={copy.nav.mainLabel}>
          {links.map(([href, label], index) => (
            <a href={href} key={href} onClick={() => selectSection(href)} data-active={activeSection === href} aria-current={activeSection === href ? "location" : undefined}>
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

      <nav id="mobile-navigation" className="mobile-nav" data-open={open} aria-label={copy.nav.mobileLabel} data-lenis-prevent>
        {links.map(([href, label], index) => (
          <a href={href} key={href} onClick={() => { selectSection(href); setOpen(false); }} data-active={activeSection === href} aria-current={activeSection === href ? "location" : undefined}>
            <span>{String(index + 1).padStart(2, "0")}</span>{label}
          </a>
        ))}
      </nav>
    </header>
  );
}
