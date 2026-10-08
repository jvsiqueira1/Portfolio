"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

export default function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "rise",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "rise" | "mask" | "slide" | "scale";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, margin: "-8% 0px -8% 0px", amount: 0.12 });

  useEffect(() => {
    const node = ref.current;
    if (node && visible) node.dataset.visible = "true";
  }, [visible]);

  return (
    <motion.div
      ref={ref}
      className={`reveal ${className}`}
      data-reveal={variant}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </motion.div>
  );
}
