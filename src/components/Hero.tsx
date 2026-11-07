"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import HeroField from "./HeroField";
import { MagneticLink, VelocityMarquee } from "./motion";

const STACK = ["NODE.JS", "NEST.JS", "REACT", "NEXT.JS", "POSTGRESQL", "FASTIFY", "PRISMA", "DOCKER"];
const NAME_LINES = ["JOÃO", "VITOR"];
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/%&";

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

export default function Hero() {
  const { copy, cvHref } = useLanguage();
  const reduceMotion = useReducedMotion();
  const fullBoot = useMemo(() => copy.hero.boot.join("\n"), [copy.hero.boot]);
  const [boot, setBoot] = useState(() => fullBoot);
  const name = useScramble(NAME_LINES, !reduceMotion);

  useEffect(() => {
    if (reduceMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setBoot(fullBoot);
      return;
    }
    let cursor = 0;
    setBoot("");
    const timer = window.setInterval(() => {
      cursor += 1;
      setBoot(fullBoot.slice(0, cursor));
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
          <div className="hero-console" aria-hidden="true">
            {boot.split("\n").map((line, index) => (
              <span key={index}>{line || " "}</span>
            ))}
          </div>

          <div className="hero-hud">
            <span aria-hidden="true">LAT -15.601 · LON -56.097</span>
            <span aria-hidden="true">{copy.ui.heroRole}</span>
            <strong>{copy.hero.availability}</strong>
          </div>
        </div>

        <motion.div
          className="hero-main"
          initial={reduceMotion ? false : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="hero-id" aria-hidden="true">[ 00 ] JOÃO VITOR DE SIQUEIRA CAMPOS</p>
          <h1 id="hero-title" className="glitch-title" aria-label={copy.hero.name}>
            {NAME_LINES.map((line, index) => (
              <span key={line} className="glitch-line" data-text={name[index]} aria-hidden="true">
                {name[index]}
              </span>
            ))}
          </h1>
        </motion.div>

        <div className="hero-bottom">
          <div className="hero-pitch">
            <p className="hero-headline">{copy.hero.headline}</p>
            <div className="hero-actions">
              <MagneticLink className="button button-primary" href={cvHref} download>
                {copy.hero.cvLabel}
                <ArrowDown aria-hidden="true" />
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
              <span className="hero-scroll-count" aria-hidden="true">001 / 006</span>
            </a>
            <dl className="hero-stats" aria-label={copy.ui.statsLabel}>
              {copy.hero.stats.map((stat) => (
                <div key={stat.label}>
                  <dt>{stat.label}</dt>
                  <dd>{stat.value}</dd>
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
