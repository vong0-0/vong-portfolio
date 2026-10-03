# Project Structure Notes

This document explains the current portfolio architecture and implementation patterns.

## 1. Overall architecture

The project is a single-page Next.js App Router application:

```text
app/[locale]/layout.tsx
  └── app/[locale]/page.tsx
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
├── [locale]/               Locale-aware root layout and homepage
├── globals.css             Tailwind imports, design tokens, themes, shared CSS
├── robots.ts               Generates /robots.txt
└── sitemap.ts              Generates /sitemap.xml

instrumentation-client.ts   Applies the saved theme before hydration
proxy.ts                    next-intl locale routing
i18n/                       Locale and request configuration
messages/                   English and Lao translation files

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

`app/[locale]/page.tsx` is intentionally small. It composes the page from section components instead of containing the full page markup. Each major visual section has its own file under `components/home/`.

The root layout owns app-wide concerns:

- Space Grotesk font loading
- Global CSS import
- Locale validation and `NextIntlClientProvider`
- Theme initialization from `instrumentation-client.ts` before hydration
- Site metadata
- Header actions

### Content and presentation are separated

Localized copy is stored by locale in `messages/{locale}.json`. `constants/index.ts` contains:

- `HERO`
- `CONTACT_DETAILS`
- `PROJECTS`
- `EXPERIENCES`
- `QUICK_LINKS`
- `SKILL_ICONS`

Section components use `useTranslations` for copy and import constants for values, translation keys, and stable targets. Keep About paragraphs as an array so their number and content can change freely in each locale.

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

`HeaderActions` stores the selected theme in `localStorage` under the key `theme`. `instrumentation-client.ts` applies the `dark` class before React hydration, avoiding an inline script in the layout.

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

- `metadataBase` and Open Graph metadata in `app/[locale]/layout.tsx`
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
        ├── CONTACT_DETAILS ──── ContactSection
        └── QUICK_LINKS ──────── QuickLinkSection

messages/{locale}.json ─────── Localized section copy
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
3. Compose it in `app/[locale]/page.tsx`.
4. Add a unique navigation `id` if the section is linked from quick navigation.
5. Use the existing Motion and Tailwind patterns.
6. Update `AGENTS.md` if the implemented architecture or product behavior changes.
