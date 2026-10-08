"use client";

import { motion, useReducedMotion, useSpring } from "motion/react";
import type { PointerEvent, ReactNode } from "react";

type MagneticLinkProps = {
  children: ReactNode;
  className?: string;
  href: string;
  download?: boolean;
  target?: "_blank";
  rel?: string;
};

export default function MagneticLink({ children, className, ...props }: MagneticLinkProps) {
  const reduceMotion = useReducedMotion();
  const x = useSpring(0, { stiffness: 360, damping: 22 });
  const y = useSpring(0, { stiffness: 360, damping: 22 });

  function handlePointerMove(event: PointerEvent<HTMLAnchorElement>) {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - bounds.left - bounds.width / 2) * 0.16);
    y.set((event.clientY - bounds.top - bounds.height / 2) * 0.2);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      {...props}
      className={className}
      style={{ x, y }}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
      whileTap={reduceMotion ? undefined : { scale: 0.96 }}
    >
      {children}
    </motion.a>
  );
}
