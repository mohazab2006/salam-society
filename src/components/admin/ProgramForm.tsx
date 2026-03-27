"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/admin/ImageUpload";
import { upsertProgram } from "@/lib/actions";
import type { Program, AudienceCategory } from "@/lib/types";

interface Props {
  program?: Program;
}

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function ProgramForm({ program }: Props) {
  const isEdit = !!program;
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: program?.title ?? "",
    slug: program?.slug ?? "",
    description: program?.description ?? "",
    audience_category: program?.audience_category ?? ("everyone" as AudienceCategory),
    age_group: program?.age_group ?? "",
    schedule: program?.schedule ?? "",
    location: program?.location ?? "",
    end_date: program?.end_date ?? "",
    signup_required: program?.signup_required ?? false,
    signup_link: program?.signup_link ?? "",
    image_url: program?.image_url ?? "",
    featured: program?.featured ?? false,
    published: program?.published ?? true,
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "title" && !isEdit ? { slug: slugify(value) } : {}),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = {
      ...form,
      age_group: form.age_group || null,
      end_date: form.end_date || null,
      signup_link: form.signup_link || null,
      image_url: form.image_url || null,
    };

    try {
      await upsertProgram(payload, isEdit ? program!.id : undefined);
      router.push("/admin/programs");
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
      <div className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100 space-y-4">
        <h2 className="font-600 text-gray-900">Basic Info</h2>
        <div>
          <label className={labelClass}>Title *</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Program title"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Slug</label>
          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            required
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
            rows={5}
            placeholder="Describe the program…"
            className={inputClass}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100 space-y-4">
        <h2 className="font-600 text-gray-900">Audience</h2>
        <div>
          <label className={labelClass}>Who is this for? *</label>
          <select
            name="audience_category"
            value={form.audience_category}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="everyone">Everyone</option>
            <option value="brothers">Brothers</option>
            <option value="sisters">Sisters</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Age Group (optional)</label>
          <input
            name="age_group"
            value={form.age_group}
            onChange={handleChange}
            placeholder="e.g. 13–18, Adults, All ages"
            className={inputClass}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100 space-y-4">
        <h2 className="font-600 text-gray-900">Schedule & Location</h2>
        <div>
          <label className={labelClass}>Schedule *</label>
          <input
            name="schedule"
            value={form.schedule}
            onChange={handleChange}
            required
            placeholder="e.g. Every Friday, 6:00 PM – 8:00 PM"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Location *</label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            placeholder="Venue name, Ottawa, ON"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>End Date (optional)</label>
          <input
            name="end_date"
            value={form.end_date}
            onChange={handleChange}
            type="date"
            className={inputClass}
          />
          <p className="text-xs text-gray-400 mt-1">
            Leave blank for recurring/ongoing programs. Once this date passes the program moves to "Past Programs" automatically.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100 space-y-4">
        <h2 className="font-600 text-gray-900">Registration</h2>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="signup_required"
            checked={form.signup_required}
            onChange={handleChange}
            className="w-4 h-4 accent-orange-brand"
          />
          <span className="text-sm font-500 text-gray-700">Registration is required</span>
        </label>
        {form.signup_required && (
          <div>
            <label className={labelClass}>Registration Link</label>
            <input
              name="signup_link"
              value={form.signup_link}
              onChange={handleChange}
              type="url"
              placeholder="https://…"
              className={inputClass}
            />
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100 space-y-4">
        <h2 className="font-600 text-gray-900">Image & Visibility</h2>
        <div>
          <label className={labelClass}>Program Image (optional)</label>
          <ImageUpload
            value={form.image_url}
            onChange={(url) => setForm((p) => ({ ...p, image_url: url }))}
          />
        </div>
        <div className="flex flex-col gap-3 pt-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
              className="w-4 h-4 accent-orange-brand"
            />
            <span className="text-sm font-500 text-gray-700">Feature on homepage</span>
          </label>
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
          {saving ? "Saving…" : isEdit ? "Update Program" : "Publish Program"}
        </button>
        <button type="button" onClick={() => router.back()} className="btn-outline">
          Cancel
        </button>
      </div>
    </form>
  );
}
