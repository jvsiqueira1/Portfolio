import type { ReactNode } from "react";
import { mono, sans } from "@/app/fonts";
import CookieConsent from "@/components/CookieConsent";
import { MotionProvider } from "@/components/motion";
import type { Language } from "@/content";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { HTML_LANG } from "@/lib/site";
import "@/app/globals.css";

// Shared <html> for the two root layouts: the server renders the right lang for each route.
export default function SiteDocument({ language, children }: { language: Language; children: ReactNode }) {
  return (
    <html lang={HTML_LANG[language]}>
      <body className={`${sans.variable} ${mono.variable}`}>
        <LanguageProvider language={language}>
          <MotionProvider>
            {children}
            <CookieConsent />
          </MotionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
