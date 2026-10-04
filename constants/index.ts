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
import {
  Globe,
  Mail,
  Phone,
} from "lucide-react";

export const HERO = {
  profileImage: "/images/profile-image.webp",
  profileImageAlt: "Vongsouvan Chanthasone",
} as const;

export const CONTACT_DETAILS = [
  {
    labelKey: "phone",
    value: "+8562012345678",
    href: "tel:+8562012345678",
    Icon: Phone,
  },
  {
    labelKey: "email",
    value: "vongsouvan09@gmail.com",
    href: "mailto:vongsouvan09@gmail.com",
    Icon: Mail,
  },
  {
    labelKey: "github",
    value: "github.com/vong0-0",
    href: "https://github.com/vong0-0",
    Icon: GitHubIcon,
  },
  {
    labelKey: "website",
    value: "vongsouvan.com",
    href: "https://vongsouvan.com",
    Icon: Globe,
  },
] as const;

export const PROJECTS = [
  {
    key: "receiptScanner",
    repo: "https://github.com/vong0-0/receipt-scanner.git",
  },
  {
    key: "tonnam",
    repo: "https://github.com/vong0-0/tonnam-system.git",
  },
] as const;

export const EXPERIENCES = [
  {
    key: "devTour",
    href: "https://www.facebook.com/p/Dev-Tour-Laos-Programming-Contest-100094118034269/",
  },
  {
    key: "worldSkills",
    href: "https://worldskillsasean2025.com/",
  },
  {
    key: "internship",
    href: "https://www.lailaolab.com/",
  },
] as const;

export const QUICK_LINKS = [
  { key: "timeline", href: "#timeline" },
  { key: "skills", href: "#skills" },
  { key: "about", href: "#about" },
  { key: "contact", href: "#contact" },
] as const;

export const SKILL_ICONS = [
  {
    name: "HTML",
    color: "#E34F26",
    darkColor: "#E34F26",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    Icon: HtmlIcon,
  },
  {
    name: "CSS",
    color: "#663399",
    darkColor: "#663399",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    Icon: CssIcon,
  },
  {
    name: "JavaScript",
    color: "#F7DF1E",
    darkColor: "#F7DF1E",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    Icon: JavaScriptIcon,
  },
  {
    name: "TypeScript",
    color: "#3178C6",
    darkColor: "#3178C6",
    href: "https://www.typescriptlang.org/",
    Icon: TypeScriptIcon,
  },
  {
    name: "React",
    color: "#61DAFB",
    darkColor: "#61DAFB",
    href: "https://react.dev/",
    Icon: ReactIcon,
  },
  {
    name: "Next.js",
    color: "#000000",
    darkColor: "#F5F2EA",
    href: "https://nextjs.org/",
    Icon: NextJsIcon,
  },
  {
    name: "Tailwind CSS",
    color: "#06B6D4",
    darkColor: "#06B6D4",
    href: "https://tailwindcss.com/",
    Icon: TailwindCssIcon,
  },
  {
    name: "shadcn/ui",
    color: "#000000",
    darkColor: "#F5F2EA",
    href: "https://ui.shadcn.com/",
    Icon: ShadcnIcon,
  },
  {
    name: "Git",
    color: "#F03C2E",
    darkColor: "#F03C2E",
    href: "https://git-scm.com/",
    Icon: GitIcon,
  },
  {
    name: "GitHub",
    color: "#181717",
    darkColor: "#F5F2EA",
    href: "https://github.com/",
    Icon: GitHubIcon,
  },
  {
    name: "Claude",
    color: "#D97757",
    darkColor: "#D97757",
    href: "https://claude.ai/",
    Icon: ClaudeIcon,
  },
  {
    name: "Vite",
    color: "#9135FF",
    darkColor: "#9135FF",
    href: "https://vite.dev/",
    Icon: ViteIcon,
  },
] as const;
