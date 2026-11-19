"use client";

import { Fragment, useEffect, useRef } from "react";

// How far the strip slides per pixel scrolled: linear, no easing, no acceleration.
const SCROLL_FACTOR = 0.25;

// The stack strip rests still with the whole list in view, spread across the shell (globals.css,
// .stack-marquee). Only scrolling moves it, on desktop and on low landscape screens (CSS sets
// --strip-scroll to 1 there): it slides 0.25px left per pixel scrolled. Nothing runs per frame and no
// animation plays at rest. The list is drawn twice: the second copy waits outside the shell window, one
// item gap after the first, so the slide never opens an empty gap, and the offset wraps by that period.
// On phones (two rows of four) and under reduced motion the strip never moves.
export default function VelocityMarquee({ items }: { items: string[] }) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const half = Math.ceil(items.length / 2);
  const rows = [items.slice(0, half), items.slice(half)];

  useEffect(() => {
    const marquee = marqueeRef.current;
    const track = trackRef.current;
    if (!marquee || !track) return;

    let linked = false;
    let period = 0;
    let shift = 0;

    const place = () => {
      if (!linked || period <= 0) return;
      const next = (Math.max(0, window.scrollY) * SCROLL_FACTOR) % period;
      if (next === shift) return;
      shift = next;
      track.style.transform = shift ? `translate3d(${-shift}px, 0, 0)` : "";
    };

    // Reads the layout once per size, font or preference change, never per scroll.
    const measure = () => {
      linked = getComputedStyle(marquee).getPropertyValue("--strip-scroll").trim() === "1";
      shift = 0;
      track.style.transform = "";
      if (!linked) {
        track.style.removeProperty("--strip-space");
        return;
      }
      const [first, second] = track.querySelectorAll<HTMLElement>(".stack-copy");
      const item = first?.querySelector<HTMLElement>(".stack-item");
      const star = item?.nextElementSibling;
      if (!first || !second || !item || !star) return;
      // The space between an item and its star, so the copy-to-copy joint matches every other gap.
      const space = star.getBoundingClientRect().left - item.getBoundingClientRect().right;
      track.style.setProperty("--strip-space", `${Math.max(0, space)}px`);
      period = second.getBoundingClientRect().left - first.getBoundingClientRect().left;
      place();
    };

    const resizeObserver = new ResizeObserver(measure);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    resizeObserver.observe(marquee);
    reducedMotion.addEventListener("change", measure);
    document.fonts.addEventListener("loadingdone", measure);
    window.addEventListener("scroll", place, { passive: true });
    measure();

    return () => {
      resizeObserver.disconnect();
      reducedMotion.removeEventListener("change", measure);
      document.fonts.removeEventListener("loadingdone", measure);
      window.removeEventListener("scroll", place);
    };
  }, []);

  return (
    <div ref={marqueeRef} className="stack-marquee" aria-hidden="true">
      <div className="shell stack-window">
        <div ref={trackRef} className="stack-track">
          {[0, 1].map((copy) => (
            <Fragment key={copy}>
              <div className="stack-copy">
                {rows.map((row, rowIndex) => (
                  <Fragment key={rowIndex}>
                    {rowIndex > 0 && <i className="stack-star stack-star-join" />}
                    <span className="stack-row">
                      {row.map((item, index) => (
                        <Fragment key={item}>
                          {index > 0 && <i className="stack-star" />}
                          <span className="stack-item">{item}</span>
                        </Fragment>
                      ))}
                    </span>
                  </Fragment>
                ))}
              </div>
              <i className="stack-star stack-star-loop" />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
