"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import type { PointerEvent, ReactNode } from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Largest rotation in degrees, reached at the card edges. */
  maxTilt?: number;
};

const TILT_SPRING = { stiffness: 260, damping: 18 };

/** Leans its content toward the mouse pointer in 3D. */
export default function TiltCard({
  children,
  className,
  maxTilt = 12,
}: TiltCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const rotateX = useSpring(targetX, TILT_SPRING);
  const rotateY = useSpring(targetY, TILT_SPRING);

  function handlePointerMove(
    event: PointerEvent<HTMLDivElement>,
  ) {
    if (
      shouldReduceMotion ||
      event.pointerType !== "mouse"
    ) {
      return;
    }

    const bounds =
      event.currentTarget.getBoundingClientRect();
    const fromCenterX =
      (event.clientX - bounds.left) / bounds.width - 0.5;
    const fromCenterY =
      (event.clientY - bounds.top) / bounds.height - 0.5;

    targetX.set(-fromCenterY * 2 * maxTilt);
    targetY.set(fromCenterX * 2 * maxTilt);
  }

  function handlePointerLeave() {
    targetX.set(0);
    targetY.set(0);
  }

  return (
    <motion.div
      className={className}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 700,
      }}
    >
      {children}
    </motion.div>
  );
}
