/**
 * Public site origin for metadata (og:image, canonical, etc.).
 * - Set NEXT_PUBLIC_SITE_URL in Vercel when using a custom domain (e.g. https://salamsociety.ca).
 * - Otherwise falls back to VERCEL_URL so previews and *.vercel.app deployments resolve OG images on the same host.
 */
export function getSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (explicit) return explicit;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}
