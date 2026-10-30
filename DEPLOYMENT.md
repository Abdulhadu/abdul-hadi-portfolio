# Deployment Guide — Abdul Hadi Portfolio

> Complete step-by-step guide to push to GitHub and deploy on Vercel with CI/CD.

---

## PART 1 — One-time local setup (do this once)

### Step 1 — Install Git (if not already installed)
1. Open your browser and go to: https://git-scm.com/download/win
2. Download and run the installer. Click "Next" on every screen (defaults are fine).
3. Open **PowerShell** and verify: `git --version` → should show `git version 2.x.x`

### Step 2 — Create a GitHub account (if you don't have one)
1. Go to https://github.com and click **Sign up**
2. Use your professional email

### Step 3 — Configure Git with your identity (one-time)
Open PowerShell and run:
```powershell
git config --global user.name "Abdul Hadi"
git config --global user.email "your@email.com"
```

---

## PART 2 — Push your project to GitHub

### Step 4 — Open PowerShell in your project folder
```powershell
cd "H:\freelancing projects\abdul-hadi-portfolio"
```

### Step 5 — Initialize Git repository
```powershell
git init
git add .
git commit -m "Initial commit: Abdul Hadi portfolio with 3D background"
```

> **What this does:** Takes a snapshot of all your files. The `.gitignore` file 
> already tells Git to ignore `node_modules`, `.env.local`, and `.next/` — 
> so your secrets and 300MB of dependencies are NOT uploaded.

### Step 6 — Create a GitHub repository
1. Go to https://github.com/new
2. Repository name: `abdul-hadi-portfolio`
3. Set to **Public** (required for free Vercel deployment)
4. Do NOT tick "Add README" or any other option
5. Click **Create repository**

### Step 7 — Connect local project to GitHub
GitHub will show you commands. Use these (replace `YourUsername`):
```powershell
git remote add origin https://github.com/YourUsername/abdul-hadi-portfolio.git
git branch -M main
git push -u origin main
```

> **What happens:** Your code is now on GitHub. You can see it at  
> `https://github.com/YourUsername/abdul-hadi-portfolio`

---

## PART 3 — Deploy on Vercel

### Step 8 — Create a Vercel account
1. Go to https://vercel.com
2. Click **Sign Up** → choose **Continue with GitHub**
3. Authorize Vercel to access your GitHub

### Step 9 — Import your project
1. On Vercel dashboard, click **Add New → Project**
2. Find `abdul-hadi-portfolio` in the list → click **Import**
3. Vercel auto-detects Next.js ✓

### Step 10 — Add environment variables (CRITICAL)
Before clicking Deploy, scroll down to **Environment Variables** and add these one by one:

| Variable Name | Where to find it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase dashboard → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase dashboard → Settings → API → anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase dashboard → Settings → API → service_role key |
| `RESEND_API_KEY` | https://resend.com/api-keys → Create API Key |
| `RESEND_FROM_EMAIL` | e.g. `noreply@yourdomain.com` (must be verified in Resend) |
| `RESEND_TO_EMAIL` | Your inbox email that receives contact form submissions |

> ⚠️ **Important:** For `NEXT_PUBLIC_*` variables, set the Environment to **All** (Production + Preview + Development). For secret keys (`SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`), set to **Production** only.

### Step 11 — Deploy
Click **Deploy** and wait ~2 minutes. Vercel will:
1. Run `npm ci` (install dependencies)
2. Run `npm run build:ci` (type-check → lint → build)
3. If all pass → deploy your site
4. Give you a URL like `https://abdul-hadi-portfolio.vercel.app`

---

## PART 4 — CI/CD (automatic deploys after this)

From now on, **every time you push code to GitHub**, Vercel and GitHub Actions both run automatically:

```
You push code → GitHub Actions runs (type-check + lint + build)
             → If passes: Vercel deploys automatically
             → If fails: deploy is blocked, you get an email
```

### To update your site after making changes:
```powershell
cd "H:\freelancing projects\abdul-hadi-portfolio"
git add .
git commit -m "Update: describe what you changed"
git push
```
That's it. The site updates in ~2 minutes.

---

## PART 5 — Add your GitHub Actions secrets (for CI to build correctly)

The CI pipeline needs your env vars too, or the build step will fail.

1. Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret** for each:

| Secret name | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | your Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | your Supabase service role key |
| `RESEND_API_KEY` | your Resend API key |
| `RESEND_FROM_EMAIL` | your from email |
| `RESEND_TO_EMAIL` | your to email |

---

## PART 6 — Custom domain (optional)

If you have a domain (e.g. from Namecheap or GoDaddy):
1. Vercel dashboard → your project → **Settings** → **Domains**
2. Add `abdulhadi.dev` (or whatever your domain is)
3. Vercel shows you DNS records to add at your domain registrar
4. Add those records → wait 10-30 minutes → done ✓

---

## Troubleshooting

**Build fails on Vercel with "Cannot find module"**
→ Make sure `package-lock.json` is committed (it is — never add it to `.gitignore`)

**Contact form not sending emails**
→ Check that `RESEND_FROM_EMAIL` uses a domain verified in Resend (not Gmail)

**Environment variables not working**
→ After adding/changing env vars on Vercel, trigger a **Redeploy** (Vercel dashboard → Deployments → ⋯ → Redeploy)

**3D scene not showing**
→ Normal on very old browsers/GPUs — the canvas falls back to nothing gracefully

**GitHub Actions failing with "secrets not found"**
→ Make sure you added secrets in GitHub (Part 5 above), not just in Vercel
