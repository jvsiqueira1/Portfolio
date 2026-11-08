/** Every section of the home page, in page order. The hero ("top") comes first and the footer ("contact") last. */
export const PAGE_SECTION_IDS = ["top", "about", "projects", "experience", "technologies", "education", "contact"] as const;

/**
 * The section being read: the last one whose top has crossed a reading line at 35% of the viewport.
 * At the page end the short last sections can never reach that line, so the end means the last one.
 * Returns an id from `ids` (which must be in page order), without the "#". `scrollY` defaults to the
 * current position; pass an earlier one to ask which section was being read there.
 */
export function sectionAtReadingLine(ids: readonly string[], scrollY = window.scrollY): string {
  const root = document.documentElement;
  if (Math.ceil(scrollY + window.innerHeight) >= root.scrollHeight - 2) return ids[ids.length - 1];
  const line = window.innerHeight * 0.35;
  const shift = window.scrollY - scrollY;
  let current = ids[0];
  for (const id of ids) {
    const section = document.getElementById(id);
    if (section && section.getBoundingClientRect().top + shift <= line) current = id;
  }
  return current;
}

// Keys that scroll the page by themselves. Tab is not one: it moves focus, and the browser may scroll
// to the focused element, which is exactly the movement this tracker leaves out.
const SCROLL_KEYS = new Set(["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "]);
// Scroll events within CHAIN_GAP of each other are one movement (Lenis, smooth scrolling and inertia
// emit many). A movement that starts within TRIGGER_WINDOW after a focus, with no user movement in the
// last USER_QUIET, is the focus's; every other movement is the user's.
const CHAIN_GAP = 150;
const TRIGGER_WINDOW = 1000;
const USER_QUIET = 500;

export interface UserScroll {
  /** The scroll position the user chose: the current one, unless the latest movement came only from focus. */
  scrollY(): number;
  stop(): void;
}

/**
 * Follows who moves the page. Wheel, touch, scroll keys, the scrollbar, an anchor link, a hash change and
 * unattributed movement (find in page, the browser's hash jump on load) are the user's. A movement is the
 * focus's only when it starts after a focus (Tab, or a script reacting to focus) while the user is not
 * scrolling: a focus never takes over a movement already under way, so a smooth anchor scroll or a
 * wheel's inertia keeps counting as the user's to its end.
 */
export function trackUserScroll(): UserScroll {
  let focusAt = Number.NEGATIVE_INFINITY;
  let lastScrollAt = Number.NEGATIVE_INFINITY;
  let lastUserScrollAt = Number.NEGATIVE_INFINITY;
  let movement: "user" | "focus" = "user";
  let userY = window.scrollY;

  // A user trigger cancels a pending focus, so the movement it starts is the user's.
  const user = () => {
    focusAt = Number.NEGATIVE_INFINITY;
  };
  const focus = () => {
    focusAt = performance.now();
  };
  const key = (event: KeyboardEvent) => {
    if (SCROLL_KEYS.has(event.key)) user();
  };
  const click = (event: MouseEvent) => {
    if (event.target instanceof Element && event.target.closest('a[href*="#"]')) user();
  };
  const scroll = () => {
    const now = performance.now();
    if (now - lastScrollAt > CHAIN_GAP) {
      const byFocus = now - focusAt < TRIGGER_WINDOW && now - lastUserScrollAt > USER_QUIET;
      movement = byFocus ? "focus" : "user";
    }
    lastScrollAt = now;
    if (movement === "user") {
      lastUserScrollAt = now;
      userY = window.scrollY;
    }
  };

  const options = { capture: true, passive: true } as const;
  const listeners: [string, EventListener][] = [
    ["wheel", user],
    ["touchstart", user],
    ["touchmove", user],
    ["mousedown", user],
    ["keydown", key as EventListener],
    ["click", click as EventListener],
    ["hashchange", user],
    ["focusin", focus],
    ["scroll", scroll],
  ];
  for (const [type, listener] of listeners) window.addEventListener(type, listener, options);
  return {
    scrollY: () => (movement === "user" ? window.scrollY : userY),
    stop: () => {
      for (const [type, listener] of listeners) window.removeEventListener(type, listener, options);
    },
  };
}
