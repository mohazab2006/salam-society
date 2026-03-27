"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/components/providers/LocaleProvider";

export default function PodcastSection() {
  const { t } = useLocale();
  const p = t.podcast;

  return (
    <section id="podcast" className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Text side */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="section-label mb-5 block">
                <span className="w-6 h-0.5 bg-[#F47B20] rounded-full inline-block" />
                {p.label}
              </span>
              <h2
                className="font-extrabold text-black leading-tight mb-5"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
              >
                {p.title}{" "}
                <span className="text-[#F47B20]">{p.titleHighlight}</span>
                {p.titleEnd ? ` ${p.titleEnd}` : ""}
              </h2>
              <p className="text-gray-600 text-[1.05rem] leading-relaxed mb-6">
                {p.subtitle}
              </p>
              <a
                href="https://www.youtube.com/@SalamSociety"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center gap-2"
              >
                <svg width="18" height="14" fill="currentColor" viewBox="0 0 24 24" className="text-red-500 flex-shrink-0">
                  <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
                </svg>
                {p.watchYoutube}
              </a>
            </motion.div>

            {/* Video embed side */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)] aspect-video bg-gray-900">
                <iframe
                  src="https://www.youtube.com/embed/3L0-Mpi69js"
                  title="Salam Society Podcast"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className="flex items-center gap-3 mt-4 px-1">
                <span className="badge badge-orange">{p.episode} 1</span>
                <span className="text-sm text-gray-500">Salam Society Podcast</span>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
