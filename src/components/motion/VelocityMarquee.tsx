"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";

function wrap(min: number, max: number, value: number) {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

function MarqueeRow({ items, direction }: { items: string[]; direction: 1 | -1 }) {
  const reduceMotion = useReducedMotion();
  const baseX = useMotionValue(direction === 1 ? -50 : 0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 48, stiffness: 320 });
  const velocityFactor = useTransform(smoothVelocity, [-1800, 0, 1800], [-4, 0, 4], { clamp: false });
  const x = useTransform(baseX, (value) => `${wrap(-50, 0, value)}%`);

  useAnimationFrame((_time, delta) => {
    if (reduceMotion) return;
    const baseMove = direction * 3.4 * (delta / 1000);
    const speedBoost = Math.min(5, Math.abs(velocityFactor.get()));
    baseX.set(baseX.get() + baseMove * (1 + speedBoost));
  });

  return (
    <motion.div className="stack-track" style={reduceMotion ? undefined : { x }}>
      {[...items, ...items].map((item, index) => (
        <span key={`${direction}-${item}-${index}`}>{item}</span>
      ))}
    </motion.div>
  );
}

export default function VelocityMarquee({ items }: { items: string[] }) {
  return (
    <div className="stack-marquee" aria-hidden="true">
      <MarqueeRow items={items} direction={-1} />
      <MarqueeRow items={[...items].reverse()} direction={1} />
    </div>
  );
}
