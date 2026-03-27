"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Partner } from "@/lib/types";

interface Props {
  partners?: Partner[];
}

export default function PartnersSection({ partners }: Props) {
  const hasPartners = partners && partners.length > 0;

  // Hide the whole section if there are no partners yet — no placeholder grid
  if (!hasPartners) return null;

  return (
    <section id="partners" className="section-padding bg-white">
      <div className="container-custom">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label mb-4 justify-center">
            <span className="w-6 h-0.5 bg-[#F47B20] rounded-full inline-block" />
            Community Partners
          </span>
          <h2
            className="font-extrabold text-black leading-tight mb-4"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
          >
            Organizations &amp; mosques{" "}
            <span className="text-[#F47B20]">we work with</span>
          </h2>
          <p className="text-gray-600 text-[1.05rem] max-w-lg mx-auto leading-relaxed">
            Salam Society is proud to collaborate with mosques and organizations across Ottawa who share our commitment to community and service.
          </p>
        </motion.div>

        {/* Partners grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
            >
              <PartnerLogo partner={partner} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnerLogo({ partner }: { partner: Partner }) {
  const inner = (
    <div className="group flex flex-col items-center justify-center gap-3 h-28 rounded-2xl border border-gray-100 hover:border-orange-200 bg-gray-50 hover:bg-orange-50/30 transition-all duration-300 px-4 cursor-pointer">
      <div className="relative w-full max-w-[120px] h-12 grayscale group-hover:grayscale-0 transition-all duration-300">
        <Image
          src={partner.logo_url}
          alt={partner.name}
          fill
          className="object-contain"
          sizes="120px"
        />
      </div>
      <p className="text-xs text-gray-400 group-hover:text-gray-700 text-center font-semibold transition-colors line-clamp-1">
        {partner.name}
      </p>
    </div>
  );

  if (partner.website_url) {
    return (
      <a href={partner.website_url} target="_blank" rel="noopener noreferrer" aria-label={partner.name}>
        {inner}
      </a>
    );
  }
  return inner;
}
