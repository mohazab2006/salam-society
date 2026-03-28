# Salam Society

> **The official web platform for Salam Society — Ottawa's Muslim community hub.**

🌐 **[salam-society.vercel.app](https://salam-society.vercel.app)**

---

## Overview

Salam Society needed more than a brochure site — they needed a living platform their team could own. This is a **production-grade, full-stack web application** built from scratch with Next.js 16 and Supabase, replacing what would typically require a paid CMS subscription with a purpose-built solution that's faster, cheaper, and fully tailored to the organization.

The result: a bilingual community platform with real-time content management, transactional email, dynamic SEO, and a custom admin dashboard — all deployed on Vercel with zero downtime.

---

## Highlights

- **Zero CMS dependency** — custom-built admin dashboard replaces Contentful, Sanity, or WordPress entirely
- **Bilingual out of the box** — full EN/FR support, persisted per visitor via cookies
- **Production email** — contact form sends real transactional emails via Gmail SMTP through Nodemailer
- **Dynamic SEO** — Open Graph images generated at runtime, JSON-LD structured data (NGO + Event schemas), geo meta tags, sitemap, and robots.txt — all domain-aware
- **Role-based data access** — anon key for public reads, service role for authenticated writes; no backend server required
- **Scroll-aware UI** — navbar transitions from transparent to solid on scroll with zero flash in production (solved via `history.scrollRestoration` injected before React hydrates)
- **Responsive & animated** — Framer Motion throughout, mobile drawer nav, portrait/landscape-aware media gallery

---

## Features

### Public Platform
| Feature | Details |
|---|---|
| **Events** | Upcoming + past, filterable by audience (Brothers / Sisters / Everyone), auto-sorted by date |
| **Programs** | Recurring community programs with audience filtering; past programs auto-archived |
| **Community Moments** | Photo & video gallery — portrait images render taller than landscape automatically |
| **Initiatives** | Impact campaigns with full image display (posters, QR codes) |
| **Partners** | Partner organizations showcased with logos |
| **Podcast** | Embedded podcast player section |
| **Contact** | Live contact form with real email delivery |
| **Bilingual** | Full EN / FR translation, persisted per visitor |

### Content Management
A private, password-protected admin dashboard gives the Salam Society team full control over all site content — no developer needed for day-to-day updates. Admins can create, edit, publish, unpublish, and delete any content type, upload images directly to cloud storage, and see changes go live instantly via ISR cache revalidation.

### Technical
| Area | Implementation |
|---|---|
| **Rendering** | Next.js 16 App Router — server components, server actions, ISR |
| **Database** | Supabase PostgreSQL with row-level access control |
| **Storage** | Supabase Storage for all media uploads |
| **Email** | Nodemailer + Gmail SMTP App Password |
| **SEO** | Runtime OG image generation, JSON-LD (NGO + WebSite schemas), canonical URLs, bilingual sitemap, geo meta tags |
| **Animations** | Framer Motion — page transitions, scroll effects, mobile drawer |
| **Auth** | Custom password-protected admin routes via Supabase SSR |
| **Domain-aware** | `NEXT_PUBLIC_SITE_URL` env var propagates to all metadata, OG images, sitemap, and structured data automatically |

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Database | Supabase (PostgreSQL) |
| Storage | Supabase Storage |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Email | Nodemailer + Gmail SMTP |
| Testing | Vitest + Testing Library |
| Deployment | Vercel |

---

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production domain (e.g. `https://salamsociety.ca`) — propagates to all SEO, OG, sitemap |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key (public reads) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (admin writes) |
| `EMAIL_SERVER_HOST` | SMTP host (`smtp.gmail.com`) |
| `EMAIL_SERVER_PORT` | SMTP port (`587`) |
| `EMAIL_SERVER_USER` | Gmail address |
| `EMAIL_SERVER_PASSWORD` | Gmail App Password |
| `EMAIL_FROM` | Sender address |
| `EMAIL_TO` | Recipient address for contact form submissions |

---

*Built for Salam Society — Ottawa, Ontario 🇨🇦*
