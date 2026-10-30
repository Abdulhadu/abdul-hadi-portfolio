# 🚀 Abdul Hadi Portfolio — Setup Guide

## Step 1: Add Your Photo

1. Find the photo from the mockup (man with glasses, dark suit)
2. Save it as: `public/images/profile.svg` → **replace** this file with `profile.jpg`
3. Then in `src/lib/data.ts` change: `photo: "/images/profile.svg"` → `photo: "/images/profile.jpg"`

Also add your CV PDF:
- Save as: `public/documents/abdul-hadi-cv.pdf`

---

## Step 2: Install Dependencies

Open **PowerShell** or **CMD** in the project folder:

```bash
cd "H:\freelancing projects\abdul-hadi-portfolio"
npm install
```

Wait ~2-3 minutes. This installs everything in `package.json`.

---

## Step 3: Set Up Environment Variables

1. Copy `.env.example` → create `.env.local` (already done, just fill values)
2. Open `.env.local` and fill in:

### A) Get Supabase Service Role Key
- Go to: https://supabase.com/dashboard/project/ekywvnhllxnopmaotjui/settings/api
- Copy the **service_role** key (not the anon key!)
- Paste into: `SUPABASE_SERVICE_ROLE_KEY=...`

### B) Run the Database Schema
- Go to: https://supabase.com/dashboard/project/ekywvnhllxnopmaotjui/editor
- Open the file `supabase-schema.sql` in this project
- Copy all the SQL and paste into the Supabase SQL editor → **Run**

### C) Get Resend API Key (for email notifications)
- Sign up free at: https://resend.com
- Dashboard → API Keys → Create API Key
- Paste into: `RESEND_API_KEY=re_...`
- Important: Add your email domain or use their sandbox domain

### D) Update WhatsApp Number
- In `.env.local`: `NEXT_PUBLIC_WHATSAPP_LINK=https://wa.me/92XXXXXXXXXX`
- Replace with your real number (international format, no + or -)

---

## Step 4: Run Development Server

```bash
npm run dev
```

Open: http://localhost:3000

---

## Step 5: Update Your Info

In `src/lib/data.ts`:
- Update `whatsapp` with your real number
- Update `github` and `linkedin` URLs
- Adjust project `liveUrl` links when ready

---

## Step 6: Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or push to GitHub → import at https://vercel.com/new

**Add these environment variables in Vercel:**
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `NEXT_PUBLIC_WHATSAPP_LINK`
- `NEXT_PUBLIC_SITE_URL` (your Vercel URL)

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout + SEO metadata
│   ├── page.tsx            # Main page (assembles all sections)
│   ├── globals.css         # Global styles + design tokens
│   └── api/contact/
│       └── route.ts        # Contact form API (Supabase + Resend)
├── components/
│   ├── sections/           # Hero, About, Skills, Experience, Projects, Contact
│   └── ui/                 # Navbar, Footer
└── lib/
    └── data.ts             # All content data (edit this to customize)
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 + custom design tokens
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Database**: Supabase (PostgreSQL)
- **Email**: Resend
- **Deployment**: Vercel
