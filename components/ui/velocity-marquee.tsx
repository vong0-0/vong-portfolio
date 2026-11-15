"use client";

import { cn } from "cn";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useRef } from "react";

type VelocityMarqueeProps = {
  items: readonly string[];
  /** Idle speed, in percent of one item group per second. */
  baseVelocity?: number;
  className?: string;
};

/** The track holds this many copies of the items so it never shows a gap. */
const COPIES = 4;
const GROUP_WIDTH_PERCENT = 100 / COPIES;

function wrap(min: number, max: number, value: number) {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

/**
 * Endless strip of labels. It drifts on its own, speeds up with the page
 * scroll, and reverses when the scroll direction changes.
 */
export default function VelocityMarquee({
  items,
  baseVelocity = 6,
  className,
}: VelocityMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef);
  const shouldReduceMotion = useReducedMotion();
  const direction = useRef(-1);

  const position = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const boost = useTransform(
    smoothVelocity,
    [-1000, 0, 1000],
    [-5, 0, 5],
    { clamp: false },
  );
  const skewX = useTransform(
    smoothVelocity,
    [-2500, 0, 2500],
    [12, 0, -12],
  );
  const x = useTransform(
    position,
    (value) =>
      `${wrap(-GROUP_WIDTH_PERCENT, 0, value)}%`,
  );

  useAnimationFrame((_, delta) => {
    if (shouldReduceMotion || !isInView) return;

    const currentBoost = boost.get();
    if (currentBoost > 0) direction.current = -1;
    if (currentBoost < 0) direction.current = 1;

    // Cap the frame time so a background tab does not cause a jump.
    const seconds = Math.min(delta, 64) / 1000;
    const speed =
      (baseVelocity / COPIES) *
      (1 + Math.abs(currentBoost));

    position.set(
      position.get() +
        direction.current * speed * seconds,
    );
  });

  return (
    <div
      aria-hidden="true"
      className={cn("overflow-hidden", className)}
      ref={containerRef}
    >
      <motion.div
        className="flex w-max motion-reduce:transform-none!"
        style={{ x, skewX }}
      >
        {Array.from({ length: COPIES }, (_, copy) => (
          <ul
            className="flex shrink-0 items-center"
            key={copy}
          >
            {items.map((item) => (
              <li
                className="flex items-center gap-6 pr-6 md:gap-10 md:pr-10"
                key={item}
              >
                <span>{item}</span>
                <span className="size-2 rotate-45 bg-accent md:size-2.5" />
              </li>
            ))}
          </ul>
        ))}
      </motion.div>
    </div>
  );
}
