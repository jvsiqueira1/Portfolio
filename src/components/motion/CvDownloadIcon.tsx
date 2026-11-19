"use client";

import { ArrowDown } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cssMs } from "@/lib/motion";

type Phase = "arrow" | "check" | "leaving";

// transitions.dev: spinner-check-morph (Pro). The "Download CV" arrow at rest; each click (`clicks` goes up)
// puts the badge in its place, which morphs from the spinner into the check (the browser has the file from
// here on, so the spinner only shows while the morph starts), holds for --check-hold, then fades back to the
// arrow. The badge floats over the 16px slot (globals.css), so the button never changes size, and it is
// decoration: the link keeps its name. With reduced motion the check shows at once, drawn, and goes the
// same way.
export default function CvDownloadIcon({ clicks }: { clicks: number }) {
  const [phase, setPhase] = useState<Phase>("arrow");
  const [badgeState, setBadgeState] = useState<"spinning" | "done">("spinning");
  const [crossing, setCrossing] = useState(false);
  const [markLength, setMarkLength] = useState<number | null>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const markRef = useRef<SVGPathElement>(null);

  // A click mounts (or resets) the badge on the spinner.
  useLayoutEffect(() => {
    if (!clicks) return;
    setBadgeState("spinning");
    setPhase("check");
  }, [clicks]);

  // Then, as the recipe's controller does: calibrate the check's dash to its real length, commit the
  // spinner, flip to "done" and pulse the cross-blur; schedule the hold.
  useLayoutEffect(() => {
    if (phase !== "check" || badgeState !== "spinning") return;
    const badge = badgeRef.current;
    const mark = markRef.current;
    if (badge && mark) {
      const length = Math.ceil(mark.getTotalLength());
      badge.style.setProperty("--check-mark-len", String(length));
      setMarkLength(length);
      void badge.offsetWidth;
    }
    setBadgeState("done");
    setCrossing(true);
  }, [phase, badgeState]);

  useEffect(() => {
    if (!crossing) return;
    const timer = window.setTimeout(() => setCrossing(false), cssMs("--check-fill-dur", 350) * 0.45);
    return () => window.clearTimeout(timer);
  }, [crossing]);

  useEffect(() => {
    if (phase === "arrow") return;
    const timer = phase === "check"
      ? window.setTimeout(() => setPhase("leaving"), cssMs("--check-hold", 2000))
      : window.setTimeout(() => setPhase("arrow"), cssMs("--check-revert-dur", 250));
    return () => window.clearTimeout(timer);
  }, [phase, clicks]);

  return (
    <span className="cv-download-icon" data-phase={phase}>
      <ArrowDown aria-hidden="true" />
      {phase !== "arrow" && (
        <span className="cv-download-badge" aria-hidden="true">
          <span className={`t-check-blur-wrap${crossing ? " is-crossing" : ""}`}>
            <span
              ref={badgeRef}
              className="t-check-badge"
              data-state={badgeState}
              style={markLength ? ({ "--check-mark-len": markLength } as React.CSSProperties) : undefined}
            >
              <span className="t-check-ring" />
              <span className="t-check-arc" />
              <span className="t-check-fill" />
              <span className="t-check-disc">
                <svg viewBox="0 0 24 24">
                  <path ref={markRef} className="t-check-mark" d="M8 12.5L10.8 15.5L16.4 9.5" />
                </svg>
              </span>
            </span>
          </span>
        </span>
      )}
    </span>
  );
}
