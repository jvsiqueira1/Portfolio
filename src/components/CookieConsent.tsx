"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { useLanguage } from "@/contexts/LanguageContext";

type Consent = "accepted" | "declined" | null;

const STORAGE_KEY = "cookie-consent";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function CookieConsent() {
  const { t } = useLanguage();
  const [consent, setConsent] = useState<Consent>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Consent;
    if (saved === "accepted" || saved === "declined") {
      setConsent(saved);
    }
    setMounted(true);
  }, []);

  function choose(value: Exclude<Consent, null>) {
    localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
  }

  return (
    <>
      {consent === "accepted" && GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
          </Script>
        </>
      )}

      {mounted && consent === null && (
        <div className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6">
          <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-xl border bg-card text-card-foreground p-4 shadow-lg sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">{t("cookie.message")}</p>
            <div className="flex shrink-0 gap-2">
              <button
                onClick={() => choose("declined")}
                className="rounded-lg border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {t("cookie.decline")}
              </button>
              <button
                onClick={() => choose("accepted")}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                {t("cookie.accept")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
