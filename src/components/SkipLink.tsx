"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function SkipLink() {
  const { copy } = useLanguage();

  return (
    <a className="skip-link" href="#main">
      {copy.nav.skip}
    </a>
  );
}
