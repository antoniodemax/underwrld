# UNDERWRLD

Public website and admin dashboard for the UNDERWRLD music production studio.
Vite + React + TypeScript on the front; Vercel serverless functions, middleware and Upstash Redis on the back.

## Layout

The repo has three tiers. They are kept apart by directory, by TypeScript project and by lint config,
and nothing under `src/` imports from the server tiers.

```
api/                     BACKEND — Vercel serverless functions (the file path is the URL)
  inquiries.ts             POST   /api/inquiries              public contact / session-request form (rate-limited)
  auth/google.ts           POST   /api/auth/google            Google sign-in → signed session cookie
  auth/logout.ts           POST   /api/auth/logout
  auth/me.ts               GET    /api/auth/me                session probe
  admin/ping.ts            GET    /api/admin/ping
  admin/inquiries/         GET list · PATCH status · DELETE   admin only (session cookie)
lib/                     BACKEND — shared server code
  http.ts                  JSON responses, CSRF/origin checks, body parsing, session reading
  session.ts               signed HttpOnly cookie mint/verify, admin authorization
  inquiries.ts             Upstash Redis data layer, validators, rate limiter
middleware.ts            BACKEND — security headers (CSP etc.) and the /admin/* login redirect
scripts/                 local dev tooling only

src/pages/MarketingSite.tsx      PUBLIC SITE entry
src/components/*.tsx             public sections (Hero, Services, Work, Contact, Footer, ...)
src/data/catalogue.ts            Spotify releases shown in Work
src/hooks/useReveal.ts           scroll-reveal animation

src/pages/admin/                 ADMIN pages
src/components/admin/            admin layout and widgets
src/data/adminNav.ts             admin sidebar links and identity
src/hooks/useInquiries.ts        admin data hook (backed by the API)
src/lib/adminAuth.ts             fetch wrappers for /api/auth/*
src/lib/inquiryStore.ts          fetch wrappers for /api/inquiries and /api/admin/inquiries (also used by the public form)
src/lib/settingsStore.ts         cosmetic admin preferences (localStorage only)

src/App.tsx, src/main.tsx, src/index.css, src/components/{Logo,icons}.tsx   shared by both UIs
```

`api/`, `lib/` and `middleware.ts` must stay at the repo root — Vercel discovers them by location.

## How the pieces connect

- The browser talks to the backend only through `fetch('/api/...')` in `src/lib/adminAuth.ts` and `src/lib/inquiryStore.ts`.
- Inquiries and session requests are stored in Redis (`lib/inquiries.ts`). Nothing about them lives in the browser.
- Admin routes are gated twice: `middleware.ts` redirects unauthenticated `/admin/*` page loads to `/admin/login`, and every `/api/admin/*` function verifies the session cookie itself.
- State-changing requests must be same-origin JSON with the `X-Requested-With: underwrld-admin` header (`lib/http.ts`).
- `src/lib/inquiryStore.ts` mirrors the `Inquiry` types from `lib/inquiries.ts` on purpose; keep them in sync.

## Environment variables

Copy `.env.example` to `.env` for local work. Values are never committed.

| Variable | Scope | Purpose |
|---|---|---|
| `VITE_GOOGLE_CLIENT_ID` | public (bundled) | Google OAuth client ID for the admin login button |
| `SESSION_SECRET` | server | Signs admin session cookies; rotating it signs everyone out |
| `ADMIN_GOOGLE_SUB` / `ADMIN_GOOGLE_EMAIL` | server | Which Google account may sign in (prefer `SUB` once known) |
| `KV_REST_API_URL` / `KV_REST_API_TOKEN` | server | Upstash Redis, injected by the Vercel integration (`UPSTASH_REDIS_REST_*` also accepted) |

## Working locally

```sh
npm install
vercel env pull .env      # pulls the variables above from the linked Vercel project
vercel dev                # runs Vite plus the functions and middleware together
```

`npm run dev` starts Vite alone (public site only, no API). Before committing:

```sh
npm run build             # tsc -b (all three TS projects) + vite build
npm run lint
```

## Deploying

Pushes to `main` deploy to production on Vercel; other branches get preview deployments.
Environment variables and the Redis store are managed in the Vercel project, not in the repo.
