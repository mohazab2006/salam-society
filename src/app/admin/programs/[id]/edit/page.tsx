import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/server";
import ProgramForm from "@/components/admin/ProgramForm";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Edit Program" };

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProgramPage({ params }: Props) {
  const { id } = await params;

  try {
    const supabase = createAdminClient();
    const { data: program } = await supabase.from("programs").select("*").eq("id", id).single();
    if (!program) notFound();

    return (
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-700 text-gray-900">Edit Program</h1>
          <p className="text-gray-500 text-sm mt-1">{program.title}</p>
        </div>
        <ProgramForm program={program} />
      </div>
    );
  } catch {
    notFound();
  }
}
