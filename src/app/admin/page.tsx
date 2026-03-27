import { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/server";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Dashboard" };

async function getStats() {
  try {
    const supabase = createAdminClient();
    const today = new Date().toISOString().split("T")[0];

    const [events, programs, media, partners] = await Promise.all([
      supabase.from("events").select("id", { count: "exact" }).eq("published", true),
      supabase.from("programs").select("id", { count: "exact" }).eq("published", true),
      supabase.from("media").select("id", { count: "exact" }).eq("published", true),
      supabase.from("partners").select("id", { count: "exact" }).eq("published", true),
    ]);

    const upcomingEvents = await supabase
      .from("events")
      .select("id", { count: "exact" })
      .eq("published", true)
      .gte("date", today);

    return {
      events: events.count ?? 0,
      programs: programs.count ?? 0,
      media: media.count ?? 0,
      partners: partners.count ?? 0,
      upcomingEvents: upcomingEvents.count ?? 0,
    };
  } catch {
    return { events: 0, programs: 0, media: 0, partners: 0, upcomingEvents: 0 };
  }
}

const quickLinks = [
  { label: "Add Event", href: "/admin/events/new", color: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100" },
  { label: "Add Program", href: "/admin/programs/new", color: "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100" },
  { label: "Upload Media", href: "/admin/media/new", color: "bg-green-50 text-green-700 border-green-200 hover:bg-green-100" },
  { label: "Add Partner", href: "/admin/partners/new", color: "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100" },
];

export default async function AdminDashboard() {
  const stats = await getStats();

  const statCards = [
    { label: "Published Events", value: stats.events, sub: `${stats.upcomingEvents} upcoming`, href: "/admin/events", color: "text-blue-600" },
    { label: "Programs", value: stats.programs, sub: "active programs", href: "/admin/programs", color: "text-purple-600" },
    { label: "Media Items", value: stats.media, sub: "photos & videos", href: "/admin/media", color: "text-green-600" },
    { label: "Partners", value: stats.partners, sub: "organizations & mosques", href: "/admin/partners", color: "text-orange-600" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-700 text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back — here's what's happening on the Salam Society website.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-2xl p-5 shadow-soft hover:shadow-card transition-shadow border border-gray-100"
          >
            <p className={`text-3xl font-800 ${stat.color}`}>{stat.value}</p>
            <p className="text-sm font-600 text-gray-700 mt-1">{stat.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{stat.sub}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100 mb-6">
        <h2 className="text-base font-700 text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-600 border transition-colors ${link.color}`}
            >
              + {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5">
        <h3 className="text-orange-800 font-600 text-sm mb-1">💡 Getting started</h3>
        <p className="text-orange-700 text-sm leading-relaxed">
          Use the sidebar to manage events, programs, media, and partner logos.
          All changes are reflected live on the website within 60 seconds.
        </p>
      </div>
    </div>
  );
}
