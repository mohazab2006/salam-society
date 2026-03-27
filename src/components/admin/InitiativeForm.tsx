"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/admin/ImageUpload";
import { upsertInitiative } from "@/lib/actions";
import type { Initiative } from "@/lib/types";

interface Props {
  initiative?: Initiative;
}

export default function InitiativeForm({ initiative }: Props) {
  const isEdit = !!initiative;
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: initiative?.title ?? "",
    description: initiative?.description ?? "",
    status: initiative?.status ?? ("active" as Initiative["status"]),
    date: initiative?.date ?? "",
    link_url: initiative?.link_url ?? "",
    link_label: initiative?.link_label ?? "",
    image_url: initiative?.image_url ?? "",
    sort_order: initiative?.sort_order ?? 0,
    published: initiative?.published ?? true,
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : name === "sort_order" ? Number(value) : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = {
      ...form,
      date: form.date || null,
      link_url: form.link_url || null,
      link_label: form.link_label || null,
      image_url: form.image_url || null,
    };

    try {
      await upsertInitiative(payload, isEdit ? initiative!.id : undefined);
      router.push("/admin/initiatives");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSaving(false);
    }
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-brand/30 focus:border-orange-brand transition-colors placeholder:text-gray-400";
  const labelClass = "block text-sm font-600 text-gray-700 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {/* Basic Info */}
      <div className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100 space-y-4">
        <h2 className="font-600 text-gray-900">Basic Info</h2>
        <div>
          <label className={labelClass}>Title *</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Initiative title"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Description *</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Describe this initiative…"
            className={inputClass}
          />
        </div>
      </div>

      {/* Status & Date */}
      <div className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100 space-y-4">
        <h2 className="font-600 text-gray-900">Status & Date</h2>
        <div>
          <label className={labelClass}>Status *</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="active">Active</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Date (optional)</label>
          <input
            name="date"
            value={form.date}
            onChange={handleChange}
            type="date"
            className={inputClass}
          />
          <p className="text-xs text-gray-400 mt-1">
            Used to show when this initiative started or is planned.
          </p>
        </div>
        <div>
          <label className={labelClass}>Action Link (optional)</label>
          <input
            name="link_url"
            value={form.link_url}
            onChange={handleChange}
            type="url"
            placeholder="https://nzf.io/winter-ottawa"
            className={inputClass}
          />
          <p className="text-xs text-gray-400 mt-1">Donation page, sign-up form, or any external URL.</p>
        </div>
        <div>
          <label className={labelClass}>Button Label (optional)</label>
          <input
            name="link_label"
            value={form.link_label}
            onChange={handleChange}
            placeholder="e.g. Donate Now, Sign Up, Learn More"
            className={inputClass}
          />
        </div>
      </div>

      {/* Image & Visibility */}
      <div className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100 space-y-4">
        <h2 className="font-600 text-gray-900">Image & Visibility</h2>
        <div>
          <label className={labelClass}>Initiative Image (optional)</label>
          <ImageUpload
            value={form.image_url}
            onChange={(url) => setForm((p) => ({ ...p, image_url: url }))}
          />
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
          <p className="text-xs text-gray-400 mt-1">Lower numbers appear first.</p>
        </div>
        <label className="flex items-center gap-3 cursor-pointer pt-1">
          <input
            type="checkbox"
            name="published"
            checked={form.published}
            onChange={handleChange}
            className="w-4 h-4 accent-orange-brand"
          />
          <span className="text-sm font-500 text-gray-700">Published</span>
        </label>
      </div>

      {error && (
        <p className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-xl">{error}</p>
      )}

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="btn-orange disabled:opacity-60">
          {saving ? "Saving…" : isEdit ? "Update Initiative" : "Publish Initiative"}
        </button>
        <button type="button" onClick={() => router.back()} className="btn-outline">
          Cancel
        </button>
      </div>
    </form>
  );
}
