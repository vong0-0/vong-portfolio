"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { HERO, SKILL_ICONS } from "@/constants";
import QuickLinkSection from "../layout/quick-link-section";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import { type CSSProperties, useState } from "react";
import { useSkipEntranceAnimations } from "@/components/providers/locale-animation-provider";
import RollingMessages from "../ui/rolling-messages";

const orbitSkills = SKILL_ICONS;
const orbitPositions = [
  "absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2",
  "absolute left-[93.3%] top-3/4 -translate-x-1/2 -translate-y-1/2",
  "absolute left-[6.7%] top-3/4 -translate-x-1/2 -translate-y-1/2",
] as const;

function getOrbitSkillBatch(start: number) {
  const batch = orbitSkills.slice(start, start + 3);

  while (batch.length < 3) {
    const candidates = orbitSkills.filter(
      (skill) => !batch.includes(skill),
    );
    const randomIndex = Math.floor(Math.random() * candidates.length);
    const randomSkill = candidates[randomIndex];

    if (!randomSkill) break;
    batch.push(randomSkill);
  }

  return batch;
}

function OrbitingSkillLogo({
  shouldReduceMotion,
}: {
  shouldReduceMotion: boolean | null;
}) {
  const [batchStart, setBatchStart] = useState(0);
  const [activeSkills, setActiveSkills] = useState(
    () => getOrbitSkillBatch(0),
  );
  const [rotation, setRotation] = useState(0);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -inset-[25.5px] z-20"
    >
      <motion.div
        className="relative size-full"
        animate={{ rotate: shouldReduceMotion ? 0 : rotation + 360 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 8, ease: "linear" }
        }
        onAnimationComplete={() => {
          if (shouldReduceMotion) return;

          const nextStart =
            batchStart + 3 >= orbitSkills.length
              ? 0
              : batchStart + 3;

          setBatchStart(nextStart);
          setActiveSkills(getOrbitSkillBatch(nextStart));
          setRotation((current) => current + 360);
        }}
      >
        <AnimatePresence initial={false} mode="sync">
          {activeSkills.map((skill, index) => {
            const Icon = skill.Icon;

            return (
              <motion.span
                key={`${batchStart}-${skill.name}`}
                className={`${orbitPositions[index]} flex size-10 items-center justify-center rounded-full border border-border bg-background`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <Icon
                  className="hero-orbit-skill !size-6"
                  style={
                    {
                      "--skill-color": skill.color,
                      "--skill-color-dark": skill.darkColor ?? skill.color,
                    } as CSSProperties
                  }
                />
              </motion.span>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function HeroSection() {
  const t = useTranslations("HomePage");
  const shouldReduceMotion = useReducedMotion();
  const skipEntranceAnimations =
    useSkipEntranceAnimations();

  return (
    <section
      id="hero"
      className="hero-line-texture relative border-b-[0.5px] border-solid border-[#38393C]"
    >
      <motion.div
        initial={
          skipEntranceAnimations
            ? false
            : { opacity: 0 }
        }
        animate={
          skipEntranceAnimations
            ? { opacity: 1 }
            : undefined
        }
        whileInView={
          skipEntranceAnimations
            ? undefined
            : { opacity: 1 }
        }
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="content-max-width flex flex-col items-center justify-center gap-9 px-6 py-10 pb-20 xs:pb-25 sm:px-20 sm:pt-20 sm:pb-36.25"
      >
        <div className="flex flex-col items-center gap-y-10">
          <div className="relative size-26">
            <OrbitingSkillLogo
              shouldReduceMotion={shouldReduceMotion}
            />
            <motion.svg
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 104 104"
              className="pointer-events-none absolute left-1/2 top-1/2 z-0 size-[calc(100%+64px)] -translate-x-1/2 -translate-y-1/2"
              animate={{ rotate: shouldReduceMotion ? 0 : 360 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      duration: 60,
                      repeat: Infinity,
                      ease: "linear",
                    }
              }
            >
              <circle
                cx="52"
                cy="52"
                r="48"
                fill="none"
                stroke="var(--portfolio-accent-secondary)"
                strokeWidth="1.5"
                strokeDasharray="4 7"
                opacity="0.5"
              />
            </motion.svg>
            <div className="relative z-10 h-full w-full overflow-hidden rounded-full grayscale-100">
              <Image
                alt={HERO.profileImageAlt}
                className="h-full w-full object-cover"
                height={104}
                src={HERO.profileImage}
                width={104}
              />
            </div>
          </div>
          <p className="text-center text-sm font-normal">
            {t("name")}
          </p>
        </div>
        <RollingMessages
          messages={
            t.raw(
              "Hero.messages",
            ) as readonly string[]
          }
          className="mx-auto max-w-133.5 text-lg font-medium sm:text-2xl"
          transitionDurationMs={200}
          intervalMs={2500}
        />
      </motion.div>

      <div className="absolute bottom-0 left-1/2 z-50 hidden w-full -translate-x-1/2 translate-y-1/2 xs:block">
        <QuickLinkSection />
      </div>
    </section>
  );
}
