"use client";

import Script from "next/script";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

type Consent = "accepted" | "declined" | null;
const STORAGE_KEY = "cookie-consent";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
// The global focus ring reaches 6px past an element (2px outline + 4px offset); keep 2px of air beyond it.
const FOCUS_RING_EXTENT = 8;

// WCAG 2.4.11: the fixed banner must never sit over the focused element. While it is up, publish its
// footprint (height + bottom gap) as --cookie-offset: the stylesheet turns it into scroll padding and
// bottom room so focus scrolling stops above it and the end of the page can still clear it.
// Browsers skip the focus scroll for an element that is already in the viewport, so a focused element
// under the banner is nudged up by hand. Accepting or declining removes the offset. The open mobile menu
// panel also reads the offset, as a max-height that keeps it above the banner.
function reserveBannerSpace(banner: HTMLElement) {
  const root = document.documentElement;
  const publish = () => {
    const gap = Number.parseFloat(window.getComputedStyle(banner).bottom) || 0;
    root.style.setProperty("--cookie-offset", `${Math.ceil(banner.offsetHeight + gap)}px`);
  };
  const keepFocusClear = (event: FocusEvent) => {
    const target = event.target;
    if (!(target instanceof HTMLElement) || banner.contains(target) || target.closest(".project-detail-layer")) return;
    // The sticky header and its menu panel never move with the page, so scrolling the page cannot uncover
    // them; the panel scrolls itself between the header and the banner (globals.css .mobile-nav).
    if (target.closest(".site-header")) return;
    // Keyboard focus only: a pointer press already shows what it hit, and scrolling between mousedown
    // and mouseup would move the control out from under the pointer and lose the click.
    if (!target.matches(":focus-visible")) return;
    const ring = target.getBoundingClientRect();
    const box = banner.getBoundingClientRect();
    const overlapsX = ring.left - FOCUS_RING_EXTENT < box.right && ring.right + FOCUS_RING_EXTENT > box.left;
    const overflowBelow = ring.bottom + FOCUS_RING_EXTENT - box.top;
    if (!overlapsX || overflowBelow <= 0) return;
    // Never push the element's top under the sticky header.
    const headerBottom = document.querySelector(".site-header")?.getBoundingClientRect().bottom ?? 0;
    const room = ring.top - FOCUS_RING_EXTENT - headerBottom;
    const distance = Math.min(overflowBelow, Math.max(room, 0));
    if (distance > 0) window.scrollBy({ top: Math.ceil(distance), behavior: "instant" });
  };

  const observer = new ResizeObserver(publish);
  observer.observe(banner);
  window.addEventListener("resize", publish);
  document.addEventListener("focusin", keepFocusClear);
  publish();
  return () => {
    observer.disconnect();
    window.removeEventListener("resize", publish);
    document.removeEventListener("focusin", keepFocusClear);
    root.style.removeProperty("--cookie-offset");
  };
}

export default function CookieConsent() {
  const { copy } = useLanguage();
  const [consent, setConsent] = useState<Consent>(null);
  const [mounted, setMounted] = useState(false);
  const reduceMotion = useReducedMotion();
  const bannerRef = useRef<HTMLElement>(null);
  const bannerVisible = mounted && consent === null;

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "accepted" || saved === "declined") setConsent(saved);
    setMounted(true);
  }, []);

  useEffect(() => {
    const banner = bannerRef.current;
    if (!bannerVisible || !banner) return;
    return reserveBannerSpace(banner);
  }, [bannerVisible]);

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
      {bannerVisible && (
        <motion.aside
          ref={bannerRef}
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
