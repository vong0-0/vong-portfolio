"use client";

import {
  motion,
  useScroll,
  useSpring,
} from "motion/react";

/** Thin bar pinned to the top edge that fills as the page scrolls. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-60 h-0.75 origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}
