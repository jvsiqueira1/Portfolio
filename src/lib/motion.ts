// Helpers for the transitions.dev recipes (globals.css): their durations live in :root tokens, so the
// close-then-cleanup timers read the same value the CSS animates with.

// A numeric CSS variable off :root, in ms ("ms"/"s" suffixes ok); the fallback covers a missing token.
export function cssMs(name: string, fallback: number) {
  if (typeof window === "undefined") return fallback;
  const raw = window.getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if (!raw) return fallback;
  const value = Number.parseFloat(raw);
  if (!Number.isFinite(value)) return fallback;
  return raw.endsWith("ms") ? value : raw.endsWith("s") ? value * 1000 : value;
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
