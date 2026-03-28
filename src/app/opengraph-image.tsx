import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import path from "path";
import { getRequestSiteOrigin } from "@/lib/request-site-origin";

export const alt = "Salam Society — Muslim Community in Ottawa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default async function OgImage() {
  const logoData = readFileSync(
    path.join(process.cwd(), "public", "images", "clear-logo.png")
  );
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;
  const siteHost = new URL(await getRequestSiteOrigin()).host;

  // Load Outfit Bold from Google Fonts (modern, geometric, soft)
  const fontCss = await fetch(
    "https://fonts.googleapis.com/css2?family=Outfit:wght@700&display=swap",
    { headers: { "User-Agent": "Mozilla/5.0" } }
  ).then((r) => r.text());
  const fontUrl = fontCss.match(/src: url\(([^)]+)\)/)?.[1];
  const fontData = fontUrl
    ? await fetch(fontUrl).then((r) => r.arrayBuffer())
    : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#ffffff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          position: "relative",
        }}
      >
        {/* Top orange bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "#F47B20",
          }}
        />

        {/* Subtle watermark */}
        <div
          style={{
            position: "absolute",
            right: "-20px",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "320px",
            fontWeight: 900,
            color: "#F47B20",
            opacity: 0.04,
            letterSpacing: "-10px",
            lineHeight: 1,
          }}
        >
          salam
        </div>

        {/* Location label */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "36px" }}>
          <div style={{ width: "32px", height: "3px", background: "#F47B20", borderRadius: "2px" }} />
          <span style={{ color: "#F47B20", fontSize: "16px", fontWeight: 700, letterSpacing: "0.12em" }}>
            OTTAWA, ONTARIO · MUSLIM COMMUNITY
          </span>
        </div>

        {/* Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt="Salam Society"
          width={580}
          height={193}
          style={{ objectFit: "contain", objectPosition: "left" }}
        />

        {/* Divider */}
        <div style={{ width: "56px", height: "3px", background: "#F47B20", borderRadius: "2px", marginTop: "28px", marginBottom: "20px" }} />

        {/* Tagline */}
        <span style={{ fontSize: "26px", color: "#888888", fontWeight: 400, lineHeight: 1.4 }}>
          Crafting a space for
        </span>
        <span
          style={{
            fontSize: "36px",
            color: "#111111",
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: "48px",
            fontFamily: fontData ? "Outfit" : "sans-serif",
            letterSpacing: "-0.5px",
          }}
        >
          Muslim youth in Ottawa.
        </span>

        {/* Footer band */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "72px",
            background: "#F47B20",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 96px",
          }}
        >
          <span style={{ color: "#ffffff", fontSize: "17px", fontWeight: 700, letterSpacing: "0.05em" }}>
            Events · Programs · Community
          </span>
          <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "17px", letterSpacing: "0.05em" }}>
            {siteHost}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [{ name: "Outfit", data: fontData, style: "normal", weight: 700 }]
        : [],
    }
  );
}
