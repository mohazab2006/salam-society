# Salam Society Website

A full-stack web platform built for Salam Society, a Muslim community organization based in Ottawa, Canada.

🌐 https://salam-society.vercel.app

---

## About Salam Society

Salam Society is a community-focused organization that runs events, programs, and initiatives for Muslims in Ottawa. Their goal is to create a welcoming space for learning, connection, and community engagement.

---

## Project Overview

I built this platform from scratch to replace a traditional CMS-based website with a more flexible and maintainable solution.

The goal was to give the Salam Society team a system they can manage themselves, while keeping the site fast, simple, and reliable.

---

## What I Built

- A public website for events, programs, and community content  
- A private admin dashboard for managing all content  
- A backend powered by Supabase for database and storage  
- Email functionality for contact form submissions  
- Bilingual support (English and French)  

---

## Key Features

### Public Website
- Events listing (upcoming and past)
- Programs and initiatives pages
- Community gallery (photos and videos)
- Partner showcase
- Contact form with real email delivery
- English / French language support

### Admin Dashboard
- Create, edit, publish, and delete content
- Upload and manage images
- Instant updates with cache revalidation
- Simple interface for non-technical users

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Database:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Email:** Nodemailer (Gmail SMTP)
- **Deployment:** Vercel

---

## Architecture Notes

- Uses server components and server actions for performance
- Row-level security in Supabase for safe data access
- Environment variables control domain, API keys, and email setup
- No external CMS — everything is managed through the custom dashboard

---

## Why I Built It This Way

Instead of relying on tools like WordPress or other CMS platforms, I chose to build a custom solution to:

- Keep costs low
- Improve performance
- Give full control over features and structure
- Make it easier to extend in the future

---
