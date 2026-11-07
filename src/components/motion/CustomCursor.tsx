"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const INTERACTIVE = "a[href], button:not(:disabled), [role='button']";

export default function CustomCursor() {
  const { copy } = useLanguage();
  const cursorRef = useRef<HTMLDivElement>(null);
  const coordsRef = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(-120);
  const y = useMotionValue(-120);
  const smoothX = useSpring(x, { stiffness: 680, damping: 46, mass: 0.18 });
  const smoothY = useSpring(y, { stiffness: 680, damping: 46, mass: 0.18 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const coords = coordsRef.current;
    if (!cursor || !coords) return;
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.documentElement;

    const updateCapability = () => {
      const enabled = fine.matches && !reduced.matches;
      root.classList.toggle("has-custom-cursor", enabled);
      cursor.dataset.visible = "false";
    };
    const move = (event: PointerEvent) => {
      if (!fine.matches || reduced.matches) return;
      x.set(event.clientX);
      y.set(event.clientY);
      coords.textContent = `${String(Math.round(event.clientX)).padStart(4, "0")} : ${String(Math.round(event.clientY)).padStart(4, "0")}`;
      const target = event.target instanceof Element ? event.target : null;
      cursor.dataset.state = target?.closest(INTERACTIVE) ? "interactive" : "idle";
      cursor.dataset.visible = "true";
    };
    const hide = () => { cursor.dataset.visible = "false"; };

    updateCapability();
    fine.addEventListener("change", updateCapability);
    reduced.addEventListener("change", updateCapability);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("blur", hide);
    root.addEventListener("mouseleave", hide);
    return () => {
      root.classList.remove("has-custom-cursor");
      fine.removeEventListener("change", updateCapability);
      reduced.removeEventListener("change", updateCapability);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", hide);
      root.removeEventListener("mouseleave", hide);
    };
  }, [x, y]);

  return (
    <motion.div ref={cursorRef} className="custom-cursor" style={{ x: smoothX, y: smoothY }} aria-hidden="true" data-state="idle" data-visible="false">
      <span className="cursor-crosshair" />
      <span className="cursor-label">{copy.ui.cursorOpen}</span>
      <span ref={coordsRef} className="cursor-coords">0000 : 0000</span>
    </motion.div>
  );
}
