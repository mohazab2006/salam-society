"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/admin/ImageUpload";
import { upsertPartner } from "@/lib/actions";
import type { Partner } from "@/lib/types";

interface Props {
  partner?: Partner;
}

export default function PartnerForm({ partner }: Props) {
  const router = useRouter();
  const isEditing = !!partner;

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: partner?.name ?? "",
    logo_url: partner?.logo_url ?? "",
    website_url: partner?.website_url ?? "",
    category: partner?.category ?? "mosque",
    sort_order: partner?.sort_order ?? 0,
    published: partner?.published ?? true,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await upsertPartner(
        {
          ...form,
          website_url: form.website_url || null,
          sort_order: Number(form.sort_order),
        },
        isEditing ? partner!.id : undefined
      );
      router.push("/admin/partners");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSaving(false);
    }
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-brand/30 focus:border-orange-brand transition-colors placeholder:text-gray-400";
  const labelClass = "block text-sm font-600 text-gray-700 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100 space-y-4">
        <div>
          <label className={labelClass}>Organization Name *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="e.g. Kanata Muslims"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Logo *</label>
          <ImageUpload
            value={form.logo_url}
            onChange={(url) => setForm((p) => ({ ...p, logo_url: url }))}
          />
        </div>

        <div>
          <label className={labelClass}>Website URL (optional)</label>
          <input
            name="website_url"
            value={form.website_url}
            onChange={handleChange}
            type="url"
            placeholder="https://…"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Type</label>
          <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
            <option value="mosque">Mosque</option>
            <option value="organization">Organization</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Sort Order</label>
          <input
            name="sort_order"
            value={form.sort_order}
            onChange={handleChange}
            type="number"
            min={0}
            className={inputClass}
          />
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="published"
            checked={form.published}
            onChange={handleChange}
            className="w-4 h-4 accent-orange-brand"
          />
          <span className="text-sm font-500 text-gray-700">Visible on website</span>
        </label>
      </div>

      {error && (
        <p className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-xl">{error}</p>
      )}

      <div className="flex gap-3">
        <button type="submit" disabled={saving || !form.logo_url} className="btn-orange disabled:opacity-60">
          {saving ? "Saving…" : isEditing ? "Save Changes" : "Add Partner"}
        </button>
        <button type="button" onClick={() => router.back()} className="btn-outline">
          Cancel
        </button>
      </div>
    </form>
  );
}
