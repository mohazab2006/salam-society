"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Partner } from "@/lib/types";
import { useLocale } from "@/components/providers/LocaleProvider";

interface Props {
  partners?: Partner[];
}

export default function PartnersSection({ partners }: Props) {
  const { t } = useLocale();
  const p = t.partners;
  const hasPartners = partners && partners.length > 0;

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
            {p.label}
          </span>
          <h2
            className="font-extrabold text-black leading-tight mb-4"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
          >
            {p.title}{" "}
            <span className="text-[#F47B20]">{p.titleHighlight}</span>
          </h2>
          <p className="text-gray-600 text-[1.05rem] max-w-lg mx-auto leading-relaxed">
            {p.subtitle}
          </p>
        </motion.div>

        {hasPartners ? (
          /* Partners grid */
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
        ) : (
          /* Empty state */
          <motion.div
            className="text-center py-14 px-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center mx-auto mb-5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F47B20" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{p.comingSoon}</h3>
            <p className="text-gray-500 text-[1rem] max-w-sm mx-auto leading-relaxed">{p.comingSoonSub}</p>
          </motion.div>
        )}
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
