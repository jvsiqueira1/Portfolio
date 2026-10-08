import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "João Vitor, Desenvolvedor Full-Stack";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0c100e",
        color: "#f2f6f3",
        padding: "72px 80px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", width: 126, height: 74, alignItems: "center" }}>
          <svg width="126" height="74" viewBox="0 0 610 355" aria-label="JVS Development">
            <path fill="#5d687c" d="M119 52 186 131v126c0 64-38 98-94 98S0 317 0 257h68c0 25 8 31 24 31 17 0 27-10 27-30V52Z" />
            <path fill="#4b5568" d="m202 165 79 113h238c11 0 17-8 17-16 0-9-7-16-19-16h-76c-40 0-71-19-82-50l74-101h176l-50 68H444c-11 0-14 6-14 14 0 7 7 12 17 12h72c49 0 84 34 84 77 0 46-35 78-84 78H254l-52-55V165Z" />
            <path fill="#0b6cff" d="M93 0h101l98 152L400 0h95L292 263 93 0Z" />
            <path fill="#11b5f5" d="M506 0h55l-55 77h-57L506 0Z" />
          </svg>
        </div>
        <div style={{ color: "#9ca8a0", fontSize: 26 }}>Cuiabá, MT</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 980 }}>
        <div style={{ fontSize: 82, lineHeight: 0.98, letterSpacing: "-3px", fontWeight: 800 }}>Sistemas que conectam produto, dados e operação.</div>
        <div style={{ fontSize: 30, color: "#b8c3bc" }}>João Vitor · Desenvolvedor Full-Stack</div>
      </div>
      <div style={{ height: 10, width: "100%", background: "#4b69ff", borderRadius: 999 }} />
    </div>,
    size
  );
}
