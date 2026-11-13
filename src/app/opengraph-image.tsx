import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.nickname} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 84,
          background: "#ffffff",
          color: "#0f172a",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 8, color: "#64748b" }}>PORTFOLIO</div>
        <div style={{ display: "flex", fontSize: 132, fontWeight: 700, marginTop: 18 }}>{site.nickname}</div>
        <div style={{ display: "flex", fontSize: 46, color: "#475569", marginTop: 6 }}>{site.tagline}</div>
        <div style={{ display: "flex", width: 160, height: 6, background: "#0f172a", marginTop: 44 }} />
      </div>
    ),
    size,
  );
}
