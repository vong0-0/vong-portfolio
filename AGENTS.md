<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — Portfolio Website

This file gives any AI coding agent (Claude Code, etc.) working on this repo full context on the project, so it can build without needing to re-ask decisions already made in Week 1 planning.

---

## Project Summary

A personal portfolio website for a Frontend Developer based in Laos, built to help land a Frontend Developer role at a company in Laos. Built solo, with AI-assisted development (Claude Code).

**Target audience:** Recruiters and hiring managers at companies in Laos.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI components | shadcn/ui |
| Animation | Framer Motion (layered on top of Tailwind CSS transitions — not a full replacement) |
| Deployment | Vercel |
| Domain | vongsouvan.com (already owned, to be connected post-deploy) |

**Animation approach:** Use Tailwind CSS transitions for simple states (button/card hover — see Component Style below). Use Framer Motion specifically for: section fade-in + slide-up on scroll (Projects, Experience, Skills), and Timeline entry animations. Do not introduce GSAP or other animation libraries — out of scope for this project.

---

## Design System

### Color Palette

**Light mode**

| Token | Hex | Usage |
|---|---|---|
| `background` | `#FAF7F0` | Primary page background (warm cream) |
| `background-secondary` | `#F0ECE2` | Alternating section background (see below) |
| `text-primary` | `#1A1A1A` | Body text, headings |
| `text-secondary` | `#8A887F` | Muted/supporting text |
| `accent-primary` | `#2F4858` | Dark slate — primary buttons, links |
| `accent-secondary` | `#9E2A2B` | Auburn — secondary buttons, tags, hover states |

**Dark mode**

| Token | Hex | Usage |
|---|---|---|
| `background` | `#1B1D1F` | Primary page background |
| `background-secondary` | `#202224` | Alternating section background |
| `text-primary` | `#F5F2EA` | Body text, headings |
| `text-secondary` | `#9C988C` | Muted/supporting text |
| `accent-primary` | `#7CA0B4` | Brightened slate |
| `accent-secondary` | `#C97D4F` | Copper (NOT a brightened auburn — chosen after review because a literal brightened auburn read as too pink/coral against the cool slate primary) |

**Rule:** dark-mode accent colors must always be brightened relative to their light-mode counterpart, but always visually check against the other accent color in context — a mathematically "brightened" hue isn't always the right call.

### Alternating Section Backgrounds

Sections alternate `background` / `background-secondary` in order, to separate content without relying on borders alone:

| Section | Background |
|---|---|
| Hero | Primary |
| Projects | Secondary (+ dot-grid texture) |
| Experience | Primary |
| Skills | Secondary (+ dot-grid texture) |
| About | Primary |
| Contact / Footer | Secondary (+ dot-grid texture) |

**Dot-grid texture** (secondary-background sections only):
- Light: `radial-gradient(rgba(47,72,88,0.06) 1px, transparent 1px)`, `background-size: 14px 14px`
- Dark: `radial-gradient(rgba(124,160,180,0.10) 1px, transparent 1px)`, `background-size: 14px 14px`

Cards/components sitting on a secondary background use the *primary* background color for their own surface, so they visually lift off the texture.

### Typography

**Font:** Space Grotesk — single font family for the entire site (headings and body), using weight variation instead of a second font family. Load via `next/font`.

| Level | Desktop | Mobile | Weight |
|---|---|---|---|
| Hero | 56px | 36px | 700 |
| Section title | 40px | 28px | 700 |
| Project / card title | 24px | 20px | 500 |
| Body — large (tagline, intro) | 18px | 16px | 400 |
| Body — standard | 16px | 15px | 400 |
| Label / caption / tag | 13px | 13px | 500 |

### Spacing Scale

| Token | Value |
|---|---|
| xs | 4px |
| sm | 8px |
| md | 16px |
| lg | 24px |
| xl | 48px |
| 2xl | 96px |

**Section vertical rhythm:** 96px top/bottom padding per section (desktop), 64px (mobile). Use padding, not margin, between sections — avoids CSS margin-collapse issues.

**Content width:** max-width 1120px, centered. Side padding: 24px (mobile) / 80px (desktop).

**Grid:** 12 columns (desktop, 24px gutter), 4 columns (mobile, 16px gutter).

### Component Style

**Buttons**
- `border-radius: 8px`, no shadow
- Primary: solid fill, `accent-primary` background
- Secondary: outline, `accent-secondary` border/text
- Ghost/text link: underline only, `accent-primary` text
- Padding: 12px vertical, 24px horizontal

**Cards** (project feature blocks, contact cards, etc.)
- `border-radius: 12px`, `0.5px solid` neutral border
- No shadow by default; subtle shadow (`0 1px 3px rgba(0,0,0,0.06)`) on hover only
- Padding: 24px (desktop) / 16px (mobile)

**Tags/pills** (skills, timeline category tags)
- Padding: 6px vertical, 14px horizontal
- `border-radius: 8px`

**Navbar padding:** 20px vertical / 80px horizontal (desktop), 16px / 24px (mobile) — horizontal matches the page container's side padding.

---

## Section-by-Section Content & Layout

### Navbar
- Desktop: logo/name left, horizontal links right (Work · About · Contact)
- Mobile: logo/name left, hamburger menu right

