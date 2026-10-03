"use client";

import { SKILL_ICONS } from "@/constants";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import type { CSSProperties } from "react";
import { useSkipEntranceAnimations } from "@/components/providers/locale-animation-provider";

export default function SkillSection() {
  const t = useTranslations("HomePage.Skills");
  const skipEntranceAnimations =
    useSkipEntranceAnimations();

  return (
    <section
      id="skills"
      className="relative z-40 border-b-[0.5px] border-solid border-[#38393C] bg-secondary"
    >
      <div className="content-max-width space-y-6 px-6 py-12 md:space-y-10 md:py-20">
        <motion.p
          initial={
            skipEntranceAnimations
              ? false
              : { opacity: 0, y: 24 }
          }
          animate={
            skipEntranceAnimations
              ? { opacity: 1, y: 0 }
              : undefined
          }
          whileInView={
            skipEntranceAnimations
              ? undefined
              : { opacity: 1, y: 0 }
          }
          transition={{ duration: 0.55, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
          className="section-header"
        >
          {t("header")}
        </motion.p>

        <div className="flex flex-col items-center justify-center xs:grid xs:auto-rows-auto xs:grid-cols-2 xs:gap-4 md:flex md:flex-row md:flex-wrap">
          {SKILL_ICONS.map(
            ({ name, color, darkColor = color, href, Icon }, index) => (
              <motion.div
                className="w-full max-w-90 xs:max-w-full md:max-w-50"
                initial={
                  skipEntranceAnimations
                    ? false
                    : { opacity: 0, y: 24 }
                }
                animate={
                  skipEntranceAnimations
                    ? { opacity: 1, y: 0 }
                    : undefined
                }
                key={name}
                transition={{
                  duration: 0.45,
                  delay: index * 0.06,
                  ease: "easeOut",
                }}
                viewport={{ amount: 0.15, once: true }}
                whileInView={
                  skipEntranceAnimations
                    ? undefined
                    : { opacity: 1, y: 0 }
                }
              >
                <Link
                  className={`skill-card relative flex w-full flex-col items-center gap-3 border-2 border-t-0 border-solid border-foreground bg-background px-6 py-3 ${
                    index === 0 ? "border-t-2" : ""
                  } xs:border-2 xs:transition-transform xs:duration-150 xs:hover:-translate-y-2 xs:active:translate-y-0 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-[-8px] after:h-[8px] after:bg-foreground after:opacity-0 after:transition-opacity after:duration-150 xs:hover:after:opacity-100 xs:active:after:opacity-0`}
                  href={href}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Icon
                    className="skill-icon"
                    style={
                      {
                        "--skill-color": color,
                        "--skill-color-dark": darkColor,
                      } as CSSProperties
                    }
                  />
                  <p className="text-2xl font-bold">
                    {name}
                  </p>
                </Link>
              </motion.div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
