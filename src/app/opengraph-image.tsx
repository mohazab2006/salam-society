import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import path from "path";

export const alt = "Salam Society — Muslim Community in Ottawa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const logoPath = path.join(process.cwd(), "public/images/clear-logo.png");
  const logoData = readFileSync(logoPath);
  const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#0f0f0f",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 96px",
          position: "relative",
        }}
      >
        {/* Left orange bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "6px",
            height: "100%",
            background: "#F47B20",
            borderRadius: "0 3px 3px 0",
          }}
        />

        {/* Top: location label */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "32px", height: "3px", background: "#F47B20", borderRadius: "2px" }} />
          <span style={{ color: "#F47B20", fontSize: "17px", fontWeight: 700, letterSpacing: "0.1em" }}>
            OTTAWA, ONTARIO · MUSLIM COMMUNITY
          </span>
        </div>

        {/* Middle: logo + tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoBase64}
            alt="Salam Society"
            width={420}
            height={140}
            style={{ objectFit: "contain", objectPosition: "left" }}
          />

          {/* Divider */}
          <div style={{ width: "64px", height: "3px", background: "#F47B20", borderRadius: "2px", marginTop: "32px", marginBottom: "28px" }} />

          {/* Tagline */}
          <span style={{ fontSize: "30px", color: "#aaaaaa", fontWeight: 400, lineHeight: 1.4 }}>
            Crafting a space for
          </span>
          <span style={{ fontSize: "38px", color: "#ffffff", fontWeight: 800, lineHeight: 1.3 }}>
            Muslim youth in Ottawa.
          </span>
        </div>

        {/* Bottom: URL */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <span style={{ color: "#444444", fontSize: "20px", letterSpacing: "0.05em" }}>
            salamsociety.ca
          </span>
        </div>
      </div>
    ),
    size
  );
}
