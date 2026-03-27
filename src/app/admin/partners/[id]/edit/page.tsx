import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/server";
import PartnerForm from "@/components/admin/PartnerForm";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Edit Partner" };

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPartnerPage({ params }: Props) {
  const { id } = await params;

  try {
    const supabase = createAdminClient();
    const { data: partner } = await supabase.from("partners").select("*").eq("id", id).single();
    if (!partner) notFound();

    return (
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-700 text-gray-900">Edit Partner</h1>
          <p className="text-gray-500 text-sm mt-1">{partner.name}</p>
        </div>
        <PartnerForm partner={partner} />
      </div>
    );
  } catch {
    notFound();
  }
}
