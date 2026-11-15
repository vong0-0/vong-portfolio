"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll } from "motion/react";
import { useRef } from "react";
import { useSkipEntranceAnimations } from "@/components/providers/locale-animation-provider";
import ScrollRevealWord from "@/components/ui/scroll-reveal-word";
import SectionHeading from "@/components/ui/section-heading";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/shared/tooltip";
import { EASE_OUT_EXPO, entranceProps } from "@/lib/motion";

const LINK_TEXT = "WorldSkills ASEAN";
const LINK_HREF = "https://worldskillsasean2025.com/";

/** How many words are part-way through their reveal at the same time. */
const REVEAL_OVERLAP = 4;

type Token = {
  kind: "word" | "space" | "link";
  text: string;
  /** Position among the revealed tokens of the whole text. */
  order: number;
};

/**
 * Splits each paragraph into words, the spaces between them, and the link.
 * Words and links are numbered across all paragraphs in reading order.
 */
function tokenize(paragraphs: string[]): Token[][] {
  let order = 0;

  return paragraphs.map((paragraph) =>
    paragraph
      .split(LINK_TEXT)
      .flatMap((part, partIndex, parts) => {
        const tokens: Token[] = part
          .split(/(\s+)/)
          .filter(Boolean)
          .map((text) =>
            /^\s+$/.test(text)
              ? { kind: "space", text, order: -1 }
              : { kind: "word", text, order: order++ },
          );

        if (partIndex < parts.length - 1) {
          tokens.push({
            kind: "link",
            text: LINK_TEXT,
            order: order++,
          });
        }

        return tokens;
      }),
  );
}

export default function AboutSection() {
  const t = useTranslations("HomePage.About");
  const tRoot = useTranslations();
  const tExperience = useTranslations("HomePage.Experience");
  const skipEntranceAnimations =
    useSkipEntranceAnimations();
  const textRef = useRef<HTMLDivElement>(null);

  // Words light up one after another while the text crosses the screen.
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 90%", "end 75%"],
  });

  const paragraphs = tokenize(
    t.raw("paragraphs") as string[],
  );
  const revealCount = paragraphs
    .flat()
    .filter(({ kind }) => kind !== "space").length;
  const revealSteps = revealCount + REVEAL_OVERLAP;

  return (
    <section
      id="about"
      className="relative border-b-[0.5px] border-solid border-[#38393C]"
    >
      <div className="content-max-width space-y-8 px-6 py-12 md:space-y-12 md:py-20">
        <SectionHeading index="03" title={t("header")} />

        <TooltipProvider>
          <div className="mx-auto max-w-200 space-y-5 md:space-y-7">
            <motion.p
              className="flex items-center gap-2.5 text-sm font-medium text-accent md:text-base"
              transition={{
                duration: 0.7,
                ease: EASE_OUT_EXPO,
              }}
              viewport={{ once: true, amount: 0.6 }}
              {...entranceProps(
                skipEntranceAnimations,
                { opacity: 0, x: -16 },
                { opacity: 1, x: 0 },
              )}
            >
              <span
                aria-hidden="true"
                className="size-1.5 rotate-45 bg-accent"
              />
              {t("intro", { name: tRoot("HomePage.name") })}
            </motion.p>

            <div
              className="space-y-5 text-xl leading-relaxed font-medium md:space-y-7 md:text-[28px] md:leading-[1.5]"
              ref={textRef}
            >
              {paragraphs.map((tokens, paragraphIndex) => (
                <p key={paragraphIndex}>
                  {tokens.map(({ kind, text, order }) => {
                    if (kind === "space") return text;

                    return (
                      <ScrollRevealWord
                        key={order}
                        progress={scrollYProgress}
                        range={[
                          order / revealSteps,
                          (order + REVEAL_OVERLAP) /
                            revealSteps,
                        ]}
                      >
                        {kind === "link" ? (
                          <Tooltip>
                            <TooltipTrigger
                              render={
                                <a
                                  className="text-primary underline decoration-primary/50 underline-offset-4 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                                  href={LINK_HREF}
                                  rel="noreferrer"
                                  target="_blank"
                                >
                                  {text}
                                </a>
                              }
                            />
                            <TooltipContent>
                              {tExperience("tooltip", {
                                name: "WorldSkills ASEAN 2025",
                              })}
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          text
                        )}
                      </ScrollRevealWord>
                    );
                  })}
                </p>
              ))}
            </div>
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
}
