"use client";

import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";

// The strip drifts by a CSS animation (globals.css, .stack-track), which the compositor runs without the
// main thread: parked on the hero, nothing runs per frame in JavaScript (UX-10). Scrolling still speeds
// it up as before, by changing the animation's playback rate while the scroll velocity changes, and it
// pauses when it leaves the screen.
function MarqueeRow({ items, active }: { items: string[]; active: boolean }) {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 48, stiffness: 320 });
  const velocityFactor = useTransform(smoothVelocity, [-1800, 0, 1800], [-4, 0, 4], { clamp: false });

  const animation = () => trackRef.current?.getAnimations()[0];

  useMotionValueEvent(velocityFactor, "change", (value) => {
    const running = animation();
    if (running) running.playbackRate = 1 + Math.min(5, Math.abs(value));
  });

  useEffect(() => {
    const running = animation();
    if (!running || reduceMotion) return;
    if (active) running.play();
    else running.pause();
  }, [active, reduceMotion]);

  return (
    <div ref={trackRef} className="stack-track">
      {[...items, ...items].map((item, index) => (
        <span key={`${item}-${index}`}>{item}</span>
      ))}
    </div>
  );
}

export default function VelocityMarquee({ items }: { items: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  return (
    <div ref={ref} className="stack-marquee" aria-hidden="true">
      <MarqueeRow items={items} active={inView} />
    </div>
  );
}
