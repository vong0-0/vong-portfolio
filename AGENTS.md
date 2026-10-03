<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — Portfolio Website

This file describes the implemented state of the portfolio. If the code and this document disagree, verify the code and update this document as part of the same task.

## Project Summary

Personal portfolio website for Vongsouvan Chanthasone, a frontend developer based in Laos. The site is a responsive single-page portfolio for recruiters and hiring managers, with sections for projects, experience, skills, about, and contact.

The project is built solo with AI-assisted development. Keep the content honest: do not claim backend technologies as personal skills unless the owner explicitly approves it.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.3.4 App Router |
| Language | TypeScript |
| Styling | Tailwind CSS 4 with custom tokens in `app/globals.css` |
| UI utilities | shadcn/tw-animate CSS imports; no shared shadcn UI components are currently used |
| Icons | Lucide React and inline SVG skill icons |
| Animation | Motion for React (`motion`, imported from `motion/react`) plus Tailwind transitions |
| Package manager | pnpm 10.11.1 |
| Deployment | Vercel |
| Canonical domain | `https://vongsouvan.com` |

### Animation approach

Use Tailwind CSS transitions for simple hover, active, and focus states. Use Motion for section and timeline animations:

- Header and hero fade/slide into view
- Project cards slide in from alternating left and right directions
- Experience entries and timeline dots animate into view
- Skills, About, and Contact content fades/slides into view

Use `viewport={{ once: true }}` for scroll-triggered animations where appropriate. Do not introduce GSAP or another animation library.

## Design System

### Color Palette

The color tokens are defined in `app/globals.css` using CSS variables and exposed through Tailwind theme tokens.

**Light mode**

| Token | Hex | Usage |
|---|---|---|
| `background` | `#FAF7F0` | Primary page background |
| `background-secondary` | `#F0ECE2` | Projects, Skills, and Contact surfaces |
| `text-primary` | `#1A1A1A` | Body text and headings |
| `text-secondary` | `#8A887F` | Muted/supporting text |
| `accent-primary` | `#2F4858` | Primary controls and links |
| `accent-secondary` | `#9E2A2B` | Secondary accent |

**Dark mode**

| Token | Hex | Usage |
|---|---|---|
| `background` | `#1B1D1F` | Primary page background |
| `background-secondary` | `#202224` | Secondary section surfaces |
| `text-primary` | `#F5F2EA` | Body text and headings |
| `text-secondary` | `#9C988C` | Muted/supporting text |
| `accent-primary` | `#7CA0B4` | Primary controls and links |
| `accent-secondary` | `#C97D4F` | Secondary accent |

### Section surfaces

| Section | Current implementation |
|---|---|
| Hero | Primary background |
| Projects | Secondary background |
| Experience | Primary background inherited from the page |
| Skills | Secondary background |
| About | Primary background |
| Contact | Secondary background with dot-grid texture |

The dot-grid utility exists in `app/globals.css` and is currently used by Contact. Cards use the primary background to lift them from secondary surfaces.

### Typography and layout

- Font: Space Grotesk loaded through `next/font/google`
- Shared content width: `max-w-280` (1120px)
- Mobile horizontal padding: 24px
- Desktop horizontal padding: generally 80px at the top-level sections
- Shared section heading: 28px on mobile and 55px from the `md` breakpoint
- Section spacing uses padding utilities rather than margin between sections

The implemented UI uses mostly square bordered cards and controls. Do not add rounded corners or shadows globally without checking the existing visual style first.

## Current Page Structure

`app/[locale]/page.tsx` renders the sections in this order:

1. Hero
2. Projects
3. Experience
4. Skills
5. About
6. Contact

### Header and quick links

`components/layout/header-actions.tsx.tsx` currently provides:

- Light/dark theme controls
- Theme persistence through `localStorage`
- A Contact anchor button
- A localized language dropdown for English and Lao
- A top fade/slide animation

There is currently no logo/name navigation bar, hamburger menu, or resume download action.

`components/layout/quick-link-section.tsx` provides the horizontal quick links rendered over the bottom of the Hero on `xs` and larger screens.

### Hero

`components/home/hero-section.tsx` currently contains:

- An 84px circular profile image from `/images/profile-image.webp`
- Grayscale image treatment
- A localized name and Frontend Developer tagline from `messages/{locale}.json`
- Quick links positioned at the bottom of the section on larger screens

There are currently no Hero CTA buttons or resume link.

### Projects

