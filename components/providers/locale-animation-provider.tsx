"use client";

import { MotionConfig } from "motion/react";
import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

const SkipEntranceAnimationsContext =
  createContext(false);

export function LocaleAnimationProvider({
  skipEntranceAnimations,
  children,
}: {
  skipEntranceAnimations: boolean;
  children: ReactNode;
}) {
  return (
    <SkipEntranceAnimationsContext.Provider
      value={skipEntranceAnimations}
    >
      {/* Movement is dropped for visitors who ask for reduced motion. */}
      <MotionConfig reducedMotion="user">
        {children}
      </MotionConfig>
    </SkipEntranceAnimationsContext.Provider>
  );
}

export function useSkipEntranceAnimations() {
  return useContext(SkipEntranceAnimationsContext);
}
