import {
  ClaudeIcon,
  CssIcon,
  GitHubIcon,
  GitIcon,
  HtmlIcon,
  JavaScriptIcon,
  NextJsIcon,
  ReactIcon,
  ShadcnIcon,
  TailwindCssIcon,
  TypeScriptIcon,
  ViteIcon,
} from "@/components/icons/skill-icons";
import { Moon, Sun } from "lucide-react";

export const HERO = {
  name: "Vongsouvan Chanthasone",
  profileImage: "/profile-image.png",
  profileImageAlt: "Vongsouvan Chanthasone",
} as const;

export const PROJECTS = [
  {
    title:
      "Receipt Scanner & Financial Dashboard",
    desc: "AI-powered receipt scanner that extracts expense details from a photo and visualizes spending on a dashboard with Lao language and Kip currency support.",
    repo: "#",
  },
  {
    title: "TonNam Smart Restaurant System",
    desc: "A full-stack restaurant platform connecting admins, cashiers, waiters, and kitchen staff — handling orders, real-time kitchen updates, billing, and analytics in one system.",
    repo: "#",
  },
] as const;

export const EXPERIENCES = [
  {
    year: "2025",
    title: "Dev Tour Laos — Programming Contest",
    decs: "Competed in Dev Tour Laos Programming Contest 2025, one of the country's largest developer competitions, held under the Web Technology track with support from the Ministry of Labor and Social Welfare and Lailaolab to discover Laos's top emerging developers.",
  },
  {
    year: "2025",
    title: "WorldSkills ASEAN Manila 2025",
    decs: "Represented Laos in the Web Technologies category at WorldSkills ASEAN Manila 2025, a regional skills competition held in August 2025 — building functioning web solutions from a live brief under strict time constraints alongside some of the region's most skilled young developers.",
  },
  {
    year: "2025",
    title: "Internship — Lailaolab",
    decs: "During a one-month internship at Lailaolab, a software development company in Laos, I worked as a Frontend Developer Intern building the admin-side interface for a food delivery platform, including partial API integration — using React, React Router DOM, TanStack Query, Zustand, Tailwind CSS, and shadcn/ui in a real product codebase alongside a professional engineering team.",
  },
] as const;

export const QUICK_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Timeline", href: "#timeline" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const THEME_OPTIONS = [
  {
    value: "light",
    label: "Light theme",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Dark theme",
    icon: Moon,
  },
] as const;

export type Theme =
  (typeof THEME_OPTIONS)[number]["value"];

export const SKILL_ICONS = [
  {
    name: "HTML",
    color: "#E34F26",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    Icon: HtmlIcon,
  },
  {
    name: "CSS",
    color: "#663399",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    Icon: CssIcon,
  },
  {
    name: "JavaScript",
    color: "#F7DF1E",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    Icon: JavaScriptIcon,
  },
  {
    name: "TypeScript",
    color: "#3178C6",
    href: "https://www.typescriptlang.org/",
    Icon: TypeScriptIcon,
  },
  {
    name: "React",
    color: "#61DAFB",
    href: "https://react.dev/",
    Icon: ReactIcon,
  },
  {
    name: "Next.js",
    color: "#000000",
    href: "https://nextjs.org/",
    Icon: NextJsIcon,
  },
  {
    name: "Tailwind CSS",
    color: "#06B6D4",
    href: "https://tailwindcss.com/",
    Icon: TailwindCssIcon,
  },
  {
    name: "shadcn/ui",
    color: "#000000",
    href: "https://ui.shadcn.com/",
    Icon: ShadcnIcon,
  },
  {
    name: "Git",
    color: "#F03C2E",
    href: "https://git-scm.com/",
    Icon: GitIcon,
  },
  {
    name: "GitHub",
    color: "#181717",
    href: "https://github.com/",
    Icon: GitHubIcon,
  },
  {
    name: "Claude",
    color: "#D97757",
    href: "https://claude.ai/",
    Icon: ClaudeIcon,
  },
  {
    name: "Vite",
    color: "#9135FF",
    href: "https://vite.dev/",
    Icon: ViteIcon,
  },
] as const;
