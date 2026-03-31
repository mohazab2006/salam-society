import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F47B20",
          borderRadius: "96px",
        }}
      >
        <span
          style={{
            color: "white",
            fontSize: 300,
            fontWeight: 800,
            fontFamily: "Georgia, serif",
            lineHeight: 1,
            marginTop: "20px",
          }}
        >
          S
        </span>
      </div>
    ),
    { ...size }
  );
}
