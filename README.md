# Orbit

AI-powered alumni networking platform — Hackathon 2026.

## Stack

- Next.js 16 (App Router)
- React 19 · TypeScript
- Tailwind CSS v4
- Firebase (Phase 2+)
- Vercel

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Phase roadmap

| Phase | Scope | Status |
|-------|-------|--------|
| 1 | Foundation, design system, landing page | Complete |
| 2 | Firebase auth, session, middleware | Complete |
| 3–12 | Full app (onboarding, shell, dashboard, directory, profiles, networking, messaging, introductions, opportunities, events, referrals, admin) | Complete |

## Phase 2 — Authentication

Routes:

- `/login` — Sign in (Google + college email)
- `/signup` — Create account
- `/forgot-password` — Password reset
- `/verify-email` — Email verification gate
- `/app` — Protected route (session test)

Deploy Firestore and Storage rules:

```bash
firebase deploy --only firestore:rules,storage
```

Set all `NEXT_PUBLIC_FIREBASE_*` and `FIREBASE_*` variables in Vercel. Configure `NEXT_PUBLIC_ALLOWED_EMAIL_DOMAINS` with your college domains (comma-separated).


- **Product:** Orbit
- **Theme:** Dark default, light mode supported
- **Accent:** Blue `#2563EB`
