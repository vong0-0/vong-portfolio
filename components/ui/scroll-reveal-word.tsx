"use client";

import {
  motion,
  useTransform,
  type MotionValue,
} from "motion/react";
import type { ReactNode } from "react";

type ScrollRevealWordProps = {
  children: ReactNode;
  /** Scroll progress of the whole text block, from 0 to 1. */
  progress: MotionValue<number>;
  /** Part of that progress over which this word turns fully visible. */
  range: [number, number];
};

/** A word that goes from dim to fully visible as the reader scrolls. */
export default function ScrollRevealWord({
  children,
  progress,
  range,
}: ScrollRevealWordProps) {
  const opacity = useTransform(progress, range, [0.16, 1]);

  return (
    <motion.span
      className="motion-reduce:opacity-100!"
      style={{ opacity }}
    >
      {children}
    </motion.span>
  );
}
