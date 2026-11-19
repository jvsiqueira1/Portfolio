// transitions.dev: learn-more-hover. lucide's ArrowUpRight (same 24px box, stroke, caps and paths). At rest
// the head is lucide's own polyline, so the arrow is pixel-identical to the approved one; on hover it hands
// over to the same head drawn as two arms, which spread about the tip while the arrow slides toward where it
// points. The control that holds it carries the .t-learn class (globals.css).
export default function LearnArrow() {
  return (
    <span className="t-learn-chevron" aria-hidden="true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-arrow-up-right"
      >
        <path className="t-learn-head" d="M7 7h10v10" />
        <path d="M7 17 17 7" />
        <path className="t-learn-arm t-learn-arm-top" d="M7 7h10" />
        <path className="t-learn-arm t-learn-arm-bot" d="M17 7v10" />
      </svg>
    </span>
  );
}
