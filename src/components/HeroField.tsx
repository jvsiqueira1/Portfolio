"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const POINTS = Array.from({ length: 170 }, (_, index) => ({
  x: ((index * 73) % 997) / 997,
  y: ((index * 131) % 991) / 991,
  size: 0.5 + ((index * 17) % 13) / 10,
  accent: index % 11 === 0,
}));

export default function HeroField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let running = true;
    let visible = false;
    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      frame = 0;
      if (!running || !visible || document.hidden) return;

      pointerX += (targetX - pointerX) * 0.035;
      pointerY += (targetY - pointerY) * 0.035;
      const tick = time * 0.00035;
      context.clearRect(0, 0, width, height);

      for (const point of POINTS) {
        const px = point.x * width + pointerX * (18 + point.size * 4);
        const py = point.y * height * 0.72 + pointerY * 10;
        const pulse = 0.45 + Math.sin(tick * 3 + point.x * 18) * 0.25;
        context.fillStyle = point.accent
          ? `rgba(200,255,46,${Math.max(0.18, pulse)})`
          : `rgba(233,236,239,${Math.max(0.08, pulse * 0.5)})`;
        context.fillRect(px, py, point.size, point.size);
      }

      const horizon = height * 0.48;
      const rows = width < 700 ? 17 : 23;
      const columns = width < 700 ? 18 : 34;
      context.lineWidth = 0.65;

      for (let row = 0; row < rows; row += 1) {
        const depth = row / (rows - 1);
        context.beginPath();
        for (let col = 0; col <= columns; col += 1) {
          const u = col / columns;
          const spread = Math.pow(depth, 1.65);
          const x = u * width + pointerX * (8 + spread * 12);
          const wave = Math.sin(u * 15 + tick * 2.4) * (12 + spread * 38);
          const ridge = Math.sin(u * 6.4 - tick * 1.6) * (5 + spread * 22);
          const y = horizon + spread * height * 0.62 + (wave + ridge) * spread;
          if (col === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.strokeStyle = `rgba(180,186,194,${0.14 + depth * 0.26})`;
        context.stroke();
      }

      for (let col = 0; col <= columns; col += 1) {
        const u = col / columns;
        context.beginPath();
        for (let row = 0; row < rows; row += 1) {
          const depth = row / (rows - 1);
          const spread = Math.pow(depth, 1.65);
          const x = u * width + pointerX * (8 + spread * 12);
          const wave = Math.sin(u * 15 + tick * 2.4) * (12 + spread * 38);
          const ridge = Math.sin(u * 6.4 - tick * 1.6) * (5 + spread * 22);
          const y = horizon + spread * height * 0.62 + (wave + ridge) * spread;
          if (row === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.strokeStyle = "rgba(122,129,139,0.2)";
        context.stroke();
      }

      frame = window.requestAnimationFrame(draw);
    };

    const handlePointer = (event: PointerEvent) => {
      targetX = event.clientX / Math.max(window.innerWidth, 1) - 0.5;
      targetY = event.clientY / Math.max(window.innerHeight, 1) - 0.5;
    };
    // The loop only runs while the hero is on screen and the tab is visible.
    const resume = () => {
      if (running && visible && !document.hidden && !frame) frame = window.requestAnimationFrame(draw);
    };
    const handleVisibility = () => resume();
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      resume();
    }, { threshold: 0.02 });
    const resizeObserver = new ResizeObserver(resize);

    resize();
    observer.observe(canvas);
    resizeObserver.observe(canvas);
    window.addEventListener("pointermove", handlePointer, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    resume();

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointer);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div className="hero-field" aria-hidden="true">
      <picture className="hero-field-poster">
        <source media="(max-width: 700px)" srcSet="/effects/hero-field-mobile.png" />
        <Image src="/effects/hero-field.png" alt="" fill priority sizes="100vw" />
      </picture>
      <canvas ref={canvasRef} />
    </div>
  );
}
