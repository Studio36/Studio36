# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server with Turbopack
npm run build        # prisma generate + next build
npm run vercel-build # prisma generate + prisma db push + next build (for deployment)
npm run lint         # ESLint via next lint
```

There are no test commands configured.

## Architecture Overview

Studio36 is a full-stack photography portfolio and content management platform built with **Next.js 15 App Router**, **React 19**, **MongoDB** (via Prisma), and **AWS S3** for media.

### Routing: Localized App Router

All routes live under `app/[locale]/`, where `[locale]` is `en` or `ro` (Romanian default). Middleware (`middleware.ts`) uses `next-intl/middleware` for locale handling — locale detection is disabled (no auto-redirect).

Localized route paths are defined in `i18n/routing.ts`:
- Projects: `/projects` (en) / `/proiecte` (ro)
- Photoset: `/photoset/[id]` (en) / `/fotoset/[id]` (ro)

Translations live in `messages/en.json` and `messages/ro.json`.

### Data Layer

**Prisma + MongoDB** — schema in `prisma/schema.prisma`. Models: `User` (credentials auth) and `Photoset` (title, service enum, images array).

**Server actions** in `app/[locale]/actions/`:
- `photosetActions.tsx` — CRUD for photosets
- `imageActions.tsx` — generates AWS S3 presigned URLs for direct client-side uploads

### Authentication

NextAuth.js 4 with a credentials provider. Config in `lib/auth.ts`. Routes at `app/[locale]/auth/[...nextauth]/`. Admin routes are protected via session checks.

### Styling & Animation

- **Tailwind CSS** with custom colors: black `#181818`, white `#f1f1f1`, red `#FF3F3F`; custom font: Hedwig Letters Serif
- **shadcn/ui** components (Radix UI primitives) in `components/ui/`
- **Motion** (Framer Motion fork) and **GSAP** for animations
- **Lenis** for smooth scrolling (`SmoothScroll.tsx` wraps the app)
- **next-themes** for dark mode (class-based)

### Key Conventions

- Feature components are co-located under `app/[locale]/components/<feature>/`
- Shared/reusable UI primitives go in `components/ui/` (shadcn pattern)
- Use `'use server'` for server actions, `'use client'` for interactive/animated components
- Images are served via CloudFront (configured in `next.config.ts` as a remote pattern)
- Path alias `@/` maps to the repo root
