"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";

const mockMessages = [
  "Building thoughtful web experiences",
  "Exploring motion and interaction design",
  "Learning something new every day",
];

type RollingMessagesProps = {
  messages?: readonly string[];
  intervalMs?: number;
  transitionDurationMs?: number;
  className?: string;
  style?: CSSProperties;
};

export default function RollingMessages({
  messages = mockMessages,
  intervalMs = 3000,
  transitionDurationMs = 300,
  className = "",
  style,
}: RollingMessagesProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] =
    useState(0);

  useEffect(() => {
    if (shouldReduceMotion !== false || messages.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex(
        (current) =>
          (current + 1) % messages.length,
      );
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs, messages.length, shouldReduceMotion]);

  if (messages.length === 0) return null;

  const activeMessage =
    messages[
      shouldReduceMotion === false
        ? activeIndex % messages.length
        : 0
    ];

  return (
    <div
      className={`flex min-h-20 w-full items-center justify-center text-center ${className}`}
      style={style}
    >
      <span className="relative block min-h-20 w-full overflow-hidden sm:min-h-14">
        <AnimatePresence
          initial={false}
          mode="wait"
        >
          <motion.span
            key={activeIndex}
            className="absolute inset-0 flex items-center justify-center"
            initial={{
              y: shouldReduceMotion ? 0 : "100%",
              opacity: 0,
            }}
            animate={{ y: 0, opacity: 1 }}
            exit={{
              y: shouldReduceMotion ? 0 : "-100%",
              opacity: 0,
            }}
            transition={{
              duration: shouldReduceMotion
                ? 0
                : transitionDurationMs / 1000,
              ease: [
                0.338, 0.015, 0.395, 0.959,
              ] as const,
            }}
          >
            {activeMessage}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}
