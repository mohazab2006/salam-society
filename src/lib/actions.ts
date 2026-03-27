"use server";

import { createAdminClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// ── Events ───────────────────────────────────────────────────────────────────
export async function upsertEvent(payload: Record<string, unknown>, id?: string) {
  const supabase = createAdminClient();
  const { error } = id
    ? await supabase.from("events").update(payload).eq("id", id)
    : await supabase.from("events").insert(payload);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/events");
  revalidatePath("/events");
  revalidatePath("/");
}

// ── Programs ─────────────────────────────────────────────────────────────────
export async function upsertProgram(payload: Record<string, unknown>, id?: string) {
  const supabase = createAdminClient();
  const { error } = id
    ? await supabase.from("programs").update(payload).eq("id", id)
    : await supabase.from("programs").insert(payload);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/programs");
  revalidatePath("/programs");
  revalidatePath("/");
}

// ── Partners ─────────────────────────────────────────────────────────────────
export async function upsertPartner(payload: Record<string, unknown>, id?: string) {
  const supabase = createAdminClient();
  const { error } = id
    ? await supabase.from("partners").update(payload).eq("id", id)
    : await supabase.from("partners").insert(payload);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/partners");
  revalidatePath("/");
}

// ── Media ────────────────────────────────────────────────────────────────────
export async function upsertMedia(payload: Record<string, unknown>, id?: string) {
  const supabase = createAdminClient();
  const { error } = id
    ? await supabase.from("media").update(payload).eq("id", id)
    : await supabase.from("media").insert(payload);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/media");
  revalidatePath("/");
}

// ── Initiatives ──────────────────────────────────────────────────────────────
export async function upsertInitiative(payload: Record<string, unknown>, id?: string) {
  const supabase = createAdminClient();
  const { error } = id
    ? await supabase.from("initiatives").update(payload).eq("id", id)
    : await supabase.from("initiatives").insert(payload);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/initiatives");
  revalidatePath("/");
}

// ── Generic delete ───────────────────────────────────────────────────────────
export async function deleteRecord(table: string, id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/admin/events");
  revalidatePath("/admin/programs");
  revalidatePath("/admin/media");
  revalidatePath("/admin/partners");
  revalidatePath("/admin/initiatives");
  revalidatePath("/events");
  revalidatePath("/programs");
  revalidatePath("/");
}