`components/home/projects-section.tsx` renders two feature cards using translated content from `messages/{locale}.json` and repository URLs from `PROJECTS` in `constants/index.ts`:

1. Receipt Scanner & Financial Dashboard
2. TonNam Smart Restaurant System

The cards alternate image/content placement on desktop and stack on smaller screens. The preview area intentionally displays the current `GIF / screenshot` placeholder text. Repository links are configured in `constants/index.ts` for the Receipt Scanner and TonNam projects. No live demos or tech-stack list are currently rendered in the section.

### Experience

`components/home/experience-section.tsx` renders a vertical timeline using translated content from `messages/{locale}.json`. `EXPERIENCES` in `constants/index.ts` defines the translation keys and display order:

1. Dev Tour Laos — Programming Contest (2025)
2. WorldSkills ASEAN Manila 2025 (2025)
3. Internship — Lailaolab ICT Solution (2025)

Each item has a linked title that opens its external website in a new tab, a year, description, animated timeline dot, and animated entry.

Do not add third-party organization logos or badges without explicit approval.

### Skills

`components/home/skill-section.tsx` renders a responsive grid of inline SVG skill icons from `SKILL_ICONS` in `constants/index.ts`:

- HTML, CSS, JavaScript, TypeScript, React
- Next.js, Tailwind CSS, shadcn/ui, Git, GitHub
- Claude, Vite

Skill cards animate into view. On hover-capable fine-pointer devices, icons are gray until the card is hovered and then show their brand colors. On touch/no-hover devices, icons show their colors immediately. `darkColor` is used for Next.js, shadcn/ui, and GitHub in Dark mode.

### About

`components/home/about-section.tsx` reads its heading, intro, and flexible `paragraphs` array from `messages/{locale}.json`. Keep the paragraphs as an array so each locale can have any number of paragraphs without assigning content-specific keys.

### Contact and footer

`components/home/contact-section.tsx` renders four copy-to-clipboard buttons from `CONTACT_DETAILS`:

- Phone
- Email
- GitHub
- Website

The section announces copy status to screen readers and includes the copyright footer `© 2026 Vong Souvan. All rights reserved.` There is currently no contact form, email API, or backend submission flow.

## Content and configuration locations

- `constants/index.ts`: contact values, project and experience translation keys, quick-link keys, and skill colors
- `messages/{locale}.json`: localized portfolio copy for each supported locale (`en` and `lo`)
- `i18n/routing.ts`, `i18n/request.ts`, and `proxy.ts`: locale routing and message loading
- `app/globals.css`: design tokens, Dark mode variables, shared styles, dot-grid, and skill icon states
- `lib/site-url.ts`: canonical site URL configuration
- `.env.example`: environment variable template
- `public/images/`: profile and Open Graph images

### Environment variables

`NEXT_PUBLIC_SITE_URL` is public configuration used by metadata, robots, and sitemap generation:

```env
NEXT_PUBLIC_SITE_URL=https://vongsouvan.com
```

The code falls back to `http://localhost:3000` when the variable is not set. Never put API keys, database URLs, authentication secrets, or private credentials in `NEXT_PUBLIC_*` variables.

Contact values remain in `constants/index.ts`; labels and copy-status text come from `messages/{locale}.json`. If a future contact form is added, keep its provider key in a server-only environment variable such as `RESEND_API_KEY`.

## SEO and accessibility

- Metadata and Open Graph image are defined in `app/[locale]/layout.tsx`
- `metadataBase` uses `SITE_URL`
- `app/robots.ts` generates `robots.txt`
- `app/sitemap.ts` generates `sitemap.xml`
- Use semantic buttons for actions and links for navigation
- Preserve visible focus styles and accessible labels
- Keep decorative icons `aria-hidden` where appropriate

## Commands

```bash
pnpm install
pnpm dev
pnpm lint
pnpm build
pnpm start
```

The project uses `pnpm` as declared by `package.json`.

## Audit notes

The current source-code issues identified in the latest audit have been addressed:

- Quick-link targets now match the `skills` and `timeline` section IDs.
- The Experience component filename and import use the correct `experience` spelling.
- Project repository constants point to the supplied GitHub repositories.
- The Hero apostrophe and theme state update no longer produce the reported ESLint errors.

The project preview placeholder and current Experience data are intentional and should not be changed without an explicit content or design request.

## Out of scope for the current MVP

- Live demos for the two projects
- Contact form/backend integration
- Multilingual support
- CMS-driven content editing
- Adding backend technologies to the personal Skills section
- GSAP or another animation library alongside Motion
