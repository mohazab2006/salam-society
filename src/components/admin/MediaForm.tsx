"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/admin/ImageUpload";
import { upsertMedia } from "@/lib/actions";
import type { Media } from "@/lib/types";

interface Props {
  media?: Media;
}

export default function MediaForm({ media }: Props) {
  const router = useRouter();
  const isEditing = !!media;

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    type: media?.type ?? "image",
    title: media?.title ?? "",
    caption: media?.caption ?? "",
    file_url: media?.file_url ?? "",
    thumbnail_url: media?.thumbnail_url ?? "",

    published: media?.published ?? true,
    sort_order: media?.sort_order ?? 0,
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await upsertMedia(
        {
          ...form,
          title: form.title || null,
          thumbnail_url: form.thumbnail_url || null,
          sort_order: Number(form.sort_order),
        },
        isEditing ? media!.id : undefined
      );
      router.push("/admin/media");
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
          <label className={labelClass}>Type *</label>
          <select name="type" value={form.type} onChange={handleChange} className={inputClass}>
            <option value="image">Image</option>
            <option value="video">Video (YouTube / Vimeo URL)</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>
            {form.type === "image" ? "Image *" : "Video URL *"}
          </label>
          {form.type === "image" ? (
            <ImageUpload
              value={form.file_url}
              onChange={(url) => setForm((p) => ({ ...p, file_url: url }))}
            />
          ) : (
            <input
              name="file_url"
              value={form.file_url}
              onChange={handleChange}
              required
              type="url"
              placeholder="https://youtube.com/watch?v=…"
              className={inputClass}
            />
          )}
        </div>

        {form.type === "video" && (
          <div>
            <label className={labelClass}>Thumbnail Image (optional)</label>
            <ImageUpload
              value={form.thumbnail_url}
              onChange={(url) => setForm((p) => ({ ...p, thumbnail_url: url }))}
            />
          </div>
        )}

        <div>
          <label className={labelClass}>Caption (optional)</label>
          <textarea
            name="caption"
            value={form.caption}
            onChange={handleChange}
            rows={2}
            placeholder="Brief caption…"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Title (optional, internal)</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Internal title"
            className={inputClass}
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
          <p className="text-xs text-gray-400 mt-1">Lower numbers appear first</p>
        </div>

        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-3 cursor-pointer">
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
      </div>

      {error && (
        <p className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-xl">{error}</p>
      )}

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="btn-orange disabled:opacity-60">
          {saving ? "Saving…" : isEditing ? "Save Changes" : "Add Media"}
        </button>
        <button type="button" onClick={() => router.back()} className="btn-outline">
          Cancel
        </button>
      </div>
    </form>
  );
}
