# Deploying A88 Finance to Vercel

This app is a Next.js 16 (App Router) project with a Prisma 7 + PostgreSQL
backend and a custom-auth admin dashboard. Below is everything needed to ship a
preview for client review.

## Frontend-only preview (no database needed)

Just want to show the client the public site? **You can deploy with no
environment variables at all.** The app degrades gracefully:

- Marketing pages (home, about, services, contact, …) are fully static.
- The blog falls back to the built-in demo posts when there's no database.
- `/dashboard` simply redirects to a login screen (the dashboard isn't reachable
  without a DB, and it's noindexed) — the client won't stumble into it.

Just push to Git, import to Vercel, and deploy. Optionally set
`NEXT_PUBLIC_SITE_URL` to the deployed URL so canonical/OG/sitemap links are
correct. Add the database + other variables later (below) when you want the
dashboard and real blog content.

---

## 1. Provision a database (for the full app)

The local `localhost:5432` database in your `.env` **will not work on Vercel** —
you need a hosted Postgres. [Neon](https://neon.tech) is the easiest:

1. Create a Neon project (pick a region close to your Vercel region).
2. Copy the **pooled** connection string (the host contains `-pooler`). Pooling
   matters for serverless — it avoids exhausting DB connections.
3. It looks like:
   `postgresql://USER:PASSWORD@ep-xxx-pooler.REGION.aws.neon.tech/DB?sslmode=require`

Migrations run automatically on each deploy **once `DATABASE_URL` is set in
Vercel** — the build runs `prisma migrate deploy` whenever the URL is present
(and skips it with a warning if it isn't, so the build never hard-fails on a
half-configured project).

## 2. Optional services

- **Cloudinary** (blog image uploads): create an account, grab Cloud name, API
  key, API secret from the dashboard. Without these, the editor works but image
  uploads show a friendly "not configured" message.
- **Resend** (contact / apply / newsletter emails): create an API key and verify
  a sending domain.

## 3. Put the project in Git

Vercel deploys from a Git repo:

```bash
git init
git add .
git commit -m "A88 Finance app"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

`.env`, `node_modules`, `.next`, and `src/generated` are already gitignored — no
secrets or build artifacts get committed.

## 4. Import to Vercel

1. In Vercel, **Add New → Project** and import the repo.
2. Framework preset auto-detects as **Next.js** (also pinned in `vercel.json`).
   Leave the build/install commands as the defaults.
3. Add the environment variables below (for **Production** and **Preview**).
4. **Deploy.**

## 5. Environment variables

| Variable                | Required          | Notes                                                    |
| ----------------------- | ----------------- | -------------------------------------------------------- |
| `DATABASE_URL`          | ✅ yes            | Neon **pooled** Postgres URL (`?sslmode=require`)        |
| `AUTH_SECRET`           | ✅ yes            | Session JWT secret. Generate: `openssl rand -base64 32`  |
| `ADMIN_EMAIL`           | ✅ yes            | Seeded admin login email                                 |
| `ADMIN_PASSWORD`        | ✅ yes            | Seeded admin password (used only on first creation)      |
| `NEXT_PUBLIC_SITE_URL`  | ✅ yes            | Your deployed URL, e.g. `https://a88finance.vercel.app`  |
| `CLOUDINARY_CLOUD_NAME` | for image uploads | From the Cloudinary dashboard                            |
| `CLOUDINARY_API_KEY`    | for image uploads |                                                          |
| `CLOUDINARY_API_SECRET` | for image uploads |                                                          |
| `RESEND_API_KEY`        | for form emails   | From Resend                                              |
| `RESEND_FROM_EMAIL`     | for form emails   | Verified sender, e.g. `A88 Finance <noreply@yourdomain>` |
| `LEAD_INBOX_EMAIL`      | for form emails   | Inbox that receives enquiries                            |

> **Set every variable for all environments** (toggle Production, Preview, and
> Development when adding each one in Vercel). If `DATABASE_URL` is missing from
> the environment being built, the migration step is skipped and the app won't
> have any tables — set it, then redeploy.
>
> Set `NEXT_PUBLIC_SITE_URL` to the real deployment URL so canonical links, the
> sitemap, and Open Graph tags are correct. After the first deploy you'll know
> the URL — set it, then redeploy.

## 6. After it's live

- The admin account is seeded automatically from `ADMIN_EMAIL` / `ADMIN_PASSWORD`
  on first server start.
- Sign in at **`/dashboard/login`**.
- Change the admin password from **Admin → Users → (your account) → Edit**.
- `/dashboard` and `/api` are disallowed in `robots.txt`; the admin is also noindexed.

## Notes / gotchas

- **No Prisma engine binaries.** Prisma 7 uses a driver adapter (`@prisma/adapter-pg`)
  - a WASM query compiler, so nothing platform-specific needs configuring for
    Vercel's Linux runtime.
- **Blog data is fetched at runtime**, not at build (Prisma 7's query compiler
  can crash Next's build workers during static prerender). The blog index and
  sitemap are `force-dynamic`; individual posts/category/tag pages are on-demand
  ISR (cached after first hit, revalidated on edit). SEO is unaffected — pages
  are fully server-rendered.
- If you'd rather not run migrations during the Vercel build, remove
  `node scripts/migrate-deploy.mjs` from the `build` script and run
  `npm run db:deploy` manually against your production `DATABASE_URL`.
