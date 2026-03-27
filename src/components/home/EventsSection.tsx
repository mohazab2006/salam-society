"use client";

import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import EventCard from "@/components/ui/EventCard";
import { useLocale } from "@/components/providers/LocaleProvider";
import type { Event } from "@/lib/types";

interface Props {
  events?: Event[];
}

export default function EventsSection({ events }: Props) {
  const { t } = useLocale();
  const e = t.events;
  const displayEvents = events && events.length > 0 ? events.slice(0, 3) : [];

  return (
    <section id="events" className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeader
          label={e.label}
          title={e.title}
          highlight={e.highlight}
          description={e.description}
          align="center"
        />

        {displayEvents.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">🗓️</p>
            <p className="text-lg font-500">{e.noEvents}</p>
            <p className="text-sm mt-2">{e.checkBack}</p>
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
                {e.seeAll}
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
