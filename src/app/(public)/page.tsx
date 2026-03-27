import Hero from "@/components/home/Hero";
import ProgramsSection from "@/components/home/ProgramsSection";
import EventsSection from "@/components/home/EventsSection";
import MomentsSection from "@/components/home/MomentsSection";
import PodcastSection from "@/components/home/PodcastSection";
import ImpactSection from "@/components/home/ImpactSection";
import PartnersSection from "@/components/home/PartnersSection";
import AboutSection from "@/components/home/AboutSection";
import ContactSection from "@/components/home/ContactSection";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60;

const EMPTY = { events: [], programs: [], media: [], partners: [], initiatives: [] };

async function getData() {
  // Hard timeout — if Supabase takes more than 4s, bail and show the page immediately
  const timeout = new Promise<typeof EMPTY>((resolve) =>
    setTimeout(() => resolve(EMPTY), 4000)
  );

  const fetch = async () => {
    try {
      const supabase = await createClient();
      const today = new Date().toISOString().split("T")[0];

      const [eventsRes, programsRes, mediaRes, partnersRes, initiativesRes] =
        await Promise.all([
          supabase
            .from("events")
            .select("*")
            .eq("published", true)
            .gte("date", today)
            .order("date", { ascending: true })
            .limit(3),
          supabase
            .from("programs")
            .select("*")
            .eq("published", true)
            .order("sort_order", { ascending: true })
            .limit(3),
          supabase
            .from("media")
            .select("*")
            .eq("published", true)
            .order("sort_order", { ascending: true })
            .limit(9),
          supabase
            .from("partners")
            .select("*")
            .eq("published", true)
            .order("sort_order", { ascending: true }),
          supabase
            .from("initiatives")
            .select("*")
            .eq("published", true)
            .order("sort_order", { ascending: true })
            .limit(3),
        ]);

      return {
        events: eventsRes.data ?? [],
        programs: programsRes.data ?? [],
        media: mediaRes.data ?? [],
        partners: partnersRes.data ?? [],
        initiatives: initiativesRes.data ?? [],
      };
    } catch {
      return EMPTY;
    }
  };

  return Promise.race([fetch(), timeout]);
}

export default async function HomePage() {
  const { events, programs, media, partners, initiatives } = await getData();

  return (
    <>
      <Hero />
      <ProgramsSection programs={programs} />
      <EventsSection events={events} />
      <MomentsSection media={media} />
      <PodcastSection />
      <ImpactSection initiatives={initiatives} />
      <PartnersSection partners={partners} />
      <AboutSection />
      <ContactSection />
    </>
  );
}
