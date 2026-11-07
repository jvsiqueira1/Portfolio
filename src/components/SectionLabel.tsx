// Renders "[02] // SISTEMAS" as an accent index plus a muted title.
export default function SectionLabel({ text, className = "" }: { text: string; className?: string }) {
  const [index, ...rest] = text.split("//");
  const title = rest.join("//").trim();
  return (
    <p className={`section-label ${className}`.trim()}>
      <span className="section-label-index">{index.trim()}</span>
      {title && <span className="section-label-title">{"// "}{title}</span>}
    </p>
  );
}
