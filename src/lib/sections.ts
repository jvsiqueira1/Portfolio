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

// After an in-page link, the smooth scroll counts as settled once no scroll event came for this long.
const SETTLE_GAP = 180;
// A touch that moves less than this is a tap (opening the menu, pressing PT/EN), not a scroll.
const TOUCH_SLOP = 10;
// Controls that take the scroll keys for themselves.
const CONTROLS = 'button, input, textarea, select, [contenteditable="true"], [role="button"]';

export interface UserScroll {
  /** The scroll position the user chose: the current one, unless the latest movement came only from focus. */
  scrollY(): number;
  /**
   * The section an in-page link (menu, brand, page anchor) is taking the page to, without the "#": set
   * by the click, kept through the smooth scroll and until the next scroll after it settles, dropped at
   * once by the user's own wheel, touch drag or scroll key. Null when no such navigation is pending.
   */
  destination(): string | null;
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
  // The in-page link destination: like the header's menu lock, it holds until the scroll settles and
  // then until the next scroll.
  let pending: { id: string; settled: boolean } | null = null;
  let settleTimer = 0;
  let touchY = 0;

  const settle = () => {
    window.clearTimeout(settleTimer);
    settleTimer = window.setTimeout(() => {
      if (pending) pending.settled = true;
    }, SETTLE_GAP);
  };
  const drop = () => {
    window.clearTimeout(settleTimer);
    pending = null;
  };
  // A user trigger cancels a pending focus, so the movement it starts is the user's.
  const user = () => {
    focusAt = Number.NEGATIVE_INFINITY;
  };
  const wheel = () => {
    user();
    drop();
  };
  const touchStart = (event: TouchEvent) => {
    user();
    touchY = event.touches[0]?.clientY ?? 0;
  };
  const touchMove = (event: TouchEvent) => {
    user();
    if (Math.abs((event.touches[0]?.clientY ?? touchY) - touchY) > TOUCH_SLOP) drop();
  };
  const focus = () => {
    focusAt = performance.now();
  };
  // A press on the page's own scrollbar targets the root element.
  const mouseDown = (event: MouseEvent) => {
    user();
    if (event.target === document.documentElement) drop();
  };
  const key = (event: KeyboardEvent) => {
    if (!SCROLL_KEYS.has(event.key)) return;
    user();
    // Space on a button (reopening the menu) presses it instead of scrolling.
    if (event.target instanceof Element && event.target.closest(CONTROLS)) return;
    drop();
  };
  const click = (event: MouseEvent) => {
    const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href*="#"]') : null;
    if (!link) return;
    user();
    // Same-page section links only; a modified click opens elsewhere and leaves this page where it is.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const id = link.getAttribute("href")?.startsWith("#") ? link.hash.slice(1) : "";
    if (!(PAGE_SECTION_IDS as readonly string[]).includes(id) || !document.getElementById(id)) return;
    pending = { id, settled: false };
    settle();
  };
  const scroll = () => {
    // The scroll an in-page link starts is the user's even if a focus lands before its first frame
    // (reopening the menu right after the click).
    const navigating = pending !== null && !pending.settled;
    if (navigating) settle();
    else drop();
    const now = performance.now();
    if (now - lastScrollAt > CHAIN_GAP) {
      const byFocus = !navigating && now - focusAt < TRIGGER_WINDOW && now - lastUserScrollAt > USER_QUIET;
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
    ["wheel", wheel],
    ["touchstart", touchStart as EventListener],
    ["touchmove", touchMove as EventListener],
    ["mousedown", mouseDown as EventListener],
    ["keydown", key as EventListener],
    ["click", click as EventListener],
    ["hashchange", user],
    ["focusin", focus],
    ["scroll", scroll],
  ];
  for (const [type, listener] of listeners) window.addEventListener(type, listener, options);
  return {
    scrollY: () => (movement === "user" ? window.scrollY : userY),
    destination: () => pending?.id ?? null,
    stop: () => {
      drop();
      for (const [type, listener] of listeners) window.removeEventListener(type, listener, options);
    },
  };
}
