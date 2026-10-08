"use client";

import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { copy } = useLanguage();
  const reduceMotion = useReducedMotion();
  return (
    <footer id="contact" className="site-footer">
      <div className="shell footer-main">
        <div>
          <motion.h2
            initial={reduceMotion ? false : { opacity: 0, y: 46, clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true, amount: 0.55 }}
          >{copy.contact.title}</motion.h2>
          <motion.p initial={reduceMotion ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>{copy.contact.text}</motion.p>
        </div>
        <div className="contact-links">
          <motion.a whileHover={reduceMotion ? undefined : { x: 8 }} href="mailto:contato@jvsdev.com.br"><Mail aria-hidden="true" />{copy.contact.emailLabel}<ArrowUpRight aria-hidden="true" /></motion.a>
          <motion.a whileHover={reduceMotion ? undefined : { x: 8 }} href="https://www.linkedin.com/in/joaovitorsiqueira1/" target="_blank" rel="noreferrer"><Linkedin aria-hidden="true" />{copy.contact.linkedinLabel}<ArrowUpRight aria-hidden="true" /></motion.a>
          <motion.a whileHover={reduceMotion ? undefined : { x: 8 }} href="https://github.com/jvsiqueira1" target="_blank" rel="noreferrer"><Github aria-hidden="true" />{copy.contact.githubLabel}<ArrowUpRight aria-hidden="true" /></motion.a>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>{copy.footer}</span>
        <span>{copy.contact.location}</span>
      </div>
    </footer>
  );
}
