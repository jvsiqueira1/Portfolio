"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

type Consent = "accepted" | "declined" | null;
const STORAGE_KEY = "cookie-consent";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function CookieConsent() {
  const { copy } = useLanguage();
  const [consent, setConsent] = useState<Consent>(null);
  const [mounted, setMounted] = useState(false);

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
      {mounted && consent === null && (
        <aside className="cookie-banner" aria-label="Cookies">
          <p>{copy.cookie.message}</p>
          <div>
            <button type="button" className="button button-secondary" onClick={() => choose("declined")}>{copy.cookie.decline}</button>
            <button type="button" className="button button-primary" onClick={() => choose("accepted")}>{copy.cookie.accept}</button>
          </div>
        </aside>
      )}
    </>
  );
}
