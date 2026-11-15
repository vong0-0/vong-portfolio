"use client";

import { EXPERIENCES } from "@/constants";
import {
  motion,
  useScroll,
  useSpring,
} from "motion/react";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { useSkipEntranceAnimations } from "@/components/providers/locale-animation-provider";
import SectionHeading from "@/components/ui/section-heading";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/shared/tooltip";
import { EASE_OUT_EXPO, entranceProps } from "@/lib/motion";

/** Dots appear once they are above the lower third of the screen. */
const DOT_VIEWPORT = {
  once: true,
  margin: "0px 0px -30% 0px",
} as const;

export default function ExperienceSection() {
  const t = useTranslations("HomePage.Experience");
  const skipEntranceAnimations =
    useSkipEntranceAnimations();
  const timelineRef = useRef<HTMLDivElement>(null);

  // The timeline line draws itself as the list scrolls through the screen.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 55%"],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id="timeline"
      className="relative z-40 border-b-[0.5px] border-solid border-[#38393C]"
    >
      <div className="content-max-width space-y-8 px-6 py-12 md:space-y-10 md:py-20 lg:space-y-14">
        <SectionHeading index="01" title={t("header")} />

        <div
          className="relative pl-10 lg:mx-auto lg:w-fit lg:pl-0"
          ref={timelineRef}
        >
          <div
            aria-hidden="true"
            className="absolute top-0 left-2 h-full w-px bg-foreground/15 lg:left-57"
          />
          <motion.div
            aria-hidden="true"
            className="absolute top-0 left-1.75 h-full w-0.5 origin-top bg-foreground motion-reduce:transform-none! lg:left-56.75"
            style={{ scaleY: lineScale }}
          />
          <TooltipProvider>
            <div className="space-y-8">
              {EXPERIENCES.map(({ key, href }) => {
                const title = t(`items.${key}.title`);

                return (
                  <motion.div
                    className="relative lg:grid lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-12"
                    key={key}
                    transition={{
                      duration: 0.8,
                      ease: EASE_OUT_EXPO,
                    }}
                    viewport={{ once: true, amount: 0.3 }}
                    {...entranceProps(
                      skipEntranceAnimations,
                      { opacity: 0, y: 36 },
                      { opacity: 1, y: 0 },
                    )}
                  >
                    <motion.span
                      aria-hidden="true"
                      className="absolute top-0.5 -left-10 flex size-4 items-center justify-center lg:top-1 lg:left-55"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 14,
                      }}
                      viewport={DOT_VIEWPORT}
                      {...entranceProps(
                        skipEntranceAnimations,
                        { scale: 0 },
                        { scale: 1 },
                      )}
                    >
                      <motion.span
                        className="absolute inset-0 rounded-full border border-accent"
                        transition={{
                          duration: 0.9,
                          delay: 0.15,
                          ease: "easeOut",
                        }}
                        viewport={DOT_VIEWPORT}
                        {...entranceProps(
                          skipEntranceAnimations,
                          { opacity: 0.9, scale: 1 },
                          { opacity: 0, scale: 2.8 },
                        )}
                      />
                      <span className="size-4 rounded-full border-2 border-foreground bg-background" />
                      <span className="absolute size-1.5 rounded-full bg-accent" />
                    </motion.span>

                    <p className="mb-1.5 text-[13px] text-muted-foreground lg:col-start-1 lg:row-start-1 lg:mb-0 lg:translate-y-[-10%] lg:text-right lg:text-[36px] lg:font-medium lg:text-foreground lg:underline lg:underline-offset-4">
                      {t(`items.${key}.year`)}
                    </p>

                    <div className="lg:col-start-2 lg:row-start-1 lg:pl-8">
                      <div className="lg:max-w-154.5 lg:lift-card">
                        <p className="mb-3 text-base font-medium lg:mb-0 lg:border-2 lg:border-solid lg:border-foreground lg:bg-secondary lg:px-6 lg:py-3 lg:text-[18px]">
                          <Tooltip>
                            <TooltipTrigger
                              render={
                                <a
                                  className="text-primary underline decoration-primary/50 underline-offset-4 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                                  href={href}
                                  rel="noreferrer"
                                  target="_blank"
                                >
                                  {title}
                                </a>
                              }
                            />
                            <TooltipContent>
                              {t("tooltip", { name: title })}
                            </TooltipContent>
                          </Tooltip>
                        </p>

                        <p className="text-[15px] text-muted-foreground lg:border-2 lg:border-t-0 lg:border-solid lg:border-foreground lg:bg-background lg:px-6 lg:py-3 lg:text-base">
                          {t(`items.${key}.desc`)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </TooltipProvider>
        </div>
      </div>
    </section>
  );
}
