"use client";

import { SKILL_ICONS } from "@/constants";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import { type CSSProperties, useState } from "react";

type SkillIcon = (typeof SKILL_ICONS)[number];

type OrbitingSkillLogoProps = {
  skills?: readonly SkillIcon[];
  durationSeconds?: number;
  className?: string;
};

const orbitPositions = [
  "absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2",
  "absolute left-[93.3%] top-3/4 -translate-x-1/2 -translate-y-1/2",
  "absolute left-[6.7%] top-3/4 -translate-x-1/2 -translate-y-1/2",
] as const;

function getSkillBatch(
  skills: readonly SkillIcon[],
  start: number,
  randomizeFill = false,
): SkillIcon[] {
  const batch = skills.slice(start, start + 3);

  while (batch.length < 3 && skills.length > 0) {
    const candidates = skills.filter(
      (skill) => !batch.includes(skill),
    );
    const pool = candidates.length > 0 ? candidates : skills;
    const nextIndex = randomizeFill
      ? Math.floor(Math.random() * pool.length)
      : (start + batch.length) % pool.length;
    const nextSkill = pool[nextIndex];

    if (!nextSkill) break;
    batch.push(nextSkill);
  }

  return batch;
}

/** Render inside a square, relatively positioned container. */
export default function OrbitingSkillLogo({
  skills = SKILL_ICONS,
  durationSeconds = 8,
  className = "",
}: OrbitingSkillLogoProps) {
  const shouldReduceMotion = useReducedMotion();
  const [batchStart, setBatchStart] = useState(0);
  const [activeSkills, setActiveSkills] = useState<SkillIcon[]>(
    () => getSkillBatch(skills, 0),
  );
  const [rotation, setRotation] = useState(0);

  if (skills.length === 0) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -inset-[24.5%] z-20 ${className}`}
    >
      <motion.div
        className="relative size-full"
        animate={{ rotate: shouldReduceMotion ? 0 : rotation + 360 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: durationSeconds, ease: "linear" }
        }
        onAnimationComplete={() => {
          if (shouldReduceMotion) return;

          const nextStart =
            batchStart + 3 >= skills.length
              ? 0
              : batchStart + 3;

          setBatchStart(nextStart);
          setActiveSkills(getSkillBatch(skills, nextStart, true));
          setRotation((current) => current + 360);
        }}
      >
        <AnimatePresence initial={false} mode="sync">
          {activeSkills.map((skill, index) => {
            const Icon = skill.Icon;

            return (
              <motion.span
                key={`${batchStart}-${skill.name}`}
                className={`${orbitPositions[index]} flex size-[25.8%] items-center justify-center rounded-full border border-border bg-background`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <Icon
                  className="hero-orbit-skill !size-[60%]"
                  style={
                    {
                      "--skill-color": skill.color,
                      "--skill-color-dark": skill.darkColor,
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
