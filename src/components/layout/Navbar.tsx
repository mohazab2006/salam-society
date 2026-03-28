"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/components/providers/LocaleProvider";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const SCROLL_SOLID_PX = 40;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { locale, t, setLocale } = useLocale();

  // When already on /, clicking logo or "Home" should scroll to top instead of re-navigating
  function handleHomeClick(e: React.MouseEvent) {
    if (pathname === "/") {
      e.preventDefault();
      scrollToTop();
      setMobileOpen(false);
    }
  }

  // Handle /#section links — scroll directly when already on homepage
  function handleHashClick(e: React.MouseEvent, href: string) {
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      if (pathname === "/") {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
      setMobileOpen(false);
      setMoreOpen(false);
    }
  }

  useLayoutEffect(() => {
    const read = () => setScrolled(window.scrollY > SCROLL_SOLID_PX);
    read();
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);

    const onPageShow = (e: PageTransitionEvent) => {
      read();
      if (e.persisted) requestAnimationFrame(read);
    };
    window.addEventListener("pageshow", onPageShow);

    const raf = requestAnimationFrame(() => {
      read();
      requestAnimationFrame(read);
    });

    return () => {
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
      window.removeEventListener("pageshow", onPageShow);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

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
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const onDark = pathname === "/" && !scrolled;

  const linkCls = onDark
    ? "text-white/90 hover:text-white font-semibold text-[1rem] leading-none transition-colors duration-150"
    : "text-gray-800 hover:text-[#F47B20] font-semibold text-[1rem] leading-none transition-colors duration-150";

  const navLinks = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.programs, href: "/programs" },
    { label: t.nav.events, href: "/events" },
    { label: t.nav.about, href: "/#about" },
    { label: t.nav.contact, href: "/#contact" },
  ];

  const moreLinks = [
    {
      label: t.nav.impact,
      href: "/#impact",
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      ),
    },
    {
      label: t.nav.partners,
      href: "/#partners",
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
    },
    {
      label: t.nav.podcast,
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
      label: t.nav.communityMoments,
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
          <nav className="flex items-center justify-between h-18 md:h-20">

            {/* ── Logo ── */}
            <Link
              href="/"
              onClick={handleHomeClick}
              className="flex items-center shrink-0 group"
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
                  onClick={
                    link.href === "/"
                      ? handleHomeClick
                      : link.href.startsWith("/#")
                      ? (e) => handleHashClick(e, link.href)
                      : undefined
                  }
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
                  {t.nav.more}
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
                          onClick={(e) => handleHashClick(e, link.href)}
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
                {(["en", "fr"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLocale(l)}
                    className={`px-3.5 py-1.5 text-[0.85rem] font-bold uppercase transition-all duration-200 ${
                      locale === l
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
                {t.nav.viewEvents}
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
              className="fixed top-0 right-0 bottom-0 w-[82vw] max-w-sm bg-white z-50 md:hidden shadow-2xl overflow-y-auto overscroll-contain"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 280 }}
            >
              <div className="flex flex-col h-full">
                {/* Drawer header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                  <Link href="/" onClick={handleHomeClick}>
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
                        onClick={
                          link.href === "/"
                            ? handleHomeClick
                            : link.href.startsWith("/#")
                            ? (e) => handleHashClick(e, link.href)
                            : () => setMobileOpen(false)
                        }
                        className="flex items-center px-4 py-4 rounded-xl text-[1.1rem] font-semibold text-gray-800 hover:bg-orange-50 hover:text-[#F47B20] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}

                  {/* Divider + "More" label */}
                  <div className="px-4 pt-4 pb-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-300">
                      {t.nav.more}
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
                        onClick={(e) => handleHashClick(e, link.href)}
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
                      {(["en", "fr"] as const).map((l) => (
                        <button
                          key={l}
                          onClick={() => setLocale(l)}
                          className={`px-4 py-2 text-sm font-bold uppercase transition-all ${
                            locale === l ? "bg-[#F47B20] text-white" : "text-gray-400"
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
                    {t.nav.viewEvents}
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
                    <a
                      href="https://chat.whatsapp.com/Bdwcs9euaZI3UnfKDrhtHL"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                      className="text-gray-400 hover:text-[#25D366] transition-colors"
                    >
                      <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.559 4.123 1.535 5.855L.057 23.215a.75.75 0 00.921.921l5.36-1.478A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.944 0-3.77-.493-5.364-1.36l-.387-.217-4.007 1.104 1.058-3.868-.24-.4A9.958 9.958 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
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
