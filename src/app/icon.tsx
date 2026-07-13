import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at 50% 42%, #24352b 0%, #0d100d 62%, #090b09 100%)",
        color: "#f3efe6",
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", width: 342, height: 166, border: "10px solid #c8a96c", borderRadius: "50%", transform: "rotate(-25deg)", opacity: 0.95 }} />
      <div style={{ position: "absolute", width: 342, height: 166, border: "8px solid #f3efe6", borderRadius: "50%", transform: "rotate(25deg)", opacity: 0.42 }} />
      <div style={{ width: 106, height: 106, borderRadius: "50%", background: "#f3efe6", boxShadow: "0 0 70px rgba(200,169,108,.36)" }} />
      <div style={{ position: "absolute", width: 38, height: 38, borderRadius: "50%", background: "#c8a96c", left: 393, top: 151, boxShadow: "0 0 28px rgba(200,169,108,.65)" }} />
    </div>,
    size
  );
}
