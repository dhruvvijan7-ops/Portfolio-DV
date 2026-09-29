import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "DHRUV — AI × CYBERSECURITY × SOFTWARE";

const INK = "#171914";
const PAPER = "#E8E6DA";
const STONE = "#A7A89C";
const OLIVE = "#6F7C5C";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: INK,
          padding: 64,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: STONE, fontSize: 16, letterSpacing: 4 }}>SYSTEM / ONLINE</span>
          <span style={{ color: PAPER, fontSize: 24, fontWeight: 800, letterSpacing: 2 }}>DHRUV</span>
        </div>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "baseline", gap: 28 }}>
          <span style={{ color: OLIVE, fontSize: 18, letterSpacing: 4 }}>01</span>
          <span style={{ color: PAPER, fontSize: 120, fontWeight: 800, letterSpacing: -8, lineHeight: 0.9, textTransform: "uppercase" }}>
            AI × CYBERSECURITY × SOFTWARE
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: STONE, fontSize: 16, letterSpacing: 3 }}>BUILDING INTELLIGENT SYSTEMS</span>
          <span style={{ width: 72, height: 2, backgroundColor: OLIVE }} />
        </div>
      </div>
    ),
    { ...size }
  );
}