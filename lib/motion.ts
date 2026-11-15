import type {
  TargetAndTransition,
  VariantLabels,
} from "motion/react";

/** Fast start, long soft landing. Used for reveals. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

type EntranceTarget = TargetAndTransition | VariantLabels;

/**
 * Entrance props for a motion element. After a language switch the entrance
 * is skipped, so the element renders in its final state straight away.
 */
export function entranceProps(
  skip: boolean,
  hidden: EntranceTarget,
  visible: EntranceTarget,
) {
  return skip
    ? { initial: false as const, animate: visible }
    : { initial: hidden, whileInView: visible };
}