### Hero
- Copy: "Hello. I'm [Name]." + tagline: "I'm a Frontend Developer from Laos, building clean and functional web experiences." + two buttons: "View my work" (primary), "Resume" (secondary)
- Image: real profile photo rendered as an AI-stylized "squiggle" illustration — recognizable as the real person while keeping an illustrated personality touch
- Desktop: image right of text. Mobile: image centered above text.
- Buttons: horizontal (desktop) → stacked full-width (mobile)

### Projects — Feature Block layout
- Full-width blocks, one per project, alternating left/right image placement on desktop (Project 1: image left; Project 2: image right). Mobile: stacked, image on top, same order for both, no alternating.
- Structure per project: **Title → one-sentence About → "View repo →" link**
- Preview image: browser-frame mockup (browser-tab chrome) wrapping a short looped GIF (preferred, 3–6s of one key interaction) or static screenshot fallback. Same aspect ratio (16:9) and treatment for both projects. Use realistic sample data — never placeholder/Lorem Ipsum text in screenshots.

**Project 1 — Receipt Scanner & Financial Dashboard**
> AI-powered receipt scanner that extracts expense details from a photo and visualizes spending on a dashboard — with Lao language and Kip currency support.
Tech stack: Next.js, React, TypeScript, PostgreSQL, Prisma, Better Auth, Google Gemini AI, React Query, Zustand, Recharts, Tailwind CSS, shadcn/ui

**Project 2 — TonNam Smart Restaurant System**
> A full-stack restaurant platform connecting admins, cashiers, waiters, and kitchen staff — handling orders, real-time kitchen updates, billing, and analytics in one system.
Tech stack: React, React Router, Node.js, Express.js, TypeScript, MongoDB, Mongoose, JWT, Socket.io, Zod, ExcelJS, Winston, Jest

### Experience — Vertical Timeline
- Vertical line + colored dot per entry (NOT logos/badges — those were intentionally cut to avoid trademark/copyright risk from using third-party organization/competition logos without permission)
- Each entry: year, title (WorldSkills entry title is a link), one paragraph description, small category tag (Internship / Competition / Regional) using existing accent colors only
- Chronological order:

1. **Internship — Lailaolab (2024)** · tag: Internship
   > During a one-month internship at Lailaolab, a software development company in Laos, I worked as a Frontend Developer Intern building the admin-side interface for a food delivery platform, including partial API integration — using React, React Router DOM, TanStack Query, Zustand, Tailwind CSS, and shadcn/ui in a real product codebase alongside a professional engineering team.
   *(Do not name the specific client/product — intentionally omitted.)*

2. **Dev Tour Laos — Programming Contest (2025)** · tag: Competition
   > Competed in Dev Tour Laos Programming Contest 2025, one of the country's largest developer competitions, held under the Web Technology track with support from the Ministry of Labor and Social Welfare and Lailaolab to discover Laos's top emerging developers.

3. **[WorldSkills ASEAN Manila 2025](https://worldskillsasean2025.com/) (2025)** · tag: Regional
   > Represented Laos in the Web Technologies category at WorldSkills ASEAN Manila 2025, a regional skills competition held in August 2025 — building functioning web solutions from a live brief under strict time constraints alongside some of the region's most skilled young developers.
   *(Deliberately does not mention placement/ranking — attendance/participation only, per explicit preference. Title links to the official event site.)*
   *(Note: link color — primary accent vs. secondary accent for extra emphasis — was not finalized; use primary accent, matching other links, unless told otherwise.)*

### Skills
- Wrapped tag/pill layout, grouped under three headers:
  - **Languages:** JavaScript, TypeScript
  - **Frontend:** React, Next.js, React Router, Tailwind CSS, shadcn/ui, Zustand, TanStack Query (React Query), React Hook Form, Recharts
  - **Tools & Workflow:** Git, VS Code, Claude Code, Google Antigravity
- Backend technologies (Node.js, Express, MongoDB, etc.) are intentionally NOT listed here — they appear only under each project's tech stack, since the owner is not confident claiming them as personal skills (largely AI-assisted).

### About
> Hi, I'm Vong — a frontend developer based in Laos. I got into web dev because I like turning messy ideas into something people can actually click around and use. Along the way, I got to compete at WorldSkills ASEAN, which pushed me to build faster and think clearer under pressure. These days I'm mostly working with React and Next.js, and always looking for the next thing to figure out.

### Contact / Footer
- Heading: "Let's talk" + subtitle: "Open to Frontend Developer roles in Laos"
- 4 items as a 2×2 card grid (desktop) / stacked cards (mobile), each with a small icon, label, value: **Email, Phone, GitHub, Website (vongsouvan.com)**
- No LinkedIn (intentionally removed)
- Phone number is included despite spam-risk trade-off — user's explicit decision
- Copyright bar below, separated by a top border: "© 2026 Vong Souvan. All rights reserved."

---

## Known Non-Blocking Items (from Week 1 review)

1. Experience section copy length should be identical across light/dark and desktop/mobile — some earlier mockups trimmed mobile-dark text slightly. Use the canonical copy in this file everywhere.
2. WorldSkills link color: default to primary accent (matches other links) unless changed.

## Explicitly Out of Scope for MVP (Week 2 build)

These were deliberately deferred to a "good to have" backlog, not part of the MVP:
- Deploying live demos of the two projects (repo links only for MVP)
- Repo cleanup beyond a basic README
- Dark mode toggle and multi-language support (Lao/Thai/English) — noted as later enhancements, but the color system above already includes full dark-mode values so implementing dark mode later requires no new design decisions, only wiring up the toggle.
