"use client";

import { SKILL_ICONS } from "@/constants";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import type { CSSProperties } from "react";
import { useSkipEntranceAnimations } from "@/components/providers/locale-animation-provider";
import SectionHeading from "@/components/ui/section-heading";
import TiltCard from "@/components/ui/tilt-card";
import VelocityMarquee from "@/components/ui/velocity-marquee";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/shared/tooltip";
import { entranceProps } from "@/lib/motion";

const SKILL_NAMES = SKILL_ICONS.map(({ name }) => name);

/** Cards in one row share a wave, so the delay restarts on each row. */
const WAVE_SIZE = 4;

export default function SkillSection() {
  const t = useTranslations("HomePage.Skills");
  const skipEntranceAnimations =
    useSkipEntranceAnimations();

  return (
    <section
      id="skills"
      className="relative z-40 border-b-[0.5px] border-solid border-[#38393C] bg-secondary"
    >
      <VelocityMarquee
        className="bg-foreground py-3 text-xl font-bold tracking-tight text-background uppercase md:py-4 md:text-3xl"
        items={SKILL_NAMES}
      />

      <div className="content-max-width space-y-8 px-6 py-12 md:space-y-12 md:py-20">
        <SectionHeading index="02" title={t("header")} />

        <TooltipProvider>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {SKILL_ICONS.map(
              (
                {
                  name,
                  color,
                  darkColor = color,
                  href,
                  Icon,
                },
                index,
              ) => (
                <motion.li
                  key={name}
                  transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 20,
                    delay: (index % WAVE_SIZE) * 0.07,
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                  {...entranceProps(
                    skipEntranceAnimations,
                    { opacity: 0, y: 32, scale: 0.9 },
                    { opacity: 1, y: 0, scale: 1 },
                  )}
                >
                  <TiltCard>
                    <Tooltip>
                      <TooltipTrigger
                        render={
                          <Link
                            className="skill-card lift-card flex w-full flex-col items-center gap-3 border-2 border-solid border-foreground bg-background px-3 py-5 sm:py-7"
                            href={href}
                            rel="noreferrer"
                            target="_blank"
                          >
                            <Icon
                              className="skill-icon size-12! sm:size-15!"
                              style={
                                {
                                  "--skill-color": color,
                                  "--skill-color-dark":
                                    darkColor,
                                } as CSSProperties
                              }
                            />
                            <p className="text-base font-bold sm:text-xl">
                              {name}
                            </p>
                          </Link>
                        }
                      />
                      <TooltipContent>
                        {t("tooltip", { name })}
                      </TooltipContent>
                    </Tooltip>
                  </TiltCard>
                </motion.li>
              ),
            )}
          </ul>
        </TooltipProvider>
      </div>
    </section>
  );
}
