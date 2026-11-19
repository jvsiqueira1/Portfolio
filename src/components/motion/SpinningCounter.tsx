"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { cssMs, prefersReducedMotion } from "@/lib/motion";

// Full turns each reel makes before it lands back on its digit.
const SPINS = 2;
const CELLS = Array.from({ length: (SPINS + 1) * 10 }, (_, index) => index % 10);

// transitions.dev: spinning-counter. Once, the first time the stat is mostly in view, each digit becomes a
// clipped reel (one column per digit, staggered) that spins and lands; the vertical-only SVG blur decays to
// 0 per column as it settles. The reel starts on the final digit, so nothing flashes, and an invisible copy
// of that digit holds the column's exact box, so the layout never moves (no CLS). Before and after the spin
// the stat is its plain text; with reduced motion it never spins.
export default function SpinningCounter({ value }: { value: string }) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const stripRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const blurRefs = useRef<(SVGFEGaussianBlurElement | null)[]>([]);
  const [spinning, setSpinning] = useState(false);
  const filterId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const digits = value.split("");

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      observer.disconnect();
      setSpinning(true);
    }, { threshold: 0.6 });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (!spinning) return;
    const duration = cssMs("--reel-dur", 1400);
    const stagger = cssMs("--reel-stagger", 90);
    const spinBlur = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--reel-spin-blur")) || 3;
    const strips = stripRefs.current.slice(0, digits.length);

    // Commit the start (the final digit, no transition), then tween to the same digit SPINS turns later.
    strips.forEach((strip, column) => {
      if (!strip) return;
      const digit = Number(digits[column]) || 0;
      strip.style.transition = "none";
      strip.style.transform = `translateY(calc(var(--reel-cell) * -${digit}))`;
      void strip.offsetHeight;
      strip.style.transition = `transform var(--reel-dur) var(--reel-ease) calc(var(--reel-stagger) * ${column})`;
      strip.style.transform = `translateY(calc(var(--reel-cell) * -${SPINS * 10 + digit}))`;
    });

    // Decay each column's streak from --reel-spin-blur to 0 over its own window.
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      let moving = false;
      blurRefs.current.slice(0, digits.length).forEach((blur, column) => {
        if (!blur) return;
        const progress = Math.min(1, Math.max(0, (now - start - column * stagger) / duration));
        if (progress < 1) moving = true;
        const amount = spinBlur * (1 - progress) ** 3;
        blur.setAttribute("stdDeviation", `0 ${amount.toFixed(2)}`);
      });
      if (moving) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    const done = window.setTimeout(() => setSpinning(false), duration + stagger * (digits.length - 1) + 60);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(done);
    };
    // The reel runs once per mount; the value is fixed content.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinning]);

  if (!spinning) return <span ref={rootRef}>{value}</span>;

  return (
    <span ref={rootRef} className="t-reel">
      <span className="sr-only">{value}</span>
      <svg className="t-reel-filters" aria-hidden="true" focusable="false">
        {digits.map((_, column) => (
          <filter key={column} id={`${filterId}-${column}`} x="0" y="-50%" width="100%" height="200%">
            <feGaussianBlur ref={(node) => { blurRefs.current[column] = node; }} stdDeviation="0 0" />
          </filter>
        ))}
      </svg>
      {digits.map((digit, column) => (
        <span key={column} className="t-reel-col" aria-hidden="true">
          <span className="t-reel-sizer">{digit}</span>
          <span
            ref={(node) => { stripRefs.current[column] = node; }}
            className="t-reel-strip"
            style={{ filter: `url(#${filterId}-${column})` }}
          >
            {CELLS.map((cell, index) => <span key={index} className="t-reel-digit">{cell}</span>)}
          </span>
        </span>
      ))}
    </span>
  );
}
