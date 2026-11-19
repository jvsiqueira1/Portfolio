"use client";

import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import HeroField from "./HeroField";
import { CvDownloadIcon, MagneticLink, SpinningCounter, VelocityMarquee } from "./motion";

const STACK = ["NODE.JS", "NEST.JS", "REACT", "NEXT.JS", "POSTGRESQL", "FASTIFY", "PRISMA", "DOCKER"];
const NAME_LINES = ["JOÃO", "VITOR"];
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/%&";
// After the entrance the name rests still. A fine pointer entering it plays one 320ms glitch pass
// (globals.css, .glitch-title[data-glitch]), at most one per entry and never within 4s of the last one.
const GLITCH_PASS_MS = 320;
const GLITCH_COOLDOWN_MS = 4000;
const GLITCH_POINTER_QUERY = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

// Scrambles each line into the real name; the server render (and LCP) is the real text.
function useScramble(lines: string[], enabled: boolean) {
  const [output, setOutput] = useState(lines);
  const frameRef = useRef(0);

  useEffect(() => {
    if (!enabled || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOutput(lines);
      return;
    }
    const start = performance.now();
    const duration = 900;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setOutput(lines.map((line) => line.split("").map((char, index) => {
        const settleAt = (index + 1) / (line.length + 1);
        return progress >= settleAt ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }).join("")));
      if (progress < 1) frameRef.current = window.requestAnimationFrame(tick);
    };
    frameRef.current = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameRef.current);
  }, [enabled, lines]);

  return output;
}

// The name's answer to a mouse: one glitch pass per entry, with a 4s gap after the last pass ends.
// Touch and keyboard get nothing (the title is not focusable), and neither does reduced motion.
function useGlitchPass() {
  const nextPassAt = useRef(0);
  const passTimer = useRef(0);

  useEffect(() => () => window.clearTimeout(passTimer.current), []);

  // Bound to the lines (as wide as the letters), not to the full-width title; moving from one line
  // straight to the other is the same entry.
  return (event: ReactPointerEvent<HTMLSpanElement>) => {
    const title = event.currentTarget.closest<HTMLElement>(".glitch-title");
    if (!title || event.pointerType !== "mouse" || !window.matchMedia(GLITCH_POINTER_QUERY).matches) return;
    if (event.relatedTarget instanceof Element && event.relatedTarget.closest(".glitch-line")) return;
    const now = performance.now();
    // The entrance glitch is still settling, or a pass ended less than 4s ago.
    if (now < nextPassAt.current || title.dataset.glitch) return;
    if (title.getAnimations().some((animation) => animation instanceof CSSAnimation && animation.animationName === "glitch-settle")) return;
    nextPassAt.current = now + GLITCH_PASS_MS + GLITCH_COOLDOWN_MS;
    title.dataset.glitch = "pass";
    passTimer.current = window.setTimeout(() => { delete title.dataset.glitch; }, GLITCH_PASS_MS);
  };
}

export default function Hero() {
  const { copy, cvHref } = useLanguage();
  const reduceMotion = useReducedMotion();
  const fullBoot = useMemo(() => copy.hero.boot.join("\n"), [copy.hero.boot]);
  const compactBoot = useMemo(() => copy.hero.bootCompact.join("\n"), [copy.hero.bootCompact]);
  // How many characters are typed; both consoles (desktop and phone, one shown by CSS) type together.
  const [typed, setTyped] = useState(Number.POSITIVE_INFINITY);
  const name = useScramble(NAME_LINES, !reduceMotion);
  const [cvClicks, setCvClicks] = useState(0);
  const playGlitchPass = useGlitchPass();

  useEffect(() => {
    if (reduceMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(Number.POSITIVE_INFINITY);
      return;
    }
    let cursor = 0;
    setTyped(0);
    const timer = window.setInterval(() => {
      cursor += 1;
      setTyped(cursor);
      if (cursor >= fullBoot.length) window.clearInterval(timer);
    }, 40);
    return () => window.clearInterval(timer);
  }, [fullBoot, reduceMotion]);

  return (
    <section id="top" className="hero-section" aria-labelledby="hero-title">
      <HeroField />
      <div className="hero-scanlines" aria-hidden="true" />
      <div className="shell hero-shell">
        <div className="hero-top">
          {[["hero-console-full", fullBoot], ["hero-console-compact", compactBoot]].map(([variant, text]) => (
            <div key={variant} className={`hero-console ${variant}`} aria-hidden="true">
              {text.slice(0, typed).split("\n").map((line, index) => (
                <span key={index}>{line || " "}</span>
              ))}
            </div>
          ))}

          <div className="hero-hud">
            <strong>{copy.hero.availability}</strong>
          </div>
        </div>

        {/* The entrance (transitions.dev texts-reveal: name, then role and tagline) is a CSS animation
            (globals.css): it starts with the first paint, not after hydration. */}
        <div className="hero-main">
          <p className="hero-id" aria-hidden="true">[ 00 ] JOÃO VITOR DE SIQUEIRA CAMPOS</p>
          <h1 id="hero-title" className="glitch-title" aria-label={copy.hero.name}>
            {NAME_LINES.map((line, index) => (
              <span key={line} className="glitch-line" data-text={name[index]} aria-hidden="true" onPointerEnter={playGlitchPass}>
                {name[index]}
              </span>
            ))}
          </h1>
        </div>

        <div className="hero-bottom">
          <div className="hero-pitch">
            {/* What he does, right under the name and before the tagline (the answer to "who is this?"). */}
            <div className="hero-copy">
              <p className="hero-role">{copy.hero.role}</p>
              <p className="hero-headline">{copy.hero.headline}</p>
            </div>
            <div className="hero-actions">
              <MagneticLink className="button button-primary" href={cvHref} download onClick={() => setCvClicks((count) => count + 1)}>
                {copy.hero.cvLabel}
                <CvDownloadIcon clicks={cvClicks} />
              </MagneticLink>
              <MagneticLink className="button button-secondary" href={`mailto:${copy.contact.email}`}>
                <span className="label-long">[ {copy.hero.contactLabel} ]</span>
                <span className="label-short">[ {copy.ui.contactShort} ]</span>
                <ArrowUpRight aria-hidden="true" />
              </MagneticLink>
            </div>
          </div>

          <div className="hero-meta">
            <a className="hero-scroll" href="#about">
              {copy.ui.scroll} <span aria-hidden="true">↓</span>
            </a>
            <dl className="hero-stats" aria-label={copy.ui.statsLabel}>
              {copy.hero.stats.map((stat) => (
                <div key={stat.label}>
                  <dt>{stat.label}</dt>
                  {/* transitions.dev: spinning-counter, once, when the stats come into view. */}
                  <dd><SpinningCounter value={stat.value} /></dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      <VelocityMarquee items={STACK} />
    </section>
  );
}
