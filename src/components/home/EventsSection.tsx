import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import EventCard from "@/components/ui/EventCard";
import type { Event } from "@/lib/types";

interface Props {
  events?: Event[];
}

export default function EventsSection({ events }: Props) {
  const displayEvents = events && events.length > 0 ? events.slice(0, 3) : [];

  return (
    <section id="events" className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeader
          label="Events"
          title="What's coming "
          highlight="up next"
          description="Don't miss out — upcoming events for the whole community. From special programs to community gatherings, there's something for everyone."
          align="center"
        />

        {displayEvents.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">🗓️</p>
            <p className="text-lg font-500">No upcoming events right now.</p>
            <p className="text-sm mt-2">Check back soon — we're always planning something!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {displayEvents.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))}
            </div>

            <div className="flex justify-center">
              <Link href="/events" className="btn-outline">
                See All Events
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
