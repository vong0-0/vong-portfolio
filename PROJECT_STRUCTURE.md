# Project Structure Notes

This document explains how the portfolio currently works. It is local project documentation and is intentionally ignored by Git.

## 1. Overall architecture

The project is a single-page Next.js App Router application:

```text
app/layout.tsx
  └── app/page.tsx
        ├── HeroSection
        ├── ProjectSection
        ├── ExperienceSection
        ├── SkillSection
        ├── AboutSection
        └── ContactSection
```

There is no database, API route, authentication layer, CMS, or backend integration in the current MVP. Portfolio content is stored locally in TypeScript constants and rendered by React components.

## 2. File structure

```text
app/
├── layout.tsx              Root layout, fonts, theme script, metadata
├── page.tsx                Composes the homepage sections
├── globals.css             Tailwind imports, design tokens, themes, shared CSS
├── robots.ts               Generates /robots.txt
└── sitemap.ts              Generates /sitemap.xml

components/
├── home/
│   ├── hero-section.tsx
│   ├── projects-section.tsx
│   ├── experience-section.tsx
│   ├── skill-section.tsx
│   ├── about-section.tsx
│   └── contact-section.tsx
├── icons/
│   └── skill-icons.tsx     Inline SVG skill icon components
└── layout/
    ├── header-actions.tsx.tsx
    └── quick-link-section.tsx

constants/
└── index.ts                 Content and shared configuration

lib/
├── site-url.ts              Canonical site URL from environment variables
└── utils.ts                 Shared class-name utility

public/images/
├── profile-image.webp       Profile image used by the Hero
└── og-image.png             Open Graph preview image

configuration files at the project root:
├── next.config.ts           Next.js configuration and React Compiler
├── postcss.config.mjs       PostCSS/Tailwind integration
├── eslint.config.mjs        ESLint configuration
├── components.json          shadcn configuration
├── tsconfig.json            TypeScript configuration
└── package.json             Scripts and dependencies
```

## 3. Main patterns

### App Router composition

`app/page.tsx` is intentionally small. It composes the page from section components instead of containing the full page markup. Each major visual section has its own file under `components/home/`.

The root layout owns app-wide concerns:

- Space Grotesk font loading
- Global CSS import
- Theme initialization before the page is displayed
- Site metadata
- Header actions

### Content and presentation are separated

`constants/index.ts` is the single source of truth for most portfolio content:

- `HERO`
- `ABOUT`
- `CONTACT_DETAILS`
- `PROJECTS`
- `EXPERIENCES`
- `QUICK_LINKS`
- `SKILL_ICONS`

Section components import these values and focus on rendering, layout, interaction, and animation. When updating portfolio copy, prefer changing `constants/index.ts` instead of duplicating text inside a component.

### Section component pattern

Most sections follow this shape:

```tsx
export default function Section() {
  return (
    <section id="section-id">
      <div className="content-max-width ...">
        <Heading />
        <Content />
      </div>
    </section>
  );
}
```

Use semantic HTML, keep the section `id` stable for navigation, and use the shared `content-max-width` and `section-header` classes where appropriate.

### Client components only where needed

Sections use `"use client"` when they need Motion or browser interactivity:

- Motion animations in Hero, Projects, Experience, Skills, About, and Contact
- Clipboard state in Contact
- Theme state and `localStorage` in HeaderActions

Keep static route composition and metadata in Server Components when possible.

### Animation pattern

Animations use the `motion` package and imports from `motion/react`.

Common pattern:

```tsx
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
  ...
</motion.div>
```

Use Motion for section entry and timeline animation. Use Tailwind transitions for hover, active, focus, and other simple visual states. Do not add GSAP or another animation library.

### Styling pattern

Tailwind utility classes are used for component layout and responsive behavior. Shared design values and custom states live in `app/globals.css`:

- Light and Dark mode CSS variables
- Portfolio color tokens
- Dot-grid background
- Shared content width and section heading styles
- Skill icon grayscale/color behavior

For a style used by one component only, prefer a Tailwind class. Add a named CSS class to `globals.css` only when the behavior is shared, complex, or needs a media query that is difficult to express inline.

### Theme pattern

`HeaderActions` stores the selected theme in `localStorage` under the key `theme`. `app/layout.tsx` runs a small inline script before hydration to apply the `dark` class to the document root and reduce theme flashing.

The CSS variant is configured with:

```css
@custom-variant dark (&:is(.dark *));
```

Do not introduce a second theme state or a second storage key.

### Contact interaction pattern

Contact cards are buttons, not links. Clicking a card copies its display value to the clipboard, updates the visual state, and announces the result through an `aria-live` region.

If a real contact form is added later, keep provider credentials in server-only environment variables. Do not put API keys in `NEXT_PUBLIC_*` variables.

### SEO and site URL pattern

`lib/site-url.ts` reads `NEXT_PUBLIC_SITE_URL` and normalizes it with `URL.origin`. It falls back to `http://localhost:3000` for local development.

The shared `SITE_URL` value is used by:

- `metadataBase` and Open Graph metadata in `app/layout.tsx`
- `app/robots.ts`
- `app/sitemap.ts`

The environment template is in `.env.example`. A real `.env.local` should remain local and must not be committed.

## 4. Data flow by section

```text
constants/index.ts
        │
        ├── HERO ─────────────── HeroSection
        ├── PROJECTS ─────────── ProjectSection
        ├── EXPERIENCES ──────── ExperienceSection
        ├── SKILL_ICONS ──────── SkillSection
        ├── ABOUT ────────────── AboutSection
        ├── CONTACT_DETAILS ──── ContactSection
        └── QUICK_LINKS ──────── QuickLinkSection
```

The data is static. React maps over arrays to render repeated cards, timeline entries, contact items, and quick links.

## 5. Audit status

The source-code issues identified in the latest audit have been addressed:

- Quick-link targets match the `skills` and `timeline` section IDs.
- The Experience component uses the correctly spelled filename and import.
- Project repository values point to the supplied GitHub repositories.
- The reported ESLint issues in the Hero and Header components are resolved.

The project preview placeholder and current Experience data are intentional and are not considered issues for the current scope.

## 6. Common workflow

```bash
pnpm install
pnpm dev
pnpm lint
pnpm build
```

When adding a new section:

1. Add the component under `components/home/`.
2. Add its content to `constants/index.ts` if the content is repeated or data-driven.
3. Compose it in `app/page.tsx`.
4. Add a unique navigation `id` if the section is linked from quick navigation.
5. Use the existing Motion and Tailwind patterns.
6. Update `AGENTS.md` if the implemented architecture or product behavior changes.

## Git status

`PROJECT_STRUCTURE.md` is intentionally listed in `.gitignore`. It is for local agent/developer context and should not be staged or pushed to the repository.
