"use client";

import { cn } from "cn";
import { motion } from "motion/react";
import { useSkipEntranceAnimations } from "@/components/providers/locale-animation-provider";
import SplitText from "@/components/ui/split-text";
import { EASE_OUT_EXPO, entranceProps } from "@/lib/motion";

type SectionHeadingProps = {
  /** Decorative section number, for example "01". */
  index: string;
  title: string;
  align?: "center" | "left";
};

export default function SectionHeading({
  index,
  title,
  align = "center",
}: SectionHeadingProps) {
  const skipEntranceAnimations =
    useSkipEntranceAnimations();

  return (
    <div
      className={cn(
        "flex flex-col gap-2 md:gap-3",
        align === "center" && "xs:items-center",
      )}
    >
      <motion.div
        aria-hidden="true"
        className="flex items-center gap-3 text-sm font-medium text-accent tabular-nums"
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.6 }}
        {...entranceProps(
          skipEntranceAnimations,
          { opacity: 0 },
          { opacity: 1 },
        )}
      >
        <span>{index}</span>
        <motion.span
          className="h-px w-12 origin-left bg-accent"
          transition={{
            duration: 0.9,
            delay: 0.15,
            ease: EASE_OUT_EXPO,
          }}
          viewport={{ once: true }}
          {...entranceProps(
            skipEntranceAnimations,
            { scaleX: 0 },
            { scaleX: 1 },
          )}
        />
      </motion.div>
      <SplitText
        as="h2"
        className={cn(
          "section-header",
          align === "left" && "xs:text-left",
        )}
        text={title}
      />
    </div>
  );
}
