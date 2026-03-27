import { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/server";
import ProgramCard from "@/components/ui/ProgramCard";
import EventsFilter from "@/components/ui/EventsFilter";
import type { AudienceCategory } from "@/lib/types";
import { getLocaleServer } from "@/lib/locale-server";
import { getT } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Programs",
  description: "Explore ongoing programs at Salam Society — for brothers, sisters, youth, and families in Ottawa.",
};

export const dynamic = "force-dynamic";

async function getPrograms(category?: AudienceCategory) {
  try {
    const supabase = createAdminClient();
    let query = supabase
      .from("programs")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true });
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

export default async function ProgramsPage({ searchParams }: Props) {
  const [params, locale] = await Promise.all([searchParams, getLocaleServer()]);
  const t = getT(locale);
  const pp = t.programsPage;

  const validCategories: AudienceCategory[] = ["brothers", "sisters", "everyone"];
  const category = validCategories.includes(params.category as AudienceCategory)
    ? (params.category as AudienceCategory)
    : undefined;

  const programs = await getPrograms(category);
  const today = new Date().toISOString().split("T")[0];
  const active = programs.filter((p) => !p.end_date || p.end_date >= today);
  const past   = programs.filter((p) => p.end_date && p.end_date < today);

  return (
    <div className="pt-20">
      {/* Hero banner */}
      <div className="bg-[#0f0f0f] py-16 md:py-20">
        <div className="container-custom text-center">
          <span className="section-label text-orange-brand mb-4 justify-center block">
            <span className="w-6 h-0.5 bg-orange-brand rounded-full inline-block" />
            {pp.label}
          </span>
          <h1
            className="font-extrabold text-white leading-tight mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            {pp.heading}{" "}
            <span className="text-orange-brand">{pp.headingHighlight}</span>{" "}
            {pp.headingEnd}
          </h1>
          <p className="text-white/50 text-base md:text-lg max-w-md mx-auto">
            {pp.subtext}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="section-padding bg-gray-50">
        <div className="container-custom">
          <EventsFilter activeCategory={category} />

          {programs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">📚</p>
              <p className="text-xl font-600 text-gray-700">{pp.noPrograms}</p>
              <p className="text-gray-400 text-sm mt-2">
                {category ? pp.noProgramsFor(category) : pp.noProgramsSoon}
              </p>
            </div>
          ) : (
            <>
              {active.length > 0 && (
                <div className="mt-8">
                  {past.length > 0 && (
                    <h2 className="text-xl font-700 text-gray-800 mb-6 flex items-center gap-2">
                      {pp.activePrograms}
                      <span className="ml-1 badge badge-orange">{active.length}</span>
                    </h2>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {active.map((program, i) => (
                      <ProgramCard key={program.id} program={program} index={i} />
                    ))}
                  </div>
                </div>
              )}

              {past.length > 0 && (
                <div className="mt-14">
                  <h2 className="text-xl font-700 text-gray-500 mb-6">{pp.pastPrograms}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-60">
                    {past.map((program, i) => (
                      <ProgramCard key={program.id} program={program} index={i} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
