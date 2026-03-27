"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import ProgramCard from "@/components/ui/ProgramCard";
import { useLocale } from "@/components/providers/LocaleProvider";
import type { Program } from "@/lib/types";

interface Props {
  programs?: Program[];
}

export default function ProgramsSection({ programs }: Props) {
  const { t } = useLocale();
  const p = t.programs;
  const hasPrograms = programs && programs.length > 0;

  return (
    <section id="programs" className="section-padding bg-gray-50">
      <div className="container-custom">
        <SectionHeader
          label={p.label}
          title={p.title}
          highlight={p.highlight}
          description={p.description}
          align="center"
        />

        {hasPrograms ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {programs.slice(0, 3).map((program, i) => (
                <ProgramCard key={program.id} program={program} index={i} />
              ))}
            </div>
            <div className="flex justify-center">
              <Link href="/programs" className="btn-outline">
                {p.viewAll}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </>
        ) : (
          <motion.div
            className="text-center py-16 px-6"
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
            <a
              href="https://www.instagram.com/salamsociety.ca/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-orange mt-6 inline-flex"
            >
              {p.followUs}
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
