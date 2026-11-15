"use client";

import { motion, type Variants } from "motion/react";
import { useSkipEntranceAnimations } from "@/components/providers/locale-animation-provider";
import { EASE_OUT_EXPO, entranceProps } from "@/lib/motion";

const TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  p: motion.p,
} as const;

type SplitTextProps = {
  text: string;
  as?: keyof typeof TAGS;
  className?: string;
  /** Seconds before the first character starts. */
  delay?: number;
  /** Seconds between characters. */
  stagger?: number;
};

const characterVariants: Variants = {
  hidden: { y: "120%" },
  visible: {
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
};

/**
 * Keeps combining marks (Lao vowels and tone marks) attached to their base
 * character so each animated piece is a whole visible glyph.
 */
function splitCharacters(word: string) {
  return word.match(/\P{M}\p{M}*|\p{M}+/gu) ?? [];
}

/** Reveals text one character at a time from behind a mask. */
export default function SplitText({
  text,
  as = "p",
  className,
  delay = 0,
  stagger = 0.03,
}: SplitTextProps) {
  const skipEntranceAnimations =
    useSkipEntranceAnimations();
  const Tag = TAGS[as];
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <Tag
      aria-label={text}
      className={className}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: stagger,
          },
        },
      }}
      viewport={{ once: true, amount: 0.6 }}
      {...entranceProps(
        skipEntranceAnimations,
        "hidden",
        "visible",
      )}
    >
      <span aria-hidden="true">
        {words.map((word, wordIndex) => (
          <span key={`${word}-${wordIndex}`}>
            <span className="-my-[0.3em] inline-block overflow-hidden py-[0.3em] align-bottom whitespace-nowrap">
              {splitCharacters(word).map(
                (character, characterIndex) => (
                  <motion.span
                    className="inline-block"
                    key={characterIndex}
                    variants={characterVariants}
                  >
                    {character}
                  </motion.span>
                ),
              )}
            </span>
            {wordIndex < words.length - 1 && " "}
          </span>
        ))}
      </span>
    </Tag>
  );
}
