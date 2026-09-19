# Vongsouvan Chanthasone — Portfolio

Personal portfolio website for Vongsouvan Chanthasone, a frontend developer based in Laos. The site showcases selected projects, experience, skills, and contact details in a responsive single-page experience.

## Links

- Website: [vongsouvan.com](https://vongsouvan.com)
- GitHub: [github.com/vong0-0](https://github.com/vong0-0)

## Features

- Responsive layout for desktop, tablet, and mobile
- Light and dark themes with persisted theme preference
- Scroll-based section and timeline animations with Motion
- Responsive skill icon colors: grayscale-to-color on hover-capable devices and full color on touch devices
- Copy-to-clipboard contact cards
- SEO metadata, Open Graph image, `robots.txt`, and `sitemap.xml`
- Optimized profile image served as WebP
- Accessible focus states and semantic interactive elements

## Tech Stack

- Next.js 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS 4
- Motion for React animations
- Lucide React icons
- shadcn/tw-animate CSS utilities
- Vercel deployment

## Getting Started

### Prerequisites

- Node.js compatible with Next.js 16
- pnpm 10.11.1 or a compatible pnpm version

### Installation

```bash
pnpm install
```

Create a local environment file from the example:

```bash
cp .env.example .env.local
```

On Windows, copy `.env.example` to `.env.local` manually if the `cp` command is unavailable.

Set the site URL in `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://vongsouvan.com
```

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
pnpm dev       # Start the development server
pnpm lint      # Run ESLint
pnpm build     # Create an optimized production build
pnpm start     # Start the production server
```

## Project Structure

```text
app/
  layout.tsx       Root layout, metadata, fonts, and theme initialization
  page.tsx         Main single-page composition
  globals.css      Design tokens, theme styles, and shared component styles
  robots.ts        Generated robots.txt
  sitemap.ts       Generated sitemap.xml

components/
  home/             Portfolio sections
  icons/            Inline SVG skill icons
  layout/           Header actions and quick links

constants/
  index.ts          Portfolio content, contact details, projects, and skills

lib/
  site-url.ts       Shared site URL configuration
  utils.ts          Shared class name utility

public/images/
  profile-image.webp
  og-image.png
```

## Updating Portfolio Content

Most portfolio content is defined in [constants/index.ts](./constants/index.ts), including:

- Hero profile information
- About text
- Contact details
- Project descriptions and repository links
- Experience timeline entries
- Skill names, links, and colors

Section layout and behavior live in `components/home/`.

## Environment Variables

| Variable | Required | Description |
|---|---:|---|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical site origin used by metadata, robots, and sitemap generation |

This value is public configuration, not a secret. Do not place API keys or private credentials in `NEXT_PUBLIC_*` variables.

## Deployment

The project is configured for Vercel:

1. Import the repository into Vercel.
2. Add `NEXT_PUBLIC_SITE_URL` to the Production environment.
3. Set it to `https://vongsouvan.com`.
4. Deploy with the default Next.js build settings.

The production build command is:

```bash
pnpm build
```
