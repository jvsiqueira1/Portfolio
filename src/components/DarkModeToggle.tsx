"use client";

import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DarkModeToggle() {
  const { copy } = useLanguage();
  const [dark, setDark] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === "dark");
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    window.localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <motion.button
      type="button"
      className="icon-button"
      onClick={toggle}
      aria-label={dark ? copy.theme.light : copy.theme.dark}
      title={dark ? copy.theme.light : copy.theme.dark}
      whileHover={reduceMotion ? undefined : { rotate: dark ? -8 : 8, scale: 1.06 }}
      whileTap={reduceMotion ? undefined : { scale: 0.9 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          className="toggle-icon"
          key={dark ? "sun" : "moon"}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, rotate: -55, scale: 0.65 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, rotate: 55, scale: 0.65 }}
          transition={{ duration: reduceMotion ? 0.1 : 0.22 }}
        >
          {dark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
