import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/server";
import MediaForm from "@/components/admin/MediaForm";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Edit Media" };

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditMediaPage({ params }: Props) {
  const { id } = await params;

  try {
    const supabase = createAdminClient();
    const { data: item } = await supabase.from("media").select("*").eq("id", id).single();
    if (!item) notFound();

    return (
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-700 text-gray-900">Edit Media</h1>
          <p className="text-gray-500 text-sm mt-1">{item.title || item.caption || "Media item"}</p>
        </div>
        <MediaForm media={item} />
      </div>
    );
  } catch {
    notFound();
  }
}
