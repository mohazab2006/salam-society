"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const pillars = [
  {
    icon: "🕌",
    title: "Faith-Centered",
    description: "Everything we do is rooted in Islamic values — compassion, knowledge, brotherhood, and service.",
  },
  {
    icon: "👥",
    title: "Community-First",
    description: "We create spaces where Muslims of all ages and backgrounds feel welcomed, seen, and valued.",
  },
  {
    icon: "⚡",
    title: "Youth-Driven",
    description: "We believe in the power of Muslim youth — our programs are built to support them at every stage.",
  },
  {
    icon: "🤲",
    title: "Service-Oriented",
    description: "From food drives to outreach, we are committed to serving Ottawa and the broader community.",
  },
];

export default function AboutSection() {
  const [aboutImgError, setAboutImgError] = useState(false);

  return (
    <section id="about" className="section-padding bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Image side */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-orange-50">
              {/* Community photo — add about-community.jpg to /public/images/ to show it */}
              {!aboutImgError && (
                <Image
                  src="/images/about-community.jpg"
                  alt="Salam Society community"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  onError={() => setAboutImgError(true)}
                />
              )}
              {/* Gradient placeholder shown when no image is present */}
              <div className={`absolute inset-0 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center transition-opacity duration-300 ${aboutImgError ? "opacity-100" : "opacity-0"}`}>
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#F47B20" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" className="opacity-30">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-4 -right-4 bg-black rounded-2xl p-5 shadow-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <p className="text-orange-brand text-3xl font-800">2018</p>
              <p className="text-white text-xs font-500 mt-0.5">Est. in Ottawa</p>
            </motion.div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <span className="section-label mb-5 block">
              <span className="w-6 h-0.5 bg-orange-brand rounded-full inline-block" />
              About Salam Society
            </span>
            <h2
              className="font-extrabold text-black leading-tight mb-6"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
            >
              A home for Muslim youth{" "}
              <span className="text-orange-brand">in Ottawa</span>
            </h2>
            <div className="space-y-4 text-gray-600 text-base leading-relaxed">
              <p>
                Salam Society is a Muslim community organization based in Ottawa, Ontario —
                dedicated to creating meaningful spaces for youth, families, and the broader Muslim community.
              </p>
              <p>
                We organize events and programs that speak to brothers, sisters, youth, and kids.
                From weekly halaqas and sports to community service and family celebrations, every
                initiative is designed with purpose and care.
              </p>
              <p>
                Our mission is simple: to craft a space where Muslim youth can confidently embrace
                their identity — and find belonging, growth, and community along the way.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              <a href="/#events" className="btn-orange">
                See Upcoming Events
              </a>
              <a href="/#contact" className="btn-outline">
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              className="bg-gray-50 rounded-2xl p-6 hover:bg-orange-50 transition-colors duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <span className="text-3xl mb-4 block">{pillar.icon}</span>
              <h3 className="font-700 text-gray-900 mb-2 group-hover:text-orange-brand transition-colors">
                {pillar.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
