import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/server";
import InitiativeForm from "@/components/admin/InitiativeForm";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditInitiativePage({ params }: Props) {
  const { id } = await params;
  const supabase = createAdminClient();
  const { data } = await supabase.from("initiatives").select("*").eq("id", id).single();
  if (!data) notFound();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-700 text-gray-900">Edit Initiative</h1>
        <p className="text-gray-500 text-sm mt-1">Update &ldquo;{data.title}&rdquo;</p>
      </div>
      <InitiativeForm initiative={data} />
    </div>
  );
}
