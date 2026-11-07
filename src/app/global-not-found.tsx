import type { Metadata } from "next";
import Link from "next/link";
import SiteDocument from "@/components/SiteDocument";
import { siteViewport } from "@/lib/site";

// With one root layout per language there is no shared layout for unknown URLs; this page keeps the
// 404 inside the site's document (lang, fonts, styles) and offers both homes.
// Next.js already marks the not-found response noindex.
export const metadata: Metadata = { title: "404 | JVS//SYS" };
export const viewport = siteViewport;

export default function GlobalNotFound() {
  return (
    <SiteDocument language="pt">
      <main id="main" className="section">
        <div className="shell">
          <p lang="pt-BR">404 · Página não encontrada.</p>
          <p lang="en">404 · Page not found.</p>
          <p className="hero-actions">
            <Link className="button button-primary" href="/">Ir para o início</Link>
            <Link className="button button-secondary" href="/en" lang="en" hrefLang="en">Go to the English home</Link>
          </p>
        </div>
      </main>
    </SiteDocument>
  );
}
