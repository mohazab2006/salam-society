import { cookies } from "next/headers";
import type { Locale } from "@/lib/i18n";

export async function getLocaleServer(): Promise<Locale> {
  const cookieStore = await cookies();
  return cookieStore.get("locale")?.value === "fr" ? "fr" : "en";
}
