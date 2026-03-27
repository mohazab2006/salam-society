import Hero from "@/components/home/Hero";
import ProgramsSection from "@/components/home/ProgramsSection";
import EventsSection from "@/components/home/EventsSection";
import MomentsSection from "@/components/home/MomentsSection";
import PodcastSection from "@/components/home/PodcastSection";
import ImpactSection from "@/components/home/ImpactSection";
import PartnersSection from "@/components/home/PartnersSection";
import AboutSection from "@/components/home/AboutSection";
import ContactSection from "@/components/home/ContactSection";
import { createAdminClient } from "@/lib/supabase/server";
import type { Event, Program, Media, Partner, Initiative } from "@/lib/types";

export const revalidate = 60;

const EMPTY = { events: [], programs: [], media: [], partners: [], initiatives: [] };

async function getData() {
  // Hard timeout — if Supabase takes more than 4s, bail and show the page immediately
  const timeout = new Promise<typeof EMPTY>((resolve) =>
    setTimeout(() => resolve(EMPTY), 4000)
  );

  const fetch = async () => {
    try {
      const supabase = createAdminClient();
      const today = new Date().toISOString().split("T")[0];

      const [eventsRes, programsRes, mediaRes, partnersRes, initiativesRes] =
        await Promise.all([
          supabase
            .from("events")
            .select("id,title,slug,date,location,image_url,audience_category,start_time,signup_link,signup_required,description")
            .eq("published", true)
            .gte("date", today)
            .order("date", { ascending: true })
            .limit(3),
          supabase
            .from("programs")
            .select("id,title,slug,description,image_url,audience_category,schedule,location,signup_link,signup_required,end_date")
            .eq("published", true)
            .or(`end_date.is.null,end_date.gte.${today}`)
            .order("sort_order", { ascending: true })
            .limit(3),
          supabase
            .from("media")
            .select("id,type,title,caption,file_url,thumbnail_url,sort_order")
            .eq("published", true)
            .order("sort_order", { ascending: true })
            .limit(12),
          supabase
            .from("partners")
            .select("id,name,logo_url,website_url,category")
            .eq("published", true)
            .order("sort_order", { ascending: true }),
          supabase
            .from("initiatives")
            .select("id,title,description,image_url,status,link_url,link_label,date")
            .eq("published", true)
            .order("sort_order", { ascending: true })
            .limit(3),
        ]);

      return {
        events: (eventsRes.data ?? []) as unknown as Event[],
        programs: (programsRes.data ?? []) as unknown as Program[],
        media: (mediaRes.data ?? []) as unknown as Media[],
        partners: (partnersRes.data ?? []) as unknown as Partner[],
        initiatives: (initiativesRes.data ?? []) as unknown as Initiative[],
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
