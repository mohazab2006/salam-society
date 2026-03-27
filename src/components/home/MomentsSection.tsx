"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { Media } from "@/lib/types";

interface Props {
  media?: Media[];
}

// Placeholder layout structure for empty state
const placeholderItems = [
  { id: "1", aspect: "aspect-square" },
  { id: "2", aspect: "aspect-[4/5]" },
  { id: "3", aspect: "aspect-square" },
  { id: "4", aspect: "aspect-[3/4]" },
  { id: "5", aspect: "aspect-square" },
  { id: "6", aspect: "aspect-[4/5]" },
];

function VideoModal({ url, onClose }: { url: string; onClose: () => void }) {
  // Convert YouTube watch URL to embed
  const embedUrl = url
    .replace("watch?v=", "embed/")
    .replace("youtu.be/", "www.youtube.com/embed/")
    .split("?")[0];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-3xl mx-4 aspect-video rounded-2xl overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <iframe
            src={`${embedUrl}?autoplay=1`}
            className="w-full h-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </motion.div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          ✕
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

function MediaItem({ item, index }: { item: Media; index: number }) {
  const [videoOpen, setVideoOpen] = useState(false);

  const aspectMap: Record<number, string> = {
    0: "row-span-1",
    1: "row-span-2",
    2: "row-span-1",
    3: "row-span-1",
    4: "row-span-2",
    5: "row-span-1",
  };

  return (
    <>
      <motion.div
        className={`relative overflow-hidden rounded-2xl bg-gray-100 cursor-pointer group ${aspectMap[index % 6] || ""}`}
        style={{ minHeight: "200px" }}
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ delay: index * 0.06, duration: 0.5 }}
        onClick={() => item.type === "video" && setVideoOpen(true)}
      >
        {item.thumbnail_url || item.file_url ? (
          <Image
            src={item.thumbnail_url || item.file_url}
            alt={item.caption || item.title || "Salam Society moment"}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 img-shimmer" />
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />

        {/* Video play icon */}
        {item.type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none" className="ml-1">
                <path d="M1.5 2.5l15 7.5-15 7.5V2.5z" fill="#F47B20"/>
              </svg>
            </div>
          </div>
        )}

        {/* Caption on hover */}
        {item.caption && (
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <p className="text-white text-xs font-500 line-clamp-2">{item.caption}</p>
          </div>
        )}
      </motion.div>

      {videoOpen && item.type === "video" && (
        <VideoModal url={item.file_url} onClose={() => setVideoOpen(false)} />
      )}
    </>
  );
}

export default function MomentsSection({ media }: Props) {
  const hasMedia = media && media.length > 0;

  return (
    <section id="moments" className="section-padding bg-[#0f0f0f]">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="section-label text-orange-brand mb-3 block">
              <span className="w-6 h-0.5 bg-orange-brand rounded-full inline-block" />
              Community Moments
            </span>
            <h2
              className="font-extrabold text-white leading-tight"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
            >
              Real moments.{" "}
              <span className="text-orange-brand">Real community.</span>
            </h2>
            <p className="text-white/50 mt-3 max-w-md text-base leading-relaxed">
              A glimpse into the events, programs, and gatherings that make Salam Society special.
            </p>
          </div>

          <a
            href="https://www.instagram.com/salamsociety.ca/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-white flex-shrink-0 self-start md:self-auto"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" className="text-white">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            See More on Instagram
          </a>
        </motion.div>

        {/* Media grid */}
        {hasMedia ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]">
            {media.slice(0, 9).map((item, i) => (
              <MediaItem key={item.id} item={item} index={i} />
            ))}
          </div>
        ) : (
          /* Empty state placeholder grid */
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]">
            {placeholderItems.map((item, i) => (
              <motion.div
                key={item.id}
                className={`relative overflow-hidden rounded-2xl bg-white/5 ${i === 1 || i === 4 ? "row-span-2" : ""}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/10 text-4xl">📸</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Instagram caption */}
        <motion.p
          className="text-center text-white/30 text-sm mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Follow{" "}
          <a href="https://www.instagram.com/salamsociety.ca/" target="_blank" rel="noopener noreferrer" className="text-orange-brand hover:underline">
            @salamsociety.ca
          </a>{" "}
          on Instagram for the latest moments
        </motion.p>
      </div>
    </section>
  );
}
