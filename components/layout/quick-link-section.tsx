"use client";

import { QUICK_LINKS } from "@/constants";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { useSkipEntranceAnimations } from "@/components/providers/locale-animation-provider";

export default function QuickLinkSection() {
  const t = useTranslations("HomePage.QuickLinks");
  const skipEntranceAnimations =
    useSkipEntranceAnimations();

  return (
    <motion.ul
      initial={
        skipEntranceAnimations
          ? false
          : { opacity: 0, translateY: 10 }
      }
      animate={
        skipEntranceAnimations
          ? { opacity: 1, translateY: 0 }
          : undefined
      }
      whileInView={
        skipEntranceAnimations
          ? undefined
          : { opacity: 1, translateY: 0 }
      }
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex w-full flex-wrap items-center justify-center [&_li]:border-2 [&_li]:border-l-0 [&_li]:border-solid [&_li]:border-foreground [&_li:first-child]:border-2"
    >
      {QUICK_LINKS.map(({ key, href }) => (
        <li
          key={href}
          className="relative bg-secondary transition-transform duration-150 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-[-5px] after:h-[5px] after:bg-foreground after:opacity-0 after:transition-opacity after:duration-150 hover:-translate-y-[10%] hover:!border-l-2 hover:after:opacity-100 active:translate-y-0 active:after:opacity-0 [&:has(+_li:hover)]:border-r-0"
        >
          <a
            href={href}
            className="px-3.5 py-1.5"
          >
            <p className="font-medium">{t(key)}</p>
          </a>
        </li>
      ))}
    </motion.ul>
  );
}
