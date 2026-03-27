import { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/server";
import Link from "next/link";
import AdminEventActions from "@/components/admin/AdminEventActions";
import type { Program } from "@/lib/types";

export const metadata: Metadata = { title: "Manage Programs" };

async function getPrograms(): Promise<Program[]> {
  try {
    const supabase = await createAdminClient();
    const { data } = await supabase.from("programs").select("*").order("sort_order", { ascending: true });
    return data ?? [];
  } catch {
    return [];
  }
}

const audienceColors: Record<string, string> = {
  brothers: "badge-brothers",
  sisters: "badge-sisters",
  everyone: "badge-everyone",
};

export default async function AdminProgramsPage() {
  const programs = await getPrograms();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-700 text-gray-900">Programs</h1>
          <p className="text-gray-500 text-sm mt-1">{programs.length} programs total</p>
        </div>
        <Link href="/admin/programs/new" className="btn-orange">+ Add Program</Link>
      </div>

      {programs.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-soft border border-gray-100">
          <p className="text-4xl mb-3">📚</p>
          <p className="text-gray-600 font-600">No programs yet</p>
          <p className="text-gray-400 text-sm mt-1 mb-5">Add your first program to get started.</p>
          <Link href="/admin/programs/new" className="btn-orange">+ Add Program</Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 text-gray-500 font-600 text-xs uppercase tracking-wide">Program</th>
                <th className="text-left px-5 py-3 text-gray-500 font-600 text-xs uppercase tracking-wide hidden md:table-cell">Schedule</th>
                <th className="text-left px-5 py-3 text-gray-500 font-600 text-xs uppercase tracking-wide hidden md:table-cell">Audience</th>
                <th className="text-left px-5 py-3 text-gray-500 font-600 text-xs uppercase tracking-wide">Status</th>
                <th className="text-right px-5 py-3 text-gray-500 font-600 text-xs uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {programs.map((program) => (
                <tr key={program.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-600 text-gray-900">{program.title}</p>
                    <p className="text-gray-400 text-xs mt-0.5 truncate max-w-[200px]">{program.location}</p>
                  </td>
                  <td className="px-5 py-4 text-gray-600 hidden md:table-cell text-xs">{program.schedule}</td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className={`badge ${audienceColors[program.audience_category]}`}>{program.audience_category}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`badge ${program.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {program.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <AdminEventActions id={program.id} table="programs" />
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
