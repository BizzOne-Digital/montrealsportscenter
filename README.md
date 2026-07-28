# Montreal Sports Center — Full Stack MERN Project

Built by **BizzOne Digital** for Bonifacio Lingon.

---

## Project Structure

```
msc-project/
├── backend/          # Express.js REST API (port 5000)
└── frontend/         # React.js public website + admin panel (port 3000)
    └── src/admin/     # Admin panel, mounted at /admin inside the same app
```

The admin panel is part of the frontend app (not a separate deployment) — it's reachable at `/admin` on the same domain as the public site.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js, Express.js, MongoDB/Mongoose |
| Frontend + Admin | React.js 18, React Router v6 (single app) |
| Images | Cloudinary (upload, delete, transform) |
| Auth | JWT (JSON Web Token) |
| Fonts | Google Fonts (Space Grotesk + Inter) |
| Images (Unsplash) | Used for default section backgrounds |

---

## Quick Start

### 1. Clone the project and install dependencies

```bash
npm run install:all
```

### 2. Configure backend environment

Copy the example env file and fill in your credentials:

```bash
cd backend
cp .env.example .env
```

Edit `.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/msc_db
JWT_SECRET=pick_a_long_random_string_here
JWT_EXPIRE=7d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

ADMIN_EMAIL=admin@montrealsportscenter.ca
ADMIN_PASSWORD=Admin@MSC2026
```

### 3. Seed the database with default content

```bash
npm run seed
```

This creates:
- Admin account
- Hero section with default content
- 6 programs
- 3 membership tiers
- 8 court pricing rows
- 4 special offers
- 3 testimonials
- Site settings

### 4. Run the development servers

Open 2 terminals:

```bash
# Terminal 1 — Backend API
npm run dev:backend

# Terminal 2 — Frontend (public site + admin panel)
npm run dev:frontend
```

### Access URLs

| App | URL |
|-----|-----|
| Public Website | http://localhost:3000 |
| Admin Panel | http://localhost:3000/admin |
| Backend API | http://localhost:5000 |

---

## Admin Panel Login

Default credentials (set in .env before seeding):

- **Email:** admin@montrealsportscenter.ca
- **Password:** Admin@MSC2026

---

## Admin Panel Features

| Section | What You Can Do |
|---------|----------------|
| Dashboard | View stats, recent inquiries, quick links |
| Hero Section | Edit headline, subheadline, mission, CTA buttons, stats, background image |
| Programs | Add/edit/delete programs with Cloudinary image upload |
| Memberships | Manage Bronze/Silver/Gold tiers, pricing, features |
| Pricing | Add/edit court pricing with off-peak and peak rates |
| Special Offers | Create/manage launch offers with images and expiry dates |
| Inquiries | View, filter, update status, add internal notes |
| Gallery | Upload images to Cloudinary by category, reorder, show/hide |
| Team | Add team members with headshots (Cloudinary) |
| Testimonials | Add/edit/feature testimonials with avatars |
| Blog / News | Create posts with rich content, categories, tags, publish/unpublish |
| Site Settings | Logo, contact info, social links, announcement bar, SEO, operating hours |

---

## Cloudinary Setup

1. Create a free account at https://cloudinary.com
2. Go to Dashboard and copy your Cloud Name, API Key, API Secret
3. Paste into your `.env` file
4. Images are auto-organized into folders: `msc/programs/`, `msc/gallery/`, `msc/hero/`, etc.
5. Deleting an item in admin also deletes the image from Cloudinary

---

## API Endpoints Reference

### Public (no auth required)
```
GET  /api/hero
GET  /api/programs
GET  /api/memberships
GET  /api/pricing
GET  /api/testimonials
GET  /api/team
GET  /api/gallery
GET  /api/offers
GET  /api/blog
GET  /api/blog/:slug
GET  /api/settings
POST /api/inquiries
```

### Protected (requires Bearer token)
```
POST   /api/auth/login
GET    /api/auth/me
PUT    /api/auth/profile
PUT    /api/auth/change-password
GET    /api/dashboard/stats
GET    /api/programs/admin
POST   /api/programs
PUT    /api/programs/:id
DELETE /api/programs/:id
... (same pattern for all entities)
POST   /api/upload
DELETE /api/upload
```

---

## Deployment on Vercel

This repo deploys as **two separate Vercel projects** from the same GitHub repo — one for `backend/`, one for `frontend/`. Both folders already contain a `vercel.json`.

### 1. Backend project

1. On [vercel.com](https://vercel.com), **Add New Project** → import this repo.
2. Set **Root Directory** to `backend`.
3. Framework preset: **Other** (Vercel will use `backend/vercel.json`, which runs `server.js` as a serverless function via `@vercel/node`).
4. Add Environment Variables (Project Settings → Environment Variables) — same values as your local `backend/.env`:
   - `MONGODB_URI`
   - `JWT_SECRET`, `JWT_EXPIRE`
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
   - `ADMIN_EMAIL`, `ADMIN_PASSWORD` (only needed if you run the seeder against this environment)
   - `FRONTEND_URL` — the frontend project's URL once you have it (comma-separate multiple, e.g. your custom domain + the `.vercel.app` preview URL). `*.vercel.app` origins are always allowed automatically.
5. Deploy. Note the resulting URL, e.g. `https://msc-backend.vercel.app`.

### 2. Frontend project (public site + `/admin`)

1. **Add New Project** again → same repo, but set **Root Directory** to `frontend`.
2. Framework preset: **Create React App** (auto-detected). `frontend/vercel.json` adds the SPA rewrite so client-side routes like `/programs` or `/admin/hero` work on refresh/direct link.
3. Add Environment Variable:
   - `REACT_APP_API_URL` = `https://msc-backend.vercel.app/api` (your backend URL from step 1, **including `/api`**)
4. Deploy. This single deployment serves both the public website and the admin panel at `/admin`.
5. Go back to the **backend** project's `FRONTEND_URL` env var and set it to this frontend's URL, then redeploy the backend so CORS allows it.

### Notes / limitations

- **File uploads on Vercel:** images upload directly to Cloudinary (no local disk writes), which is serverless-safe. However, Vercel's Hobby plan caps request body size around 4.5MB — a very large photo upload from the admin panel could be rejected at the platform level even though the app's own limit is set to 10MB. If large uploads are important, either compress images before upload or host the backend on a platform without that cap (Render, Railway, a VPS).
- **MongoDB Atlas:** make sure Atlas Network Access allows connections from anywhere (`0.0.0.0/0`), since Vercel serverless functions don't have static IPs.
- **Seeding production data:** run `npm run seed` locally with `MONGODB_URI` pointed at your production Atlas cluster (don't run the seeder from within a Vercel function).

---

## Client Contact

- **Client:** Bonifacio Lingon
- **Email:** jrlingon@gmail.com
- **Phone:** 514-791-0738
- **Site:** montrealsportscenter.ca

---

*Built with by BizzOne Digital — Digital Marketing, Sales, Automation & Web Development*
