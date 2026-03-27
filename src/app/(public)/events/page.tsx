import { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/server";
import EventCard from "@/components/ui/EventCard";
import EventsFilter from "@/components/ui/EventsFilter";
import type { AudienceCategory, Event } from "@/lib/types";
import { getLocaleServer } from "@/lib/locale-server";
import { getT } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Events",
  description: "Browse upcoming events from Salam Society — for brothers, sisters, youth, and the whole community in Ottawa.",
};

export const dynamic = "force-dynamic";

async function getEvents(category?: AudienceCategory) {
  try {
    const supabase = createAdminClient();
    let query = supabase
      .from("events")
      .select("*")
      .eq("published", true)
      .order("date", { ascending: true });

    if (category) query = query.eq("audience_category", category);

    const { data } = await query;
    return data ?? [];
  } catch {
    return [];
  }
}

interface Props {
  searchParams: Promise<{ category?: string }>;
}

export default async function EventsPage({ searchParams }: Props) {
  const [params, locale] = await Promise.all([searchParams, getLocaleServer()]);
  const t = getT(locale);
  const ep = t.eventsPage;

  const validCategories: AudienceCategory[] = ["brothers", "sisters", "everyone"];
  const category = validCategories.includes(params.category as AudienceCategory)
    ? (params.category as AudienceCategory)
    : undefined;

  const events = await getEvents(category);
  const today = new Date().toISOString().split("T")[0];
  const upcoming = events.filter((e) => e.date >= today);
  const past = events.filter((e) => e.date < today);

  return (
    <div className="pt-20">
      {/* Hero banner */}
      <div className="bg-[#0f0f0f] py-16 md:py-20">
        <div className="container-custom text-center">
          <span className="section-label text-orange-brand mb-4 justify-center block">
            <span className="w-6 h-0.5 bg-orange-brand rounded-full inline-block" />
            {ep.label}
          </span>
          <h1
            className="font-extrabold text-white leading-tight mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            {ep.heading}{" "}
            <span className="text-orange-brand">{ep.headingHighlight}</span>
          </h1>
          <p className="text-white/50 text-base md:text-lg max-w-md mx-auto">
            {ep.subtext}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="section-padding bg-gray-50">
        <div className="container-custom">
          {/* Filter */}
          <EventsFilter activeCategory={category} />

          {/* Upcoming events */}
          {upcoming.length > 0 ? (
            <>
              <h2 className="text-xl font-700 text-gray-900 mb-6 mt-8">
                {ep.upcomingEvents}
                <span className="ml-2 badge badge-orange">{upcoming.length}</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {upcoming.map((event, i) => (
                  <EventCard key={event.id} event={event} index={i} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">🗓️</p>
              <p className="text-xl font-600 text-gray-700">{ep.noUpcoming}</p>
              <p className="text-gray-400 text-sm mt-2">
                {category ? ep.noUpcomingFor(category) : ep.checkBack}
              </p>
            </div>
          )}

          {/* Past events */}
          {past.length > 0 && (
            <>
              <h2 className="text-xl font-700 text-gray-500 mb-6 mt-4">{ep.pastEvents}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-60">
                {past.map((event, i) => (
                  <EventCard key={event.id} event={event} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
