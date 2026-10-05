<h1 align="center">Vongsouvan Chanthasone</h1>

<p align="center">
  Personal portfolio of a frontend developer based in Laos.
  <br />
  <a href="https://vongsouvan.com">Website</a> ·
  <a href="https://github.com/vong0-0">GitHub</a>
</p>

## Overview

A responsive, single-page portfolio presenting experience, skills, about, and contact information in English and Lao. The Projects section remains in the codebase but is currently hidden from the page.

## Features

- Locale-aware routes and localized content (`/en` and `/lo`)
- Light/dark themes with persisted preference
- Motion-based entrance and timeline animations
- Responsive skill icons with hover and touch states
- Copy-to-clipboard contact cards
- Locale-aware metadata, Open Graph image, `robots.txt`, and `sitemap.xml`
- Accessible focus states and semantic controls

## Built with

Next.js 16 App Router · React 19 · TypeScript · Tailwind CSS 4 · Motion · next-intl · Lucide React

## Getting started

### Requirements

- Node.js 20.9 or later
- pnpm 10.11.1

### Run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The site URL defaults to `http://localhost:3000`, so no environment file is required for local development.

### Commands

| Command      | Description                  |
| ------------ | ---------------------------- |
| `pnpm dev`   | Start the development server |
| `pnpm lint`  | Run ESLint                   |
| `pnpm build` | Build for production         |
| `pnpm start` | Run the production server    |

## Project structure

```text
app/[locale]/       Locale-aware layout and portfolio page
app/globals.css     Theme tokens and global styles
components/home/    Portfolio sections
components/layout/  Header and quick links
constants/          Contact details, links, and skill definitions
i18n/               Locale routing and message loading
lib/                Metadata, site URL, and shared utilities
messages/           English and Lao content
public/images/      Profile and Open Graph images
```

## Content and configuration

- Edit translated copy in `messages/en.json` and `messages/lo.json`.
- Update contact details, external URLs, and skill definitions in `constants/index.ts`.
- Set `NEXT_PUBLIC_SITE_URL` to the canonical site origin for deployment. It is public configuration, not a secret; do not put credentials in `NEXT_PUBLIC_*` variables.
- Deploy on Vercel and set `NEXT_PUBLIC_SITE_URL` to `https://vongsouvan.com` in the project environment.
