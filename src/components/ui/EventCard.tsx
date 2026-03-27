"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import CategoryBadge from "./CategoryBadge";
import type { Event } from "@/lib/types";

interface Props {
  event: Event;
  index?: number;
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-CA", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

function formatTime(timeStr: string | null) {
  if (!timeStr) return null;
  const [h, m] = timeStr.split(":");
  const hour = parseInt(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${m} ${ampm}`;
}

export default function EventCard({ event, index = 0 }: Props) {
  return (
    <motion.article
      className="card group flex flex-col h-full"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 flex-shrink-0">
        {event.image_url ? (
          <Image
            src={event.image_url}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
            <span className="text-4xl">🗓️</span>
          </div>
        )}

        {/* Category badge overlay */}
        <div className="absolute top-3 left-3">
          <CategoryBadge category={event.audience_category} />
        </div>

        {/* Featured badge */}
        {event.featured && (
          <div className="absolute top-3 right-3">
            <span className="badge badge-orange">Featured</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Date + time */}
        <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-gray-500">
          <span className="flex items-center gap-1.5 font-500">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="text-orange-brand flex-shrink-0">
              <rect x="1" y="2" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M4 1v2M9 1v2M1 5h11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            {formatDate(event.date)}
          </span>
          {event.start_time && (
            <span className="flex items-center gap-1.5 font-500">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="text-orange-brand flex-shrink-0">
                <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M6.5 4v2.5l1.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              {formatTime(event.start_time)}{event.end_time ? ` – ${formatTime(event.end_time)}` : ""}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-gray-900 font-700 text-lg leading-snug mb-2 group-hover:text-orange-brand transition-colors">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4 line-clamp-3">
          {event.description}
        </p>

        {/* Meta */}
        <div className="flex flex-wrap gap-2 mb-5 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1C4.067 1 2.5 2.567 2.5 4.5 2.5 7.125 6 11 6 11s3.5-3.875 3.5-6.5C9.5 2.567 7.933 1 6 1zm0 4.75a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z" fill="currentColor"/>
            </svg>
            {event.location}
          </span>
          {event.age_group && (
            <span className="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.1"/>
                <path d="M1.5 10.5c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
              </svg>
              Ages {event.age_group}
            </span>
          )}
        </div>

        {/* CTA */}
        <div className="mt-auto">
          {event.signup_required && event.signup_link ? (
            <a
              href={event.signup_link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-orange w-full text-sm py-2.5 justify-center"
            >
              Register Now
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2.5 bg-green-50 text-green-700 rounded-full text-sm font-600 w-full justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M4.5 7l2 2 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Open to All — No Registration
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
