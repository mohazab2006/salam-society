import { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/server";
import Link from "next/link";
import AdminEventActions from "@/components/admin/AdminEventActions";
import type { Partner } from "@/lib/types";

export const metadata: Metadata = { title: "Manage Partners" };

async function getPartners(): Promise<Partner[]> {
  try {
    const supabase = await createAdminClient();
    const { data } = await supabase.from("partners").select("*").order("sort_order", { ascending: true });
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function AdminPartnersPage() {
  const partners = await getPartners();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-700 text-gray-900">Community Partners</h1>
          <p className="text-gray-500 text-sm mt-1">{partners.length} partners</p>
        </div>
        <Link href="/admin/partners/new" className="btn-orange">+ Add Partner</Link>
      </div>

      {partners.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-soft border border-gray-100">
          <p className="text-4xl mb-3">🤝</p>
          <p className="text-gray-600 font-600">No partners yet</p>
          <p className="text-gray-400 text-sm mt-1 mb-5">Add mosques and organizations you work with.</p>
          <Link href="/admin/partners/new" className="btn-orange">+ Add Partner</Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 text-gray-500 font-600 text-xs uppercase tracking-wide">Partner</th>
                <th className="text-left px-5 py-3 text-gray-500 font-600 text-xs uppercase tracking-wide hidden md:table-cell">Category</th>
                <th className="text-left px-5 py-3 text-gray-500 font-600 text-xs uppercase tracking-wide">Status</th>
                <th className="text-right px-5 py-3 text-gray-500 font-600 text-xs uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {partners.map((partner) => (
                <tr key={partner.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={partner.logo_url} alt={partner.name} className="w-10 h-10 object-contain rounded-lg bg-gray-100 p-1" />
                      <div>
                        <p className="font-600 text-gray-900">{partner.name}</p>
                        {partner.website_url && (
                          <a href={partner.website_url} target="_blank" rel="noopener noreferrer" className="text-xs text-orange-brand hover:underline">
                            Visit website
                          </a>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-600 hidden md:table-cell capitalize">{partner.category ?? "—"}</td>
                  <td className="px-5 py-4">
                    <span className={`badge ${partner.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {partner.published ? "Visible" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <AdminEventActions id={partner.id} table="partners" />
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
