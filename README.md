# Cyberfun Software Services — Website

Full-stack company website with admin panel.

## 🚀 Quick Deploy to Vercel

### Step 1: Run Database SQL
1. Go to **neon.tech** → your project → **SQL Editor**
2. Paste the entire contents of `setup-database.sql`
3. Click **Run** — you'll see "Setup complete!" at the bottom

### Step 2: Set Vercel Environment Variables
Go to **Vercel → Project → Settings → Environment Variables** and add:

| Name | Value |
|------|-------|
| `DATABASE_URL` | `postgresql://neondb_owner:npg_0EYqznM6bglW@ep-flat-boat-aoq684i4-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require` |
| `AUTH_SECRET` | `cyberfun-super-secret-jwt-key-2024-change-this-in-production-vercel` |

### Step 3: Deploy
Push to GitHub → Import in Vercel → Deploy

### Admin Access
- URL: `https://your-site.vercel.app/admin/login`
- Email: `admin@cyberfunsoftware.com`
- Password: `Admin@Cyberfun2024!`

## Tech Stack
- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Prisma ORM**
- **PostgreSQL (Neon)**
- **Custom JWT auth (jose)**
- **bcryptjs**
- **Recharts**

## Project Structure
```
app/
  (site)/          # Public website
    page.tsx       # Home
    about/
    services/
    portfolio/
    blog/
    careers/
    contact/
  admin/           # Protected admin panel
    login/
    dashboard/
    contacts/
    applications/
    jobs/
    projects/
    blog/
    team/
  api/
    auth/login/    # POST - login
    auth/logout/   # POST - logout
    contact/       # POST - submit contact form
    apply/         # POST - job application
    admin/         # Admin CRUD endpoints
components/
  home/            # Hero, Stats, Services, etc.
  admin/           # Sidebar, Topbar, data tables
  navbar.tsx
  footer.tsx
  ui.tsx           # Shared UI components
lib/
  prisma.ts
  session.ts       # JWT session management
  utils.ts
  admin-guard.ts
prisma/
  schema.prisma
setup-database.sql # Run this in Neon SQL Editor
```
