"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

interface Props {
  value: string;
  onChange: (url: string) => void;
  bucket?: string;
}

export default function ImageUpload({ value, onChange, bucket = "uploads" }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"upload" | "url">(value ? "url" : "upload");
  const fileRef = useRef<HTMLInputElement>(null);

  const inputCls =
    "w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-brand/30 focus:border-orange-brand transition-colors placeholder:text-gray-400";

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");

    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadErr } = await supabase.storage
        .from(bucket)
        .upload(path, file, { upsert: false });

      if (uploadErr) throw uploadErr;

      const { data } = supabase.storage.from(bucket).getPublicUrl(path);
      onChange(data.publicUrl);
      setTab("url"); // show URL preview after upload
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed. Make sure the storage bucket exists.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-3">
      {/* Tab switcher */}
      <div className="flex gap-4 border-b border-gray-100 pb-0">
        {(["upload", "url"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`pb-2 text-sm font-600 border-b-2 -mb-px transition-colors ${
              tab === t
                ? "border-orange-brand text-orange-brand"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            {t === "upload" ? "Upload File" : "Paste URL"}
          </button>
        ))}
      </div>

      {tab === "upload" ? (
        <>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="w-full border-2 border-dashed border-gray-200 rounded-xl py-8 flex flex-col items-center gap-2 hover:border-orange-brand/50 hover:bg-orange-50/30 transition-all disabled:opacity-60 cursor-pointer"
          >
            {uploading ? (
              <>
                <div className="w-6 h-6 border-2 border-orange-brand border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-gray-500">Uploading…</span>
              </>
            ) : value ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={value} alt="Current" className="w-24 h-24 object-cover rounded-xl" />
                <span className="text-xs text-gray-400">Click to replace</span>
              </>
            ) : (
              <>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F47B20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                <span className="text-sm font-600 text-gray-700">Click to upload image</span>
                <span className="text-xs text-gray-400">PNG, JPG, WebP — max 5MB</span>
              </>
            )}
          </button>
        </>
      ) : (
        <div className="space-y-3">
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://..."
            className={inputCls}
          />
          {value && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={value} alt="Preview" className="w-24 h-24 object-cover rounded-xl border border-gray-200" onError={(e) => (e.currentTarget.style.display = "none")} />
          )}
        </div>
      )}

      {error && <p className="text-red-500 text-xs bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
    </div>
  );
}
