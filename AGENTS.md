<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — Project Guide

This file contains only durable project context and working rules. Verify the code when details may have changed; keep this guide concise and update it when project structure or conventions change.

## Project

- Personal portfolio for Vongsouvan Chanthasone, a frontend developer in Laos.
- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Motion, and `next-intl`.
- Use pnpm (`pnpm@10.11.1`); deployed on Vercel at `https://vongsouvan.com`.
- Keep personal claims accurate. Do not add backend technologies as personal skills or add organization logos/badges without approval.

## Current structure

- `app/[locale]/page.tsx` renders Hero → Experience → Skills → About → Contact.
- Projects code remains in `components/home/projects-section.tsx`, but Projects is intentionally not rendered and its quick link is hidden. Do not re-enable without approval.
- `components/layout/header-container.tsx` wraps shared header children; `appearance-language-controls.tsx` handles theme and language controls.
- `components/layout/quick-link-section.tsx` is rendered by the Hero and links to `#timeline`, `#skills`, `#about`, and `#contact`.

## Source of truth

| Area | Files |
| --- | --- |
| Locale routing and messages | `i18n/routing.ts`, `i18n/request.ts`, `proxy.ts`, `messages/{en,lo}.json` |
| Portfolio content and links | `constants/index.ts`, `messages/{en,lo}.json` |
| Page sections | `components/home/` |
| Header and shared UI | `components/layout/`, `components/ui/shared/` |
| Theme, typography, and utilities | `app/globals.css`, `lib/utils.ts` |
| Metadata and canonical URL | `lib/metadata.ts`, `lib/site-url.ts`, `app/[locale]/layout.tsx` |

## Working rules

- Before changing Next.js APIs or conventions, read the relevant installed guide under `node_modules/next/dist/docs/`; this project uses Next.js 16.3.4 and may differ from older examples.
- Keep user-facing copy localized in both `messages/en.json` and `messages/lo.json`. Preserve array-shaped About paragraphs so locales can have different paragraph counts.
- Keep locale-dependent metadata in `lib/metadata.ts`: descriptions come from messages, `og:locale` is `en_US`/`lo_LA`, and hreflang alternates cover `en`, `lo`, and `x-default`.
- Contact values and external URLs live in `constants/index.ts`; localized labels and copy feedback live in messages.
- Use existing CSS variables/Tailwind tokens in `app/globals.css`. The design uses mostly square, bordered surfaces; avoid global rounded corners or shadows without checking the design first.
- Prefer Tailwind transitions for simple states and Motion for entrance/scroll animations. Respect reduced-motion behavior and use `viewport={{ once: true }}` for one-time scroll effects where appropriate. Do not add another animation library.
- Use semantic links/buttons, preserve keyboard focus styles, and mark decorative icons `aria-hidden`.
- If code and this guide disagree, trust verified code and update this guide as part of the same task.

## Design essentials

- Space Grotesk is the primary font; Noto Sans Lao supports Lao text.
- Shared content width is 1120px (`max-w-280`); section horizontal padding is generally 24px mobile and 80px desktop.
- Light/dark color tokens and section-specific textures are defined in `app/globals.css`; do not hardcode replacements where a token exists.
- Keep Skills honest and aligned with the owner-approved content. Project preview placeholders and current Experience entries are intentional unless explicitly requested otherwise.

## Configuration and commands

- `NEXT_PUBLIC_SITE_URL` is public configuration for metadata, robots, and sitemap; it defaults to `http://localhost:3000`. Never place secrets in `NEXT_PUBLIC_*` variables.
- Common commands: `pnpm dev`, `pnpm lint`, `pnpm build`, `pnpm start`.
- `app/robots.ts` and `app/sitemap.ts` generate crawler files. The Open Graph image is under `public/images/`.
