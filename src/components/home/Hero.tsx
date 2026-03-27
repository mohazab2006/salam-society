"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

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

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0f0f0f]">

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
      </div>

      {/* ── Orange ambient blob ── */}
      <div
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-10 blur-[120px] z-0 pointer-events-none"
        style={{ background: "#F47B20" }}
      />

      {/* ── Main content ── */}
      <div className="container-custom relative z-10 py-32 pt-40">
        <div className="max-w-3xl">

          {/* Location label */}
          <motion.div
            className="section-label mb-6"
            {...fadeUp(0.1)}
          >
            <span className="w-8 h-0.5 bg-[#F47B20] rounded-full inline-block" />
            Ottawa, Ontario · Muslim Community
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-white font-extrabold leading-[1.08] mb-6"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
            {...fadeUp(0.22)}
          >
            Crafting a space for
            <br />
            <span style={{ color: "#F47B20" }}>Muslim youth</span> to
            <br />
            confidently embrace
            <br />
            their identity.
          </motion.h1>

          {/* Supporting text */}
          <motion.p
            className="text-white/75 text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
            {...fadeUp(0.34)}
          >
            Events, programs, and community initiatives designed to empower,
            connect, and inspire. For brothers, sisters, youth, and families
            across Ottawa.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-wrap gap-4"
            {...fadeUp(0.46)}
          >
            <Link href="/events" className="btn-orange text-base px-7 py-3.5">
              View Events
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="/programs" className="btn-outline-white text-base px-7 py-3.5">
              Explore Programs
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
        <p className="text-white/40 text-xs tracking-widest uppercase">Scroll</p>
        <motion.div
          className="w-0.5 h-8 bg-gradient-to-b from-white/40 to-transparent rounded-full"
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
