import { ImageResponse } from "next/og";
import { getSiteUrl } from "@/lib/site-url";
import { getRequestSiteOrigin } from "@/lib/request-site-origin";

export const alt = "Salam Society — Muslim Community in Ottawa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default async function OgImage() {
  // Fetch logo from static CDN — works on Vercel (public files are on CDN, not in function bundle)
  const staticOrigin = getSiteUrl();
  const logoRes = await fetch(`${staticOrigin}/images/clear-logo.png`);
  const logoBuffer = await logoRes.arrayBuffer();
  const logoSrc = `data:image/png;base64,${Buffer.from(logoBuffer).toString("base64")}`;

  // Display hostname (adapts to salamsociety.ca or *.vercel.app)
  const siteHost = new URL(await getRequestSiteOrigin()).host;

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
        {/* Left orange accent bar */}
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
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            alt="Salam Society"
            width={400}
            height={130}
            style={{ objectFit: "contain", objectPosition: "left" }}
          />

          <div style={{ width: "64px", height: "3px", background: "#F47B20", borderRadius: "2px", marginTop: "36px", marginBottom: "28px" }} />

          <span style={{ fontSize: "30px", color: "#aaaaaa", fontWeight: 400, lineHeight: 1.4 }}>
            Crafting a space for
          </span>
          <span style={{ fontSize: "42px", color: "#ffffff", fontWeight: 800, lineHeight: 1.25 }}>
            Muslim youth in Ottawa.
          </span>
        </div>

        {/* Bottom: URL */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <span style={{ color: "#555555", fontSize: "20px", letterSpacing: "0.05em" }}>
            {siteHost}
          </span>
        </div>
      </div>
    ),
    size
  );
}
