import Link from "next/link";

export const QUICK_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Timeline", href: "#timeline" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export default function QuickLinkSection() {
  return (
    <ul className="flex w-full flex-wrap items-center justify-center [&_li]:border-2 [&_li]:border-l-0 [&_li]:border-solid [&_li]:border-foreground [&_li:first-child]:border-2">
      {QUICK_LINKS.map(({ label, href }) => (
        <li
          key={href}
          className="bg-secondary transition-all duration-150 hover:-translate-y-[10%] hover:!border-l-2 hover:shadow-[0_5px_0_var(--foreground)] active:translate-y-0 active:shadow-none [&:has(+_li:hover)]:border-r-0"
        >
          <Link
            href={href}
            className="px-3.5 py-1.5"
          >
            <p className="font-medium">{label}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
