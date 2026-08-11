# Prime Estates - Luxury Real Estate Web Application

A modern, high-performance luxury real estate web application built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **GSAP**, and **Framer Motion**. Designed specifically for real estate developers, property builders, and luxury estate agencies.

---

## 🛠️ Tech Stack

* **Framework**: Next.js 16 (App Router)
* **Library**: React 19 & TypeScript
* **Styling**: Tailwind CSS v4 & Lucide React Icons
* **Animations**: GSAP (ScrollTrigger), Framer Motion & Lenis Smooth Scroll
* **Forms & Validation**: React Hook Form & Zod
* **Bot Protection**: Cloudflare Turnstile integration

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Modify `.env.local` to fit your project requirements:
```env
NEXT_PUBLIC_SITE_URL=https://primeestates.com
LEAD_PROVIDER=console
NOTIFICATION_EMAIL=info@primeestates.com
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚡ Production Build

To verify and create an optimized production build:
```bash
npm run build
npm run start
```

---

## 📩 Backend API & Lead Routing

The website includes a dedicated backend API route located at `/api/leads` ([`src/app/api/leads/route.ts`](file:///d:/websites/mgr-constructions/src/app/api/leads/route.ts)):

* **IP Rate Limiting**: Restricts submissions to max 5 submissions per minute per IP.
* **Honeypot Trap**: Invisible field check to block bot submissions automatically.
* **Cloudflare Turnstile Verification**: Validates human interaction tokens server-side.
* **Extensible Lead Service**: Lead dispatching logic is handled in [`src/lib/leads/index.ts`](file:///d:/websites/mgr-constructions/src/lib/leads/index.ts). Supports logging to server console or dispatching to external Webhook endpoints (e.g. CRM, Google Sheets, Make, Zapier).

---

## 🎨 Customizing Content & Assets

### 📁 Business Details & Navigation
* Company Info (Name, Address, Phone, Map): [`src/config/company.ts`](file:///d:/websites/mgr-constructions/src/config/company.ts)
* Navigation Links: [`src/config/navigation.ts`](file:///d:/websites/mgr-constructions/src/config/navigation.ts)
* SEO & Metadata Defaults: [`src/config/seo.ts`](file:///d:/websites/mgr-constructions/src/config/seo.ts)

### 📄 Property Projects & Content
* Properties & Projects: [`src/content/projects.ts`](file:///d:/websites/mgr-constructions/src/content/projects.ts)
* Services List: [`src/content/services.ts`](file:///d:/websites/mgr-constructions/src/content/services.ts)
* Testimonials & Reviews: [`src/content/testimonials.ts`](file:///d:/websites/mgr-constructions/src/content/testimonials.ts)

### 🖼️ Property Images & Uploads
Image assets reside in `public/uploads/projects/`:
* `exterior.webp` - Main perspective view
* `interior.webp` - Interior design concepts
* `floorplan.webp` - Floorplan layout
* `amenity.webp` - Amenities photos

---

## 📄 License

Product Source Code Package. Ready for commercial customization and deployment.
