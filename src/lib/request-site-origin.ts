import { headers } from "next/headers";

/**
 * Site origin for the current HTTP request (Host / X-Forwarded-*).
 * Use in generateMetadata and OG routes so og:image and crawlers always share the same hostname
 * (fixes previews on *.vercel.app vs production domain).
 */
export async function getRequestSiteOrigin(): Promise<string> {
  const h = await headers();
  const hostHeader = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const host = hostHeader.split(",")[0]?.trim() ?? "localhost:3000";
  const protoHeader = h.get("x-forwarded-proto");
  const proto =
    protoHeader?.split(",")[0]?.trim() ??
    (host.startsWith("localhost") || host.startsWith("127.") ? "http" : "https");
  return `${proto}://${host}`.replace(/\/$/, "");
}
