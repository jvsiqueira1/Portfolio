"use client";

import Script from "next/script";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

type Consent = "accepted" | "declined" | null;
const STORAGE_KEY = "cookie-consent";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function CookieConsent() {
  const { copy } = useLanguage();
  const [consent, setConsent] = useState<Consent>(null);
  const [mounted, setMounted] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "accepted" || saved === "declined") setConsent(saved);
    setMounted(true);
  }, []);

  function choose(value: Exclude<Consent, null>) {
    window.localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
  }

  return (
    <>
      {consent === "accepted" && GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
          </Script>
        </>
      )}
      <AnimatePresence>
      {mounted && consent === null && (
        <motion.aside
          className="cookie-banner"
          aria-label="Cookies"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.97 }}
        >
          <p>{copy.cookie.message}</p>
          <div>
            <button type="button" className="button button-secondary" onClick={() => choose("declined")}>{copy.cookie.decline}</button>
            <button type="button" className="button button-primary" onClick={() => choose("accepted")}>{copy.cookie.accept}</button>
          </div>
        </motion.aside>
      )}
      </AnimatePresence>
    </>
  );
}
