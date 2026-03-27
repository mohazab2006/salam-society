import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/server";
import AdminEventActions from "@/components/admin/AdminEventActions";

export const dynamic = "force-dynamic";

const statusBadge: Record<string, string> = {
  active:    "bg-green-100 text-green-700",
  upcoming:  "bg-blue-100 text-blue-700",
  completed: "bg-gray-100 text-gray-600",
};

export default async function AdminInitiativesPage() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("initiatives")
    .select("*")
    .order("sort_order", { ascending: true });

  const initiatives = data ?? [];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-700 text-gray-900">Initiatives</h1>
          <p className="text-gray-500 text-sm mt-1">Manage Impact & Initiatives shown on the homepage.</p>
        </div>
        <Link href="/admin/initiatives/new" className="btn-orange">
          + New Initiative
        </Link>
      </div>

      {initiatives.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-soft border border-gray-100">
          <p className="text-5xl mb-4">⭐</p>
          <p className="text-gray-500">No initiatives yet. Add your first one!</p>
          <Link href="/admin/initiatives/new" className="btn-orange mt-6 inline-flex">
            + Add Initiative
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-4 font-600 text-gray-600 uppercase tracking-wide text-xs">Title</th>
                <th className="text-left px-6 py-4 font-600 text-gray-600 uppercase tracking-wide text-xs">Status</th>
                <th className="text-left px-6 py-4 font-600 text-gray-600 uppercase tracking-wide text-xs">Date</th>
                <th className="text-left px-6 py-4 font-600 text-gray-600 uppercase tracking-wide text-xs">Published</th>
                <th className="px-6 py-4 font-600 text-gray-600 uppercase tracking-wide text-xs text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {initiatives.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-600 text-gray-900">{item.title}</p>
                    <p className="text-gray-400 text-xs mt-0.5 line-clamp-1">{item.description}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold capitalize ${statusBadge[item.status] ?? "bg-gray-100 text-gray-600"}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {item.date ? new Date(item.date + "T00:00:00").toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" }) : "—"}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${item.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {item.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <AdminEventActions id={item.id} table="initiatives" />
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
