"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function ScrollHeading({
  title,
  description,
  className = "section-heading",
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 92%", "end 36%"] });
  const titleY = useTransform(scrollYProgress, [0, 0.78], [56, 0]);
  const titleClip = useTransform(scrollYProgress, [0, 0.72], ["inset(0 0 100% 0)", "inset(0 0 0% 0)"]);
  const descriptionX = useTransform(scrollYProgress, [0.18, 0.9], [32, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.42], [0.28, 1]);

  return (
    <div ref={ref} className={`${className} scroll-heading`}>
      <motion.h2 style={reduceMotion ? undefined : { y: titleY, clipPath: titleClip, opacity }}>
        {title}
      </motion.h2>
      {description && (
        <motion.p style={reduceMotion ? undefined : { x: descriptionX, opacity }}>
          {description}
        </motion.p>
      )}
    </div>
  );
}
