import { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/server";
import Link from "next/link";
import AdminEventActions from "@/components/admin/AdminEventActions";
import type { Media } from "@/lib/types";

export const metadata: Metadata = { title: "Manage Media" };

async function getMedia(): Promise<Media[]> {
  try {
    const supabase = await createAdminClient();
    const { data } = await supabase.from("media").select("*").order("sort_order", { ascending: true });
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function AdminMediaPage() {
  const media = await getMedia();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-700 text-gray-900">Media</h1>
          <p className="text-gray-500 text-sm mt-1">{media.length} media items</p>
        </div>
        <Link href="/admin/media/new" className="btn-orange">+ Add Media</Link>
      </div>

      {media.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-soft border border-gray-100">
          <p className="text-4xl mb-3">📸</p>
          <p className="text-gray-600 font-600">No media yet</p>
          <p className="text-gray-400 text-sm mt-1 mb-5">Add photos and videos for the Moments section.</p>
          <Link href="/admin/media/new" className="btn-orange">+ Add Media</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {media.map((item) => (
            <div key={item.id} className="group bg-white rounded-2xl overflow-hidden shadow-soft border border-gray-100">
              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                {(item.thumbnail_url || item.file_url) && item.type === "image" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.thumbnail_url || item.file_url}
                    alt={item.caption || item.title || "Media item"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-3xl">{item.type === "video" ? "🎬" : "📸"}</span>
                  </div>
                )}
                {!item.published && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="badge bg-gray-800 text-white text-xs">Draft</span>
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-xs font-600 text-gray-700 truncate">{item.caption || item.title || "Untitled"}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="badge badge-orange text-[0.6rem]">{item.type}</span>
                  <AdminEventActions id={item.id} table="media" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
