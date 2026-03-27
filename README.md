# Salam Society

**The official website for Salam Society — Ottawa's Muslim community hub.**

Live at [salamsociety.ca](https://salamsociety.ca)

---

## What it does

A fully dynamic, bilingual community website with a built-in admin dashboard — no third-party CMS, no page builder. Everything is live-synced with a Supabase database.

---

## Features

### Public Site
- **EN / FR** — full English and French translation, cookie-persisted per visitor
- **Events** — upcoming and past, filterable by audience (Brothers / Sisters / Everyone), auto-sorted by date
- **Programs** — recurring community programs with audience filtering, past programs auto-archived
- **Community Moments** — photo & video gallery, portrait images automatically display taller than landscape ones
- **Initiatives** — community impact campaigns with full image display (QR codes, posters visible)
- **Partners** — collaborating organizations showcased with logos
- **Podcast** — embedded podcast section
- **Contact form** — sends real emails via Gmail SMTP
- **WhatsApp community link** — in footer, contact section, and mobile nav

### Admin Dashboard (`/admin`)
- Password-protected — no public access
- Add / edit / delete **Events**, **Programs**, **Initiatives**, **Partners**, **Media**
- **Image upload** directly to Supabase Storage — no need to paste URLs
- Publish / unpublish any content — only published items appear on the public site
- Changes reflect live instantly via cache revalidation

### Technical
- **Next.js 16** App Router with server components and server actions
- **Supabase** for database and file storage (service role for writes, anon for reads)
- **Framer Motion** animations throughout
- **Fully SEO optimized** — Open Graph image, Twitter card, JSON-LD structured data (NGO + Event rich snippets), geo meta tags, sitemap, robots.txt
- **Bilingual sitemap** and web app manifest
- Core Web Vitals optimized — preconnect hints, priority image loading, ISR caching

---

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (App Router) |
| Database | Supabase (PostgreSQL) |
| Storage | Supabase Storage |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Email | Nodemailer + Gmail SMTP |
| Deployment | Vercel |

---

*Built for Salam Society — Ottawa, Ontario 🇨🇦*
