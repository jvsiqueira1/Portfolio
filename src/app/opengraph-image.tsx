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
        <div style={{ display: "flex", width: 72, height: 72, alignItems: "center", justifyContent: "center", borderRadius: 16, background: "#4b69ff", fontSize: 30, fontWeight: 800 }}>JV</div>
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
