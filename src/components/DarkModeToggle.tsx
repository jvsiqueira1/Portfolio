"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DarkModeToggle() {
  const { copy } = useLanguage();
  const [dark, setDark] = useState(false);

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
    <button
      type="button"
      className="icon-button"
      onClick={toggle}
      aria-label={dark ? copy.theme.light : copy.theme.dark}
      title={dark ? copy.theme.light : copy.theme.dark}
    >
      {dark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
    </button>
  );
}
