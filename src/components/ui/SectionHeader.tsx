"use client";

import { motion } from "framer-motion";

interface Props {
  label?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
}

export default function SectionHeader({ label, title, highlight, description, align = "center", dark = false }: Props) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  const parts = highlight ? title.split(highlight) : [title];

  return (
    <motion.div
      className={`flex flex-col gap-3 ${alignClass} mb-12 md:mb-16`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {label && (
        <span className="section-label">
          <span className="w-6 h-0.5 bg-orange-brand rounded-full inline-block" />
          {label}
        </span>
      )}
      <h2
        className={`font-extrabold leading-tight ${dark ? "text-white" : "text-black"}`}
        style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
      >
        {parts[0]}
        {highlight && <span className="text-orange-brand">{highlight}</span>}
        {parts[1]}
      </h2>
      {description && (
        <p className={`text-base md:text-lg leading-relaxed max-w-xl ${dark ? "text-white/60" : "text-gray-500"} ${align === "center" ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
