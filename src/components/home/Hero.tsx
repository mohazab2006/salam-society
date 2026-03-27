"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "@/components/providers/LocaleProvider";

const ease = [0.22, 1, 0.36, 1] as const;

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease, delay },
  };
}

export default function Hero() {
  const [bgError, setBgError] = useState(false);
  const { t } = useLocale();
  const h = t.hero;

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0f0f0f]">

      {/* ── Background image ── */}
      <div className="absolute inset-0 z-0">
        {!bgError && (
          <Image
            src="/images/hero-bg.jpg"
            alt="Salam Society community"
            fill
            className="object-cover object-center opacity-40"
            priority
            sizes="100vw"
            onError={() => setBgError(true)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {/* Mask top so nothing bleeds behind the transparent navbar */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black/90 to-transparent pointer-events-none" />
      </div>

      {/* ── Orange ambient blob — smaller/less blur on mobile to save GPU ── */}
      <div
        className="absolute top-1/4 right-1/4 w-[280px] h-[280px] md:w-[600px] md:h-[600px] rounded-full opacity-10 blur-[60px] md:blur-[120px] z-0 pointer-events-none"
        style={{ background: "#F47B20" }}
      />

      {/* ── Main content ── */}
      <div className="container-custom relative z-10 pt-20 pb-20 md:pt-28 md:pb-28">
        <div className="max-w-3xl">

          {/* Location label */}
          <motion.div className="section-label mb-6" {...fadeUp(0.1)}>
            <span className="w-8 h-0.5 bg-[#F47B20] rounded-full inline-block" />
            {h.location}
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-white font-extrabold leading-[1.08] mb-6"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
            {...fadeUp(0.22)}
          >
            {h.headlineBefore}
            <br />
            <span style={{ color: "#F47B20" }}>{h.headlineHighlight}</span>{" "}
            <br />
            {h.headlineAfter}
          </motion.h1>

          {/* Supporting text */}
          <motion.p
            className="text-white/75 text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
            {...fadeUp(0.34)}
          >
            {h.subtext}
          </motion.p>

          {/* CTA buttons */}
          <motion.div className="flex flex-wrap gap-4" {...fadeUp(0.46)}>
            <Link href="/events" className="btn-orange text-base px-7 py-3.5">
              {h.cta1}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="/programs" className="btn-outline-white text-base px-7 py-3.5">
              {h.cta2}
            </Link>
          </motion.div>

        </div>
      </div>

      {/* ── Scroll cue ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.6 }}
      >
        <p className="text-white/40 text-xs tracking-widest uppercase">{h.scroll}</p>
        <motion.div
          className="w-0.5 h-8 bg-gradient-to-b from-white/40 to-transparent rounded-full"
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
