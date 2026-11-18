import type { Metadata } from "next";
import { headers } from "next/headers";
import NotFoundView from "@/components/NotFoundView";
import SiteDocument from "@/components/SiteDocument";
import type { Language } from "@/content";
import { siteViewport } from "@/lib/site";

// With one root layout per language there is no shared layout for unknown URLs; this page keeps the
// 404 inside the site's document (lang, fonts, styles). It answers in English under /en (marked by
// src/middleware.ts) and in Portuguese everywhere else. Next.js also marks the response noindex.
export const metadata: Metadata = { title: "404 | JVS//SYS" };
export const viewport = siteViewport;

export default async function GlobalNotFound() {
  const language: Language = (await headers()).get("x-site-language") === "en" ? "en" : "pt";
  return (
    <SiteDocument language={language}>
      <NotFoundView language={language} />
    </SiteDocument>
  );
}
