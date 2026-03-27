"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import CategoryBadge from "./CategoryBadge";
import type { Program } from "@/lib/types";

interface Props {
  program: Program;
  index?: number;
}

export default function ProgramCard({ program, index = 0 }: Props) {
  return (
    <motion.article
      className="card group flex flex-col h-full"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 flex-shrink-0">
        {program.image_url ? (
          <Image
            src={program.image_url}
            alt={program.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
            <span className="text-5xl">📚</span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <CategoryBadge category={program.audience_category} />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-gray-900 font-700 text-lg leading-snug mb-2 group-hover:text-orange-brand transition-colors">
          {program.title}
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4 line-clamp-3">
          {program.description}
        </p>

        {/* Meta */}
        <div className="flex flex-col gap-2 mb-5 text-xs text-gray-400">
          <span className="flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="text-orange-brand flex-shrink-0">
              <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M6.5 4v2.5l1.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            {program.schedule}
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="text-orange-brand flex-shrink-0">
              <path d="M6.5 1.5C4.567 1.5 3 3.067 3 5c0 2.625 3.5 6.5 3.5 6.5S10 7.625 10 5c0-1.933-1.567-3.5-3.5-3.5zm0 4.75a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z" fill="currentColor"/>
            </svg>
            {program.location}
          </span>
          {program.age_group && (
            <span className="flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="text-orange-brand flex-shrink-0">
                <circle cx="6.5" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.1"/>
                <path d="M2 11.5c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
              </svg>
              Ages {program.age_group}
            </span>
          )}
        </div>

        {/* CTA */}
        <div className="mt-auto">
          {program.signup_required && program.signup_link ? (
            <a
              href={program.signup_link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-orange w-full text-sm py-2.5 justify-center"
            >
              Sign Up
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
              Open to All
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
