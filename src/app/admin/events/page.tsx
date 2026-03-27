import { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/server";
import Link from "next/link";
import AdminEventActions from "@/components/admin/AdminEventActions";
import type { Event } from "@/lib/types";

export const metadata: Metadata = { title: "Manage Events" };

async function getEvents(): Promise<Event[]> {
  try {
    const supabase = await createAdminClient();
    const { data } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: false });
    return data ?? [];
  } catch {
    return [];
  }
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" });
}

const audienceColors: Record<string, string> = {
  brothers: "badge-brothers",
  sisters: "badge-sisters",
  everyone: "badge-everyone",
};

export default async function AdminEventsPage() {
  const events = await getEvents();
  const today = new Date().toISOString().split("T")[0];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-700 text-gray-900">Events</h1>
          <p className="text-gray-500 text-sm mt-1">{events.length} events total</p>
        </div>
        <Link href="/admin/events/new" className="btn-orange">
          + Add Event
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-soft border border-gray-100">
          <p className="text-4xl mb-3">🗓️</p>
          <p className="text-gray-600 font-600">No events yet</p>
          <p className="text-gray-400 text-sm mt-1 mb-5">Add your first event to get started.</p>
          <Link href="/admin/events/new" className="btn-orange">+ Add Event</Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 text-gray-500 font-600 text-xs uppercase tracking-wide">Event</th>
                <th className="text-left px-5 py-3 text-gray-500 font-600 text-xs uppercase tracking-wide hidden md:table-cell">Date</th>
                <th className="text-left px-5 py-3 text-gray-500 font-600 text-xs uppercase tracking-wide hidden md:table-cell">Audience</th>
                <th className="text-left px-5 py-3 text-gray-500 font-600 text-xs uppercase tracking-wide">Status</th>
                <th className="text-right px-5 py-3 text-gray-500 font-600 text-xs uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-600 text-gray-900">{event.title}</p>
                    <p className="text-gray-400 text-xs mt-0.5 truncate max-w-[200px]">{event.location}</p>
                  </td>
                  <td className="px-5 py-4 text-gray-600 hidden md:table-cell">
                    <span className={event.date >= today ? "text-gray-800 font-500" : "text-gray-400"}>
                      {formatDate(event.date)}
                    </span>
                    {event.date >= today && (
                      <span className="ml-2 text-xs text-green-600 font-600">Upcoming</span>
                    )}
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className={`badge ${audienceColors[event.audience_category]}`}>
                      {event.audience_category}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`badge ${event.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {event.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <AdminEventActions id={event.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
