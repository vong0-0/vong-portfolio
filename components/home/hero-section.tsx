"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef, type PointerEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { HERO } from "@/constants";
import { useSkipEntranceAnimations } from "@/components/providers/locale-animation-provider";
import {
  EASE_OUT_EXPO,
  entranceProps,
} from "@/lib/motion";
import QuickLinkSection from "../layout/quick-link-section";
import OrbitingSkillLogo from "../ui/orbiting-skill-logo";
import RollingMessages from "../ui/rolling-messages";
import SplitText from "../ui/split-text";

const POINTER_SPRING = {
  stiffness: 110,
  damping: 20,
  mass: 0.5,
};

export default function HeroSection() {
  const t = useTranslations("HomePage");
  const shouldReduceMotion = useReducedMotion();
  const skipEntranceAnimations =
    useSkipEntranceAnimations();
  const sectionRef = useRef<HTMLElement>(null);

  // Pointer position inside the section, from 0 to 1 on each axis.
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const smoothX = useSpring(
    pointerX,
    POINTER_SPRING,
  );
  const smoothY = useSpring(
    pointerY,
    POINTER_SPRING,
  );

  const spotX = useTransform(
    smoothX,
    (value) => `${value * 100}%`,
  );
  const spotY = useTransform(
    smoothY,
    (value) => `${value * 100}%`,
  );
  const glow = useMotionTemplate`radial-gradient(circle 34rem at ${spotX} ${spotY}, color-mix(in oklab, var(--accent) 14%, transparent), transparent 70%)`;
  const dotMask = useMotionTemplate`radial-gradient(circle 24rem at ${spotX} ${spotY}, #000, transparent)`;

  const tiltX = useTransform(
    smoothY,
    [0, 1],
    [10, -10],
  );
  const tiltY = useTransform(
    smoothX,
    [0, 1],
    [-14, 14],
  );
  const driftX = useTransform(
    smoothX,
    [0, 1],
    [-12, 12],
  );
  const driftY = useTransform(
    smoothY,
    [0, 1],
    [-8, 8],
  );

  // The content sinks and fades while the section scrolls away.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 140],
  );
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.75],
    [1, 0],
  );
  const contentScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 0.94],
  );

  function handlePointerMove(
    event: PointerEvent<HTMLElement>,
  ) {
    if (
      shouldReduceMotion ||
      event.pointerType !== "mouse"
    ) {
      return;
    }

    const bounds =
      event.currentTarget.getBoundingClientRect();
    pointerX.set(
      (event.clientX - bounds.left) /
        bounds.width,
    );
    pointerY.set(
      (event.clientY - bounds.top) /
        bounds.height,
    );
  }

  function handlePointerLeave() {
    pointerX.set(0.5);
    pointerY.set(0.5);
  }

  return (
    <section
      id="hero"
      className="hero-line-texture relative isolate flex min-h-[min(calc(100svh-4rem),52rem)] flex-col justify-center border-b-[0.5px] border-solid border-[#38393C]"
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      ref={sectionRef}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <motion.div
          className="absolute inset-0"
          style={{ backgroundImage: glow }}
        />
        <motion.div
          className="hero-dot-grid absolute inset-0"
          style={{
            maskImage: dotMask,
            WebkitMaskImage: dotMask,
          }}
        />
      </div>

      <motion.div
        className="content-max-width flex flex-col items-center px-6 pt-28 pb-20 motion-reduce:transform-none! motion-reduce:opacity-100! xs:pb-25 sm:px-20 sm:pb-32"
        style={{
          y: contentY,
          opacity: contentOpacity,
          scale: contentScale,
        }}
      >
        <motion.div
          style={{
            rotateX: tiltX,
            rotateY: tiltY,
            x: driftX,
            y: driftY,
            transformPerspective: 900,
          }}
        >
          <motion.div
            className="relative size-28 sm:size-32"
            transition={{
              type: "spring",
              stiffness: 140,
              damping: 15,
              delay: 0.1,
            }}
            viewport={{ once: true }}
            {...entranceProps(
              skipEntranceAnimations,
              { opacity: 0, scale: 0.5 },
              { opacity: 1, scale: 1 },
            )}
          >
            <OrbitingSkillLogo />
            <motion.svg
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 104 104"
              className="pointer-events-none absolute top-1/2 left-1/2 z-0 size-[calc(100%+64px)] -translate-x-1/2 -translate-y-1/2"
              animate={{
                rotate: shouldReduceMotion
                  ? 0
                  : 360,
              }}
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
                height={128}
                src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${HERO.profileImage}`}
                width={128}
              />
            </div>
          </motion.div>
        </motion.div>

        <motion.p
          className="mt-12 flex items-center gap-2.5 text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase sm:text-sm"
          transition={{
            duration: 0.7,
            delay: 0.3,
            ease: EASE_OUT_EXPO,
          }}
          viewport={{ once: true }}
          {...entranceProps(
            skipEntranceAnimations,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0 },
          )}
        >
          <span
            aria-hidden="true"
            className="size-1.5 rotate-45 bg-accent"
          />
          {t("Hero.role")}
        </motion.p>

        <SplitText
          as="h1"
          className="mt-4 text-center text-[clamp(2.25rem,7.2vw,5.25rem)] leading-[1.1] font-bold tracking-tight text-balance"
          delay={0.4}
          stagger={0.028}
          text={t("name")}
        />

        <motion.div
          className="mt-4 w-full sm:mt-6"
          transition={{
            duration: 0.7,
            delay: 1,
            ease: EASE_OUT_EXPO,
          }}
          viewport={{ once: true }}
          {...entranceProps(
            skipEntranceAnimations,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0 },
          )}
        >
          <RollingMessages
            messages={
              t.raw(
                "Hero.messages",
              ) as readonly string[]
            }
            className="mx-auto max-w-140 text-base font-medium text-muted-foreground sm:text-xl"
            transitionDurationMs={350}
            intervalMs={2800}
          />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-1/2 z-50 hidden w-full -translate-x-1/2 translate-y-1/2 xs:block">
        <QuickLinkSection />
      </div>
    </section>
  );
}
