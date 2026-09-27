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
  Moon,
  Phone,
  Sun,
} from "lucide-react";

export const HERO = {
  name: "Vongsouvan Chanthasone",
  profileImage: "/images/profile-image.png",
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
