"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

// The field is the hero's only ambient motion, and a slow one: 12 frames a second are enough for a drift
// this calm, for half the main-thread cost of 24 (UX-10).
const FRAME_INTERVAL = 1000 / 12;
// Waves, ridges and pulses run three times slower than before (cycles of 22.5s, 33.7s and 18s).
const TIME_SCALE = 0.00035 / 3;
// Pointer parallax: up to 9px on the points and 7px on the mesh (a third of the earlier reach).
const POINT_PARALLAX = 1 / 3;
const MESH_PARALLAX = 0.35;
// Behind the text column (0-55% of the width) the field runs at 45%, easing back to full by 62%;
// on phones the whole field runs at 60%. The poster underneath gets the same zone in CSS
// (`.hero-field-poster` in globals.css): keep the two in step.
const CALM_ZONE_END = 0.55;
const CALM_ZONE_FADE = 0.62;
const CALM_ZONE_LEVEL = 0.45;
const PHONE_LEVEL = 0.6;
const PHONE_QUERY = "(max-width: 640px)";

// 96 points: four of every seven of the earlier 170-point lattice (same positions), four of them green.
const POINTS = Array.from({ length: 168 }, (_, index) => index)
  .filter((index) => index % 7 < 4)
  .slice(0, 96)
  .map((index) => ({
    x: ((index * 73) % 997) / 997,
    y: ((index * 131) % 991) / 991,
    size: 0.5 + ((index * 17) % 13) / 10,
    accent: index % 42 === 10,
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
    const phone = window.matchMedia(PHONE_QUERY);

    let width = 0;
    let height = 0;
    let frame = 0;
    let lastDraw = 0;
    let running = true;
    let visible = false;
    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;
    let calm: CanvasGradient | null = null;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      calm = context.createLinearGradient(width * CALM_ZONE_END, 0, width * CALM_ZONE_FADE, 0);
      calm.addColorStop(0, `rgba(0,0,0,${1 - CALM_ZONE_LEVEL})`);
      calm.addColorStop(1, "rgba(0,0,0,0)");
    };

    const draw = (time: number) => {
      frame = 0;
      if (!running || !visible || document.hidden) return;
      // Skip the frames in between, but keep the loop alive (the tolerance absorbs rAF jitter).
      const elapsed = time - lastDraw;
      if (lastDraw && elapsed < FRAME_INTERVAL - 4) {
        frame = window.requestAnimationFrame(draw);
        return;
      }
      // The pointer easing keeps its 60fps pace whatever the frame rate.
      const ease = 1 - Math.pow(1 - 0.035, Math.min(elapsed, 100) / (1000 / 60));
      lastDraw = time;

      pointerX += (targetX - pointerX) * ease;
      pointerY += (targetY - pointerY) * ease;
      const tick = time * TIME_SCALE;
      context.clearRect(0, 0, width, height);

      for (const point of POINTS) {
        const px = point.x * width + pointerX * (18 + point.size * 4) * POINT_PARALLAX;
        const py = point.y * height * 0.72 + pointerY * 10 * POINT_PARALLAX;
        // Pulse 0.10-0.20 on the light points (0.20-0.40 on the green ones, still twice the light).
        const pulse = 0.3 + Math.sin(tick * 3 + point.x * 18) * 0.1;
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
          const x = u * width + pointerX * (8 + spread * 12) * MESH_PARALLAX;
          const wave = Math.sin(u * 15 + tick * 2.4) * (12 + spread * 38);
          const ridge = Math.sin(u * 6.4 - tick * 1.6) * (5 + spread * 22);
          const y = horizon + spread * height * 0.62 + (wave + ridge) * spread;
          if (col === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.strokeStyle = `rgba(180,186,194,${0.08 + depth * 0.16})`;
        context.stroke();
      }

      for (let col = 0; col <= columns; col += 1) {
        const u = col / columns;
        context.beginPath();
        for (let row = 0; row < rows; row += 1) {
          const depth = row / (rows - 1);
          const spread = Math.pow(depth, 1.65);
          const x = u * width + pointerX * (8 + spread * 12) * MESH_PARALLAX;
          const wave = Math.sin(u * 15 + tick * 2.4) * (12 + spread * 38);
          const ridge = Math.sin(u * 6.4 - tick * 1.6) * (5 + spread * 22);
          const y = horizon + spread * height * 0.62 + (wave + ridge) * spread;
          if (row === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.strokeStyle = "rgba(122,129,139,0.12)";
        context.stroke();
      }

      // Dim what was just drawn (destination-out keeps that share of its alpha): one fill per frame.
      context.globalCompositeOperation = "destination-out";
      if (phone.matches) {
        context.fillStyle = `rgba(0,0,0,${1 - PHONE_LEVEL})`;
        context.fillRect(0, 0, width, height);
      } else if (calm) {
        context.fillStyle = calm;
        context.fillRect(0, 0, width * CALM_ZONE_FADE, height);
      }
      context.globalCompositeOperation = "source-over";

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
        <source media="(max-width: 700px)" srcSet="/effects/hero-field-mobile.webp" type="image/webp" />
        {/* The poster is the LCP element, so it is fetched early and at high priority. No `priority`:
            its preload would ignore the mobile <source> and fetch the desktop file on phones too. */}
        <Image src="/effects/hero-field.png" alt="" fill loading="eager" fetchPriority="high" sizes="100vw" />
      </picture>
      <canvas ref={canvasRef} />
    </div>
  );
}
