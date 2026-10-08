"use client";

import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { useRef, type PointerEvent } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { MagneticLink } from "./motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const { copy, cvHref } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(-520);
  const pointerY = useMotionValue(-520);
  const glowX = useSpring(pointerX, { stiffness: 95, damping: 24 });
  const glowY = useSpring(pointerY, { stiffness: 95, damping: 24 });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 74]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -28]);
  const words = copy.hero.headline.split(" ");

  function trackGlow(event: PointerEvent<HTMLElement>) {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(event.clientX - bounds.left - 260);
    pointerY.set(event.clientY - bounds.top - 260);
  }

  const wordContainer = {
    hidden: {},
    visible: { transition: { delayChildren: 0.22, staggerChildren: 0.055 } },
  };
  const word = {
    hidden: { y: "112%", filter: "blur(9px)" },
    visible: { y: "0%", filter: "blur(0px)", transition: { duration: 0.74, ease: EASE } },
  };

  return (
    <section id="top" className="hero-section" ref={sectionRef} onPointerMove={trackGlow}>
      <motion.div className="hero-glow" aria-hidden="true" style={{ x: glowX, y: glowY }} />
      <div className="shell hero-grid">
        <motion.div className="hero-copy" style={reduceMotion ? undefined : { y: copyY }}>
          <motion.p
            className="hero-availability"
            initial={reduceMotion ? false : { opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08, duration: 0.55 }}
          >
            <span aria-hidden="true" />{copy.hero.availability}
          </motion.p>
          <motion.h1
            aria-label={`${copy.hero.name}. ${copy.hero.headline}`}
            variants={wordContainer}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
          >
            <motion.span className="hero-name" aria-hidden="true" variants={word}>{copy.hero.name}</motion.span>
            <span className="hero-headline" aria-hidden="true">
              {words.map((label, index) => (
                <span className="hero-word" key={`${label}-${index}`}>
                  <motion.span variants={word}>{label}</motion.span>
                </span>
              ))}
            </span>
          </motion.h1>
          <motion.p
            className="hero-summary"
            initial={reduceMotion ? false : { opacity: 0, y: 20, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.62, duration: 0.65 }}
          >
            {copy.hero.summary}
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.78, duration: 0.55 }}
          >
            <MagneticLink className="button button-primary" href={cvHref} download>
              {copy.hero.cvLabel}
              <ArrowDownToLine aria-hidden="true" />
            </MagneticLink>
            <MagneticLink className="button button-secondary" href="#contact">
              {copy.hero.contactLabel}
              <ArrowUpRight aria-hidden="true" />
            </MagneticLink>
          </motion.div>
        </motion.div>

        <motion.div
          className="portrait-frame"
          style={reduceMotion ? undefined : { y: portraitY }}
          initial={reduceMotion ? false : { opacity: 0, scale: 1.08, clipPath: "inset(18% 0 82% 0 round 16px)" }}
          animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0 0% 0 round 16px)" }}
          transition={{ delay: 0.2, duration: 0.95, ease: EASE }}
        >
          <Image
            src="/me-image.jpg"
            alt={copy.hero.portraitAlt}
            fill
            priority
            sizes="(max-width: 767px) 100vw, 42vw"
            className="portrait-image"
          />
          <div className="portrait-card">
            <strong>{copy.hero.role}</strong>
            <span>{copy.hero.location}</span>
          </div>
          <span className="portrait-orbit" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}
