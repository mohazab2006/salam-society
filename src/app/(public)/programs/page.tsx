import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import ProgramCard from "@/components/ui/ProgramCard";
import EventsFilter from "@/components/ui/EventsFilter";
import type { AudienceCategory, Program } from "@/lib/types";

export const metadata: Metadata = {
  title: "Programs",
  description: "Explore ongoing programs at Salam Society — for brothers, sisters, youth, and families in Ottawa.",
};

export const revalidate = 60;

const fallbackPrograms: Program[] = [
  {
    id: "1",
    title: "Youth Halaqa",
    slug: "youth-halaqa",
    description: "A weekly gathering for Muslim youth to connect, learn, and grow together through Islamic knowledge and meaningful discussions.",
    audience_category: "everyone",
    age_group: "13–18",
    schedule: "Every Friday, 6:00 PM – 8:00 PM",
    location: "Ottawa Islamic Centre",
    signup_required: false,
    signup_link: null,
    image_url: null,
    featured: true,
    published: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Sisters Circle",
    slug: "sisters-circle",
    description: "A safe, welcoming space for sisters to connect, support one another, and deepen their faith through sisterhood and shared experiences.",
    audience_category: "sisters",
    age_group: "18+",
    schedule: "Every Sunday, 11:00 AM – 1:00 PM",
    location: "Ottawa Community Centre",
    signup_required: false,
    signup_link: null,
    image_url: null,
    featured: true,
    published: true,
    sort_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Brothers Basketball",
    slug: "brothers-basketball",
    description: "Weekly basketball sessions for brothers — stay active, bond with the community, and build brotherhood in a fun and healthy environment.",
    audience_category: "brothers",
    age_group: "16+",
    schedule: "Saturdays, 7:00 PM – 9:00 PM",
    location: "Nepean Sportsplex, Ottawa",
    signup_required: false,
    signup_link: null,
    image_url: null,
    featured: true,
    published: true,
    sort_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

async function getPrograms(category?: AudienceCategory) {
  try {
    const supabase = await createClient();
    let query = supabase
      .from("programs")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true });
    if (category) query = query.eq("audience_category", category);
    const { data } = await query;
    return data ?? fallbackPrograms;
  } catch {
    return fallbackPrograms;
  }
}

interface Props {
  searchParams: Promise<{ category?: string }>;
}

export default async function ProgramsPage({ searchParams }: Props) {
  const params = await searchParams;
  const validCategories: AudienceCategory[] = ["brothers", "sisters", "everyone"];
  const category = validCategories.includes(params.category as AudienceCategory)
    ? (params.category as AudienceCategory)
    : undefined;

  const programs = await getPrograms(category);

  return (
    <div className="pt-20">
      {/* Hero banner */}
      <div className="bg-[#0f0f0f] py-16 md:py-20">
        <div className="container-custom text-center">
          <span className="section-label text-orange-brand mb-4 justify-center block">
            <span className="w-6 h-0.5 bg-orange-brand rounded-full inline-block" />
            Salam Society Programs
          </span>
          <h1
            className="font-extrabold text-white leading-tight mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Programs for{" "}
            <span className="text-orange-brand">every member</span>{" "}
            of the community
          </h1>
          <p className="text-white/50 text-base md:text-lg max-w-md mx-auto">
            Ongoing programs for brothers, sisters, youth, and families — built to educate, connect, and inspire.
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
              <p className="text-xl font-600 text-gray-700">No programs found.</p>
              <p className="text-gray-400 text-sm mt-2">
                {category ? `No programs for ${category} right now.` : "Programs will appear here soon."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {programs.map((program, i) => (
                <ProgramCard key={program.id} program={program} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
