"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/admin/ImageUpload";
import { upsertEvent } from "@/lib/actions";
import type { Event, AudienceCategory } from "@/lib/types";

interface Props {
  event?: Event;
}

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function EventForm({ event }: Props) {
  const isEdit = !!event;
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: event?.title ?? "",
    slug: event?.slug ?? "",
    description: event?.description ?? "",
    audience_category: event?.audience_category ?? ("everyone" as AudienceCategory),
    age_group: event?.age_group ?? "",
    date: event?.date ?? "",
    start_time: event?.start_time ?? "",
    end_time: event?.end_time ?? "",
    location: event?.location ?? "",
    signup_required: event?.signup_required ?? false,
    signup_link: event?.signup_link ?? "",
    image_url: event?.image_url ?? "",
    featured: event?.featured ?? false,
    published: event?.published ?? true,
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
      start_time: form.start_time || null,
      end_time: form.end_time || null,
      signup_link: form.signup_link || null,
      image_url: form.image_url || null,
    };

    try {
      await upsertEvent(payload, isEdit ? event!.id : undefined);
      router.push("/admin/events");
      router.refresh();
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
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
        <h2 className="font-600 text-gray-900 mb-2">Basic Info</h2>

        <div>
          <label className={labelClass}>Title *</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Event title"
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
            placeholder="event-slug"
            className={inputClass}
          />
          <p className="text-xs text-gray-400 mt-1">URL: /events/{form.slug || "…"}</p>
        </div>

        <div>
          <label className={labelClass}>Description *</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={5}
            placeholder="Describe the event…"
            className={inputClass}
          />
        </div>
      </div>

      {/* Audience */}
      <div className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100 space-y-4">
        <h2 className="font-600 text-gray-900 mb-2">Audience</h2>

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
            placeholder="e.g. 6–11, 13+, All ages"
            className={inputClass}
          />
        </div>
      </div>

      {/* Date & Location */}
      <div className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100 space-y-4">
        <h2 className="font-600 text-gray-900 mb-2">Date & Location</h2>

        <div>
          <label className={labelClass}>Date *</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Start Time</label>
            <input
              type="time"
              name="start_time"
              value={form.start_time}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>End Time</label>
            <input
              type="time"
              name="end_time"
              value={form.end_time}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
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
      </div>

      {/* Registration */}
      <div className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100 space-y-4">
        <h2 className="font-600 text-gray-900 mb-2">Registration</h2>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="signup_required"
            checked={form.signup_required}
            onChange={handleChange}
            className="w-4 h-4 rounded border-gray-300 accent-orange-brand"
          />
          <span className="text-sm font-500 text-gray-700">Registration is required</span>
        </label>

        {form.signup_required && (
          <div>
            <label className={labelClass}>Registration Link *</label>
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

      {/* Image & Visibility */}
      <div className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100 space-y-4">
        <h2 className="font-600 text-gray-900 mb-2">Image & Visibility</h2>

        <div>
          <label className={labelClass}>Event Image (optional)</label>
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
              className="w-4 h-4 rounded border-gray-300 accent-orange-brand"
            />
            <span className="text-sm font-500 text-gray-700">Feature on homepage</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="published"
              checked={form.published}
              onChange={handleChange}
              className="w-4 h-4 rounded border-gray-300 accent-orange-brand"
            />
            <span className="text-sm font-500 text-gray-700">Published (visible on website)</span>
          </label>
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-xl">{error}</p>
      )}

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="btn-orange disabled:opacity-60">
          {saving ? "Saving…" : isEdit ? "Update Event" : "Publish Event"}
        </button>
        <button type="button" onClick={() => router.back()} className="btn-outline">
          Cancel
        </button>
      </div>
    </form>
  );
}
