"use client";

import { Fragment } from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { useSkipEntranceAnimations } from "@/components/providers/locale-animation-provider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/shared/tooltip";

export default function AboutSection() {
  const t = useTranslations("HomePage.About");
  const tRoot = useTranslations();
  const tExperience = useTranslations("HomePage.Experience");
  const skipEntranceAnimations =
    useSkipEntranceAnimations();
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <section
      id="about"
      className="relative border-b-[0.5px] border-solid border-[#38393C]"
    >
      <div className="content-max-width space-y-6 px-6 py-12 md:py-20">
        <motion.h2
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
        </motion.h2>

        <TooltipProvider>
          <div className="mx-auto max-w-140 space-y-4 text-[15px] text-muted-foreground md:text-base">
            <motion.p
              initial={
                skipEntranceAnimations
                  ? false
                  : { opacity: 0, y: 20 }
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
              transition={{ duration: 0.45, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.25 }}
            >
              {t("intro", { name: tRoot("HomePage.name") })}
            </motion.p>
            {paragraphs.map((paragraph, index) => (
              <motion.p
                initial={
                  skipEntranceAnimations
                    ? false
                    : { opacity: 0, y: 20 }
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
                transition={{
                  duration: 0.45,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                viewport={{ once: true, amount: 0.25 }}
                key={index}
              >
                {paragraph
                  .split("WorldSkills ASEAN")
                  .map((part, partIndex, parts) => (
                    <Fragment key={`${index}-${partIndex}`}>
                      {part}
                      {partIndex < parts.length - 1 && (
                        <Tooltip>
                          <TooltipTrigger
                            render={
                              <a
                                className="text-primary underline decoration-primary/50 underline-offset-4 transition-colors hover:text-accent-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                                href="https://worldskillsasean2025.com/"
                                rel="noreferrer"
                                target="_blank"
                              >
                                WorldSkills ASEAN
                              </a>
                            }
                          />
                          <TooltipContent>
                            {tExperience("tooltip", {
                              name: "WorldSkills ASEAN 2025",
                            })}
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </Fragment>
                  ))}
              </motion.p>
            ))}
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
}
