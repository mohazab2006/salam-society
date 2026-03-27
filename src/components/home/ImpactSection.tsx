"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Initiative } from "@/lib/types";

const statusConfig = {
  active: { label: "Active", cls: "bg-green-100 text-green-700" },
  completed: { label: "Completed", cls: "bg-gray-100 text-gray-600" },
  upcoming: { label: "Upcoming", cls: "bg-blue-100 text-blue-700" },
};

interface Props {
  initiatives?: Initiative[];
}

export default function ImpactSection({ initiatives }: Props) {
  const hasInitiatives = initiatives && initiatives.length > 0;

  return (
    <section id="impact" className="section-padding bg-gray-50">
      <div className="container-custom">

        {/* ── Section header ── */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label mb-4 justify-center">
            <span className="w-6 h-0.5 bg-[#F47B20] rounded-full inline-block" />
            Impact &amp; Initiatives
          </span>
          <h2
            className="font-extrabold text-black leading-tight mb-4"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
          >
            Serving the community{" "}
            <span className="text-[#F47B20]">beyond the masjid</span>
          </h2>
          <p className="text-gray-600 text-[1.05rem] max-w-xl mx-auto leading-relaxed">
            From street outreach to school drives, Salam Society is committed to making a real difference in Ottawa and beyond.
          </p>
        </motion.div>

        {hasInitiatives ? (
          /* ── Real initiative cards ── */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {initiatives.map((initiative, i) => (
              <motion.div
                key={initiative.id}
                className="bg-white rounded-2xl overflow-hidden shadow-soft group"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                {/* Image area */}
                <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                  {initiative.image_url ? (
                    <Image
                      src={initiative.image_url}
                      alt={initiative.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    /* Clean neutral placeholder — no emojis */
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#F47B20" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                    </div>
                  )}

                  {/* Status badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${statusConfig[initiative.status].cls}`}>
                      {statusConfig[initiative.status].label}
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div className="p-6">
                  <h3 className="font-bold text-[1.1rem] text-gray-900 mb-3 leading-snug group-hover:text-[#F47B20] transition-colors">
                    {initiative.title}
                  </h3>
                  <p className="text-gray-500 text-[0.95rem] leading-relaxed">
                    {initiative.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* ── Coming Soon empty state ── */
          <motion.div
            className="text-center py-16 px-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center mx-auto mb-5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F47B20" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Initiatives Coming Soon</h3>
            <p className="text-gray-500 text-[1rem] max-w-sm mx-auto leading-relaxed">
              Our community initiatives will be featured here. Follow our Instagram to stay updated on our latest work.
            </p>
            <a
              href="https://www.instagram.com/salamsociety.ca/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-orange mt-6 inline-flex"
            >
              Follow on Instagram
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
