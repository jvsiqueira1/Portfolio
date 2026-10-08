"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR = [
  "a[href]",
  "button:not(:disabled)",
  "[role='button']:not([aria-disabled='true'])",
  "summary",
  "label[for]",
  "[data-cursor='interactive']",
  ".project-filters button",
  "[role='dialog'] a",
  "[role='dialog'] button",
].join(",");

const CARD_SELECTOR = ".portfolio-project-card, [data-cursor='card']";
const DISABLED_SELECTOR =
  "button:disabled, [disabled], [aria-disabled='true'], [data-cursor='disabled']";
const NATIVE_SELECTOR = "select, iframe, [data-cursor='native']";
const TEXT_FIELD_SELECTOR =
  "textarea, [contenteditable]:not([contenteditable='false'])";
const TEXT_INPUT_TYPES = new Set([
  "email",
  "number",
  "password",
  "search",
  "tel",
  "text",
  "url",
]);

type CursorState = "idle" | "interactive" | "card" | "disabled";
type NativeCursor = "default" | "text" | null;
type CaretDocument = Document & {
  caretPositionFromPoint?: (x: number, y: number) => { offsetNode: Node } | null;
  caretRangeFromPoint?: (x: number, y: number) => Range | null;
};

function isTextAtPoint(element: Element, x: number, y: number) {
  if (
    element.closest(INTERACTIVE_SELECTOR) ||
    element.closest(CARD_SELECTOR) ||
    element.closest(DISABLED_SELECTOR)
  ) {
    return false;
  }

  const documentWithCaret = document as CaretDocument;
  const node =
    documentWithCaret.caretPositionFromPoint?.(x, y)?.offsetNode ??
    documentWithCaret.caretRangeFromPoint?.(x, y)?.startContainer;
  if (!node || node.nodeType !== Node.TEXT_NODE || !node.textContent?.trim()) return false;

  const parent = node.parentElement;
  if (!parent || getComputedStyle(parent).userSelect === "none") return false;

  const range = document.createRange();
  range.selectNodeContents(node);
  return Array.from(range.getClientRects()).some(
    (rect) =>
      x >= rect.left - 1 &&
      x <= rect.right + 1 &&
      y >= rect.top - 1 &&
      y <= rect.bottom + 1
  );
}

function getNativeCursor(element: Element, x: number, y: number): NativeCursor {
  if (element.closest(TEXT_FIELD_SELECTOR)) return "text";

  const input = element.closest<HTMLInputElement>("input");
  if (input) return TEXT_INPUT_TYPES.has(input.type || "text") ? "text" : "default";
  if (element.closest(NATIVE_SELECTOR)) return "default";
  return isTextAtPoint(element, x, y) ? "text" : null;
}

function getCursorState(element: Element): CursorState {
  if (element.closest(DISABLED_SELECTOR)) return "disabled";
  if (element.closest(CARD_SELECTOR)) return "card";
  if (element.closest(INTERACTIVE_SELECTOR)) return "interactive";
  return "idle";
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const ringX = useSpring(pointerX, { stiffness: 640, damping: 42, mass: 0.2 });
  const ringY = useSpring(pointerY, { stiffness: 640, damping: 42, mass: 0.2 });

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const root = document.documentElement;
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lastX = -100;
    let lastY = -100;
    let hasPosition = false;
    let refreshFrame = 0;
    let nativeTarget: HTMLElement | null = null;

    const setNativeTarget = (element: Element | null, nativeCursor: NativeCursor) => {
      nativeTarget?.removeAttribute("data-native-cursor-active");
      nativeTarget = nativeCursor && element instanceof HTMLElement ? element : null;
      if (nativeTarget && nativeCursor) {
        nativeTarget.dataset.nativeCursorActive = nativeCursor;
      }
    };

    const setVisible = (visible: boolean) => {
      cursor.dataset.visible = String(visible);
    };

    const refreshTarget = () => {
      refreshFrame = 0;
      if (!hasPosition || !finePointer.matches || reducedMotion.matches) return;

      const insideViewport =
        lastX >= 0 &&
        lastY >= 0 &&
        lastX < root.clientWidth &&
        lastY < root.clientHeight;
      const element = insideViewport ? document.elementFromPoint(lastX, lastY) : null;
      const nativeCursor = element ? getNativeCursor(element, lastX, lastY) : null;

      setNativeTarget(element, nativeCursor);
      cursor.dataset.native = String(Boolean(nativeCursor));
      cursor.dataset.state = element ? getCursorState(element) : "idle";
      setVisible(Boolean(element && !nativeCursor && document.hasFocus()));
    };

    const scheduleRefresh = () => {
      if (!hasPosition || refreshFrame) return;
      refreshFrame = window.requestAnimationFrame(refreshTarget);
    };

    const updateCapability = () => {
      const enabled = finePointer.matches && !reducedMotion.matches;
      root.classList.toggle("has-custom-cursor", enabled);
      if (!enabled) {
        setVisible(false);
        setNativeTarget(null, null);
      } else {
        scheduleRefresh();
      }
    };

    const handleMove = (event: PointerEvent) => {
      lastX = event.clientX;
      lastY = event.clientY;
      hasPosition = true;
      pointerX.set(lastX);
      pointerY.set(lastY);
      refreshTarget();
    };

    const handleDown = () => {
      cursor.dataset.pressed = "true";
    };
    const handleUp = () => {
      cursor.dataset.pressed = "false";
      scheduleRefresh();
    };
    const handleLeave = () => {
      setVisible(false);
      cursor.dataset.pressed = "false";
      setNativeTarget(null, null);
    };
    const handleFocus = () => scheduleRefresh();

    updateCapability();
    finePointer.addEventListener("change", updateCapability);
    reducedMotion.addEventListener("change", updateCapability);
    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerdown", handleDown, { passive: true });
    window.addEventListener("pointerup", handleUp, { passive: true });
    window.addEventListener("pointercancel", handleUp, { passive: true });
    window.addEventListener("scroll", scheduleRefresh, { capture: true, passive: true });
    window.addEventListener("resize", scheduleRefresh, { passive: true });
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleLeave);
    root.addEventListener("mouseleave", handleLeave);
    root.addEventListener("mouseenter", handleFocus);

    return () => {
      root.classList.remove("has-custom-cursor");
      setNativeTarget(null, null);
      window.cancelAnimationFrame(refreshFrame);
      finePointer.removeEventListener("change", updateCapability);
      reducedMotion.removeEventListener("change", updateCapability);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("pointercancel", handleUp);
      window.removeEventListener("scroll", scheduleRefresh, true);
      window.removeEventListener("resize", scheduleRefresh);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleLeave);
      root.removeEventListener("mouseleave", handleLeave);
      root.removeEventListener("mouseenter", handleFocus);
    };
  }, [pointerX, pointerY]);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      aria-hidden="true"
      data-native="false"
      data-pressed="false"
      data-state="idle"
      data-visible="false"
    >
      <motion.span className="cursor-ring" style={{ x: ringX, y: ringY }}>
        <span className="cursor-ring-visual" />
      </motion.span>
      <motion.span className="cursor-dot" style={{ x: pointerX, y: pointerY }}>
        <span className="cursor-dot-visual" />
      </motion.span>
    </div>
  );
}
