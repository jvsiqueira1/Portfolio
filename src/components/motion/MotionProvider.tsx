"use client";

import Lenis from "lenis";
import { MotionConfig } from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import CustomCursor from "./CustomCursor";

type ReleasePageScrollLock = (scrollTop?: number) => void;
type AcquirePageScrollLock = () => ReleasePageScrollLock;

const PageScrollLockContext = createContext<AcquirePageScrollLock | null>(null);

export function usePageScrollLock() {
  const acquirePageScrollLock = useContext(PageScrollLockContext);

  if (!acquirePageScrollLock) {
    throw new Error("usePageScrollLock must be used within MotionProvider");
  }

  return acquirePageScrollLock;
}

// Focus an in-page link's target without scrolling (Lenis is already moving the page there). A section is
// not focusable by itself: it gets tabindex="-1" and data-anchor-target, which hides the ring on the
// container (globals.css) and tells the cookie banner's focus guard that this is not a control.
function focusAnchorTarget(target: HTMLElement) {
  if (!target.matches("a[href], button, input, select, textarea, [tabindex]")) {
    target.setAttribute("tabindex", "-1");
    target.setAttribute("data-anchor-target", "");
  }
  target.focus({ preventScroll: true });
}

export default function MotionProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const resumeFrameRef = useRef(0);
  const resumeTimeoutRef = useRef(0);
  const resumeScrollTopRef = useRef<number | null>(null);
  const scrollLockCountRef = useRef(0);

  const acquirePageScrollLock = useCallback(() => {
    window.cancelAnimationFrame(resumeFrameRef.current);
    window.clearTimeout(resumeTimeoutRef.current);
    if (scrollLockCountRef.current === 0) resumeScrollTopRef.current = null;
    scrollLockCountRef.current += 1;
    lenisRef.current?.stop();

    let released = false;
    return (scrollTop?: number) => {
      if (released) return;
      released = true;
      if (scrollTop !== undefined) resumeScrollTopRef.current = scrollTop;
      scrollLockCountRef.current = Math.max(0, scrollLockCountRef.current - 1);

      if (scrollLockCountRef.current === 0) {
        resumeFrameRef.current = window.requestAnimationFrame(() => {
          resumeTimeoutRef.current = window.setTimeout(() => {
            if (scrollLockCountRef.current !== 0) return;

            const lenis = lenisRef.current;
            const resumeScrollTop = resumeScrollTopRef.current;
            if (lenis && resumeScrollTop !== null) {
              lenis.resize();
              lenis.scrollTo(resumeScrollTop, { immediate: true, force: true });
            }
            lenis?.start();
          }, 0);
        });
      }
    };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.86,
    });
    lenisRef.current = lenis;
    if (scrollLockCountRef.current > 0) lenis.stop();
    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };
    frame = window.requestAnimationFrame(raf);

    const handleAnchor = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href^='#']");
      if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;

      event.preventDefault();
      // No offset of our own: html's scroll-padding-top already keeps the target below the sticky header,
      // and Lenis honours it, so both motion modes land in the same place (UX-09).
      lenis.scrollTo(target);
      window.history.replaceState(null, "", hash);
      // Move focus with the page, as the browser's own anchor jump does for the next Tab (UX-01): the skip
      // link and the menu continue from the target, even while the smooth scroll is still running.
      focusAnchorTarget(target);
    };

    document.addEventListener("click", handleAnchor);
    return () => {
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(resumeFrameRef.current);
      window.clearTimeout(resumeTimeoutRef.current);
      document.removeEventListener("click", handleAnchor);
      if (lenisRef.current === lenis) lenisRef.current = null;
      lenis.destroy();
    };
  }, []);

  return (
    <PageScrollLockContext.Provider value={acquirePageScrollLock}>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
        {children}
        <CustomCursor />
      </MotionConfig>
    </PageScrollLockContext.Provider>
  );
}
