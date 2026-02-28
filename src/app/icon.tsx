import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#c97d1c",
          borderRadius: 8,
          fontFamily: "sans-serif",
          fontWeight: 700,
          color: "white",
          fontSize: 19,
          letterSpacing: "-0.5px",
        }}
      >
        FL
      </div>
    ),
    { ...size }
  );
}
