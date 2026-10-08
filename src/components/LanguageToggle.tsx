"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const next = language === "pt" ? "EN" : "PT";
  const label = language === "pt" ? "EN, Switch to English" : "PT, Mudar para Português";
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      className="language-button"
      onClick={toggleLanguage}
      aria-label={label}
      title={label}
      whileHover={reduceMotion ? undefined : { scale: 1.06, rotate: -3 }}
      whileTap={reduceMotion ? undefined : { scale: 0.9 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={next}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: reduceMotion ? 0.1 : 0.18 }}
        >
          {next}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
