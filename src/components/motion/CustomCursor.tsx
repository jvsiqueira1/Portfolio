"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

const INTERACTIVE_SELECTOR = "a, button, [data-cursor='interactive']";

export default function CustomCursor() {
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const ringX = useSpring(pointerX, { stiffness: 520, damping: 38, mass: 0.24 });
  const ringY = useSpring(pointerY, { stiffness: 520, damping: 38, mass: 0.24 });
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateCapability = () => {
      const next = finePointer.matches && !reducedMotion.matches;
      setEnabled(next);
      document.documentElement.classList.toggle("has-custom-cursor", next);
    };

    const handleMove = (event: PointerEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      setVisible(true);
      setActive(Boolean((event.target as Element | null)?.closest(INTERACTIVE_SELECTOR)));
    };
    const handleLeave = () => setVisible(false);

    updateCapability();
    finePointer.addEventListener("change", updateCapability);
    reducedMotion.addEventListener("change", updateCapability);
    window.addEventListener("pointermove", handleMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      finePointer.removeEventListener("change", updateCapability);
      reducedMotion.removeEventListener("change", updateCapability);
      window.removeEventListener("pointermove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, [pointerX, pointerY]);

  if (!enabled) return null;

  return (
    <div className="custom-cursor" aria-hidden="true" data-visible={visible} data-active={active}>
      <motion.span className="cursor-ring" style={{ x: ringX, y: ringY }} />
      <motion.span className="cursor-dot" style={{ x: pointerX, y: pointerY }} />
    </div>
  );
}
