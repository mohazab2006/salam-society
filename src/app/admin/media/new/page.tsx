"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function NewMediaPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    type: "image",
    title: "",
    caption: "",
    file_url: "",
    thumbnail_url: "",
    featured: false,
    published: true,
    sort_order: 0,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const supabase = createClient();
    const payload = {
      ...form,
      title: form.title || null,
      thumbnail_url: form.thumbnail_url || null,
      sort_order: Number(form.sort_order),
    };
    const { error: err } = await supabase.from("media").insert(payload);
    if (err) { setError(err.message); setSaving(false); return; }
    router.push("/admin/media");
    router.refresh();
  }

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-brand/30 focus:border-orange-brand transition-colors placeholder:text-gray-400";
  const labelClass = "block text-sm font-600 text-gray-700 mb-1.5";

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-700 text-gray-900">Add Media</h1>
        <p className="text-gray-500 text-sm mt-1">Add a photo or video to the Moments section.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100 space-y-4">
          <div>
            <label className={labelClass}>Type *</label>
            <select name="type" value={form.type} onChange={handleChange} className={inputClass}>
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>File URL * {form.type === "video" ? "(YouTube, Vimeo, or direct URL)" : "(image URL)"}</label>
            <input name="file_url" value={form.file_url} onChange={handleChange} required type="url" placeholder="https://..." className={inputClass} />
          </div>
          {form.type === "video" && (
            <div>
              <label className={labelClass}>Thumbnail Image URL</label>
              <input name="thumbnail_url" value={form.thumbnail_url} onChange={handleChange} type="url" placeholder="https://... (poster image for video)" className={inputClass} />
            </div>
          )}
          <div>
            <label className={labelClass}>Caption (optional)</label>
            <textarea name="caption" value={form.caption} onChange={handleChange} rows={2} placeholder="Brief caption..." className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Title (optional)</label>
            <input name="title" value={form.title} onChange={handleChange} placeholder="Internal title" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Sort Order</label>
            <input name="sort_order" value={form.sort_order} onChange={handleChange} type="number" min={0} className={inputClass} />
            <p className="text-xs text-gray-400 mt-1">Lower numbers appear first</p>
          </div>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="w-4 h-4 accent-orange-brand" />
              <span className="text-sm font-500 text-gray-700">Featured</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" name="published" checked={form.published} onChange={handleChange} className="w-4 h-4 accent-orange-brand" />
              <span className="text-sm font-500 text-gray-700">Published</span>
            </label>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-xl">{error}</p>}

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="btn-orange disabled:opacity-60">
            {saving ? "Saving..." : "Add Media"}
          </button>
          <button type="button" onClick={() => router.back()} className="btn-outline">Cancel</button>
        </div>
      </form>
    </div>
  );
}
