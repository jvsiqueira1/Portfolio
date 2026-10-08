"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageTransition({ children }: { children: ReactNode }) {
  const { language } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={language}
        className="language-transition"
        initial={reduceMotion ? { opacity: 0.82 } : { opacity: 0, y: 10, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={reduceMotion ? { opacity: 0.82 } : { opacity: 0, y: -8, filter: "blur(4px)" }}
        transition={{ duration: reduceMotion ? 0.12 : 0.34 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
