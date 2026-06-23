# MGR Constructions - Luxury Real Estate Web Engine

A high-converting, premium real estate web application built for **MGR Constructions** (Hyderabad) using Next.js 15, React 19, Tailwind CSS v4, and React Three Fiber.

---

## 🚀 Quick Start (Local Development)

First, install dependencies:
```bash
npm install
```

Second, run the local development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to inspect the application.

---

## 🛠️ Environment Configurations (`.env.local`)

This website incorporates a unified CRM lead capture abstraction layer. Create a `.env.local` file in the root directory and specify your provider keys:

```env
# Define the active lead destination (options: supabase | resend | formspree | emailjs | sheets | console)
LEAD_PROVIDER=console

# Destination Notification Email for Alert Routing
NOTIFICATION_EMAIL=info@mgrconstructions.in

# Provider 1: RESEND Configuration
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx

# Provider 2: SUPABASE Configuration
SUPABASE_URL=https://xxxxxxxxxxxxxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Provider 3: FORMSPREE Configuration
FORMSPREE_FORM_ID=xxxxxx

# Provider 4: EMAILJS Configuration
EMAILJS_SERVICE_ID=service_xxxx
EMAILJS_TEMPLATE_ID=template_xxxx
EMAILJS_USER_ID=user_xxxx

# Provider 5: GOOGLE SHEETS Configuration
GOOGLE_SHEETS_SCRIPT_URL=https://script.google.com/macros/s/xxxx/exec

# Calendly Scheduling Integration (Optional fallback: https://calendly.com/calendly/30min)
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/mgr-constructions/site-visit
NEXT_PUBLIC_CALENDLY_USERNAME=mgr-constructions
NEXT_PUBLIC_CALENDLY_EVENT=site-visit
```

---

## 🖼️ Admin Image Uploads & Brochure Schema

To change project images or brochures without writing or modifying code, drop replacement assets directly into the public folders matching these structures:

### 📄 Brochure PDFs (`public/brochures/`)
- Rename the Hyderabad Construction Pricing breakdown guide: `construction-cost-guide.pdf`
- Rename project brochures: `manikonda-residences.pdf`, `platinum-enclave.pdf`

### 🏢 Property Image Uploads (`public/uploads/projects/`)
Organized by folder names:
- Manikonda: `public/uploads/projects/manikonda-residences/`
- Tarnaka: `public/uploads/projects/platinum-enclave/`

Inside each project directory, drop exactly these 4 image names:
- `exterior.webp` (Main perspective view)
- `interior.webp` (Living room / Kitchen design concepts)
- `floorplan.webp` (HMDA structural outline blueprint)
- `amenity.webp` (Gym, elevator, or garden photos)

---

## 📦 Vercel Production Deployment

This project is pre-configured with `vercel.json` headers to achieve:
1. **Lighthouse SEO (100)**: Proper robots index directives.
2. **Performance (95+)**: High-speed asset caching for uploaded folders.
3. **Security**: Hardened HTTP protection headers.

To deploy instantly:
1. Initialize a Git repository and push this folder to GitHub/GitLab.
2. Connect the repository to your Vercel Dashboard.
3. Configure the environment variables (e.g. `LEAD_PROVIDER=console` or `supabase`).
4. Click **Deploy**. Vercel will automatically compile the production build.

