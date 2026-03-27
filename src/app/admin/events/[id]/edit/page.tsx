import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/server";
import EventForm from "@/components/admin/EventForm";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Edit Event" };

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditEventPage({ params }: Props) {
  const { id } = await params;

  try {
    const supabase = createAdminClient();
    const { data: event } = await supabase.from("events").select("*").eq("id", id).single();
    if (!event) notFound();

    return (
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-700 text-gray-900">Edit Event</h1>
          <p className="text-gray-500 text-sm mt-1">{event.title}</p>
        </div>
        <EventForm event={event} />
      </div>
    );
  } catch {
    notFound();
  }
}
