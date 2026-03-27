"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Programs", href: "/programs" },
  { label: "Events", href: "/events" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

const moreLinks = [
  {
    label: "Podcast",
    href: "/#podcast",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" y1="19" x2="12" y2="23"/>
        <line x1="8" y1="23" x2="16" y2="23"/>
      </svg>
    ),
  },
  {
    label: "Community Moments",
    href: "/#moments",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
    ),
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [lang, setLang] = useState<"EN" | "FR">("EN");
  const menuRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Only use white text/logo when on the home page AND not yet scrolled
  // (home page has a dark hero; all other pages have light backgrounds)
  const onDark = pathname === "/" && !scrolled;

  const linkCls = onDark
    ? "text-white/90 hover:text-white font-semibold text-[1rem] leading-none transition-colors duration-150"
    : "text-gray-800 hover:text-[#F47B20] font-semibold text-[1rem] leading-none transition-colors duration-150";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_20px_rgba(0,0,0,0.08)]"
            : "bg-transparent"
        }`}
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between h-[4.5rem] md:h-[5rem]">

            {/* ── Logo ── */}
            <Link
              href="/"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
                setMobileOpen(false);
              }}
              className="flex items-center flex-shrink-0 group"
              aria-label="Salam Society — Home"
            >
              <motion.div
                className="relative w-[130px] h-[44px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Image
                  src="/images/logo-orange.png"
                  alt="Salam Society"
                  fill
                  priority
                  sizes="130px"
                  className={`object-contain object-left transition-all duration-300 ${
                    onDark ? "brightness-0 invert" : ""
                  }`}
                />
              </motion.div>
            </Link>

            {/* ── Desktop links ── */}
            <div className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={linkCls}
                  onClick={link.href === "/" && pathname === "/" ? (e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } : undefined}
                >
                  {link.label}
                </Link>
              ))}

              {/* More dropdown */}
              <div className="relative" ref={moreRef}>
                <button
                  onClick={() => setMoreOpen(!moreOpen)}
                  className={`${linkCls} flex items-center gap-1.5`}
                  aria-expanded={moreOpen}
                  aria-haspopup="true"
                >
                  More
                  <svg
                    width="14" height="14" viewBox="0 0 14 14" fill="none"
                    className={`transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`}
                  >
                    <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <AnimatePresence>
                  {moreOpen && (
                    <motion.div
                      className="absolute top-full right-0 mt-3 w-56 bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.14)] border border-gray-100 overflow-hidden z-50"
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                    >
                      {moreLinks.map((link, i) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMoreOpen(false)}
                          className={`flex items-center gap-3 px-5 py-4 text-gray-700 hover:bg-orange-50 hover:text-[#F47B20] text-[0.95rem] font-semibold transition-colors ${
                            i < moreLinks.length - 1 ? "border-b border-gray-50" : ""
                          }`}
                        >
                          <span className="text-gray-400">{link.icon}</span>
                          {link.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* ── Right side: Lang toggle + CTA ── */}
            <div className="hidden md:flex items-center gap-4">
              {/* EN / FR toggle */}
              <div
                className={`flex items-center rounded-full border overflow-hidden transition-colors duration-300 ${
                  onDark ? "border-white/30" : "border-gray-200"
                }`}
              >
                {(["EN", "FR"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-3.5 py-1.5 text-[0.85rem] font-bold transition-all duration-200 ${
                      lang === l
                        ? onDark
                          ? "bg-white text-black"
                          : "bg-[#F47B20] text-white"
                        : onDark
                          ? "text-white/60 hover:text-white"
                          : "text-gray-400 hover:text-gray-700"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>

              <Link href="/events" className="btn-orange text-[0.95rem] px-5 py-2.5">
                View Events
              </Link>
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col justify-center items-center w-11 h-11 gap-[5px] rounded-xl"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <motion.span
                className={`block w-6 h-[2.5px] rounded-full transition-colors duration-300 ${
                  onDark ? "bg-white" : "bg-gray-800"
                }`}
                animate={mobileOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className={`block w-6 h-[2.5px] rounded-full transition-colors duration-300 ${
                  onDark ? "bg-white" : "bg-gray-800"
                }`}
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className={`block w-6 h-[2.5px] rounded-full transition-colors duration-300 ${
                  onDark ? "bg-white" : "bg-gray-800"
                }`}
                animate={mobileOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
            </button>
          </nav>
        </div>
      </header>

      {/* ─────────────── Mobile drawer ─────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              ref={menuRef}
              className="fixed top-0 right-0 bottom-0 w-[82vw] max-w-sm bg-white z-50 md:hidden shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 280 }}
            >
              <div className="flex flex-col h-full">
                {/* Drawer header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                  <Link
                    href="/"
                    onClick={(e) => {
                      if (pathname === "/") {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                      setMobileOpen(false);
                    }}
                  >
                    <div className="relative w-[110px] h-[36px]">
                      <Image
                        src="/images/logo-orange.png"
                        alt="Salam Society"
                        fill
                        sizes="110px"
                        className="object-contain object-left"
                      />
                    </div>
                  </Link>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Close menu"
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M2 2L16 16M16 2L2 16" stroke="#333" strokeWidth="2.2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>

                {/* Drawer links */}
                <nav className="flex flex-col gap-0.5 p-4 flex-1 overflow-y-auto">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 + 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={(e) => {
                          if (link.href === "/" && pathname === "/") {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }
                          setMobileOpen(false);
                        }}
                        className="flex items-center px-4 py-4 rounded-xl text-[1.1rem] font-semibold text-gray-800 hover:bg-orange-50 hover:text-[#F47B20] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}

                  {/* Divider + "More" label */}
                  <div className="px-4 pt-4 pb-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-300">
                      More
                    </span>
                  </div>

                  {moreLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (navLinks.length + i) * 0.04 + 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-4 py-4 rounded-xl text-[1.1rem] font-semibold text-gray-700 hover:bg-orange-50 hover:text-[#F47B20] transition-colors"
                      >
                        <span className="text-gray-400">{link.icon}</span>
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Drawer footer */}
                <div className="p-6 border-t border-gray-100 space-y-4">
                  {/* Language toggle */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500 font-semibold">Language:</span>
                    <div className="flex rounded-full border border-gray-200 overflow-hidden">
                      {(["EN", "FR"] as const).map((l) => (
                        <button
                          key={l}
                          onClick={() => setLang(l)}
                          className={`px-4 py-2 text-sm font-bold transition-all ${
                            lang === l ? "bg-[#F47B20] text-white" : "text-gray-400"
                          }`}
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/events"
                    className="btn-orange w-full text-center block text-[1rem]"
                    onClick={() => setMobileOpen(false)}
                  >
                    View Events
                  </Link>

                  {/* Social icons */}
                  <div className="flex items-center justify-center gap-6 pt-1">
                    <a
                      href="https://www.instagram.com/salamsociety.ca/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="text-gray-400 hover:text-[#F47B20] transition-colors"
                    >
                      <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                      </svg>
                    </a>
                    <a
                      href="https://www.youtube.com/@SalamSociety"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="YouTube"
                      className="text-gray-400 hover:text-[#F47B20] transition-colors"
                    >
                      <svg width="26" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
