"use client";

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
      {children}
    </SkipEntranceAnimationsContext.Provider>
  );
}

export function useSkipEntranceAnimations() {
  return useContext(SkipEntranceAnimationsContext);
}
