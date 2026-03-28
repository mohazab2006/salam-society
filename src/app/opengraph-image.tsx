import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getRequestSiteOrigin } from "@/lib/request-site-origin";

export const alt = "Salam Society — Muslim Community in Ottawa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default async function OgImage() {
  const logoBuffer = await readFile(join(process.cwd(), "public/images/clear-logo.png"));
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;
  const siteHost = new URL(await getRequestSiteOrigin()).host;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          background: "#ffffff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "56px 72px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "28px",
            flex: 1,
          }}
        >
          <span
            style={{
              color: "#F47B20",
              fontSize: "20px",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            Ottawa, Ontario
          </span>
          <img
            src={logoSrc}
            alt=""
            width={560}
            height={220}
            style={{ objectFit: "contain" }}
          />
          <span
            style={{
              color: "#1f2937",
              fontSize: "30px",
              fontWeight: 600,
              textAlign: "center",
              lineHeight: 1.35,
              maxWidth: "920px",
            }}
          >
            Muslim community — events, programs & youth initiatives
          </span>
        </div>
        <span
          style={{
            position: "absolute",
            bottom: "40px",
            right: "56px",
            color: "#9ca3af",
            fontSize: "18px",
            letterSpacing: "0.06em",
          }}
        >
          {siteHost}
        </span>
      </div>
    ),
    size
  );
}
