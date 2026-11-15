"use client";

import { CONTACT_DETAILS } from "@/constants";
import { Check, Copy } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import { useSkipEntranceAnimations } from "@/components/providers/locale-animation-provider";
import SectionHeading from "@/components/ui/section-heading";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/shared/tooltip";

type ContactLabelKey =
  (typeof CONTACT_DETAILS)[number]["labelKey"];

export default function ContactSection() {
  const t = useTranslations("HomePage.Contact");
  const skipEntranceAnimations =
    useSkipEntranceAnimations();
  const [copiedLabel, setCopiedLabel] =
    useState<ContactLabelKey | null>(null);
  const resetTimeout = useRef<number | null>(
    null,
  );

  useEffect(() => {
    return () => {
      if (resetTimeout.current !== null) {
        window.clearTimeout(resetTimeout.current);
      }
    };
  }, []);

  async function handleCopy(
    label: ContactLabelKey,
    value: string,
  ) {
    await navigator.clipboard.writeText(value);
    setCopiedLabel(label);

    if (resetTimeout.current !== null) {
      window.clearTimeout(resetTimeout.current);
    }

    resetTimeout.current = window.setTimeout(
      () => {
        setCopiedLabel(null);
      },
      1000,
    );
  }

  return (
    <section
      id="contact"
      className="dot-grid bg-secondary"
    >
      <div className="content-max-width space-y-6 px-6 py-12 md:space-y-10 md:py-20 md:pb-5">
        <SectionHeading
          align="left"
          index="04"
          title={t("header")}
        />

        <TooltipProvider>
          <div className="grid gap-4 md:grid-cols-2">
            {CONTACT_DETAILS.map(
              (
                { labelKey, value, Icon },
                index,
              ) => {
                const label = t(
                  `labels.${labelKey}`,
                );
                const isCopied =
                  copiedLabel === labelKey;

                return (
                  <Tooltip key={labelKey}>
                    <TooltipTrigger
                      render={
                        <motion.button
                          aria-label={t("copy", {
                            label,
                          })}
                          className="group lift-card flex min-w-0 items-center gap-3 border-2 border-solid border-foreground bg-background p-3 text-left hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none md:p-4"
                          onClick={() =>
                            handleCopy(
                              labelKey,
                              value,
                            )
                          }
                          type="button"
                          initial={
                            skipEntranceAnimations
                              ? false
                              : {
                                  opacity: 0,
                                  y: 32,
                                }
                          }
                          animate={
                            skipEntranceAnimations
                              ? {
                                  opacity: 1,
                                  y: 0,
                                }
                              : undefined
                          }
                          whileInView={
                            skipEntranceAnimations
                              ? undefined
                              : {
                                  opacity: 1,
                                  y: 0,
                                }
                          }
                          transition={{
                            type: "spring",
                            stiffness: 220,
                            damping: 22,
                            delay: index * 0.08,
                          }}
                          viewport={{
                            once: true,
                            amount: 0.2,
                          }}
                        >
                          {isCopied ? (
                            <motion.span
                              animate={{
                                rotate: 0,
                                scale: 1,
                              }}
                              className="shrink-0"
                              initial={{
                                rotate: -60,
                                scale: 0,
                              }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 16,
                              }}
                            >
                              <Check
                                aria-hidden="true"
                                className="size-5 text-primary"
                              />
                            </motion.span>
                          ) : (
                            <>
                              <Copy
                                aria-hidden="true"
                                className="hidden size-5 shrink-0 group-hover:block group-focus-visible:block"
                              />
                              <Icon
                                aria-hidden="true"
                                className="size-5 shrink-0 group-hover:hidden group-focus-visible:hidden"
                              />
                            </>
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-muted-foreground">
                              {label}
                            </p>
                            <p className="truncate font-medium">
                              {isCopied
                                ? t("copied")
                                : value}
                            </p>
                          </div>
                        </motion.button>
                      }
                    />
                    <TooltipContent>
                      {isCopied
                        ? t("copied")
                        : t("copy", { label })}
                    </TooltipContent>
                  </Tooltip>
                );
              },
            )}
          </div>
        </TooltipProvider>

        <p aria-live="polite" className="sr-only">
          {copiedLabel
            ? t("copiedAnnouncement", {
                label: t(`labels.${copiedLabel}`),
              })
            : ""}
        </p>

        <motion.p
          initial={
            skipEntranceAnimations
              ? false
              : { opacity: 0 }
          }
          animate={
            skipEntranceAnimations
              ? { opacity: 1 }
              : undefined
          }
          whileInView={
            skipEntranceAnimations
              ? undefined
              : { opacity: 1 }
          }
          transition={{
            duration: 0.5,
            delay: 0.2,
          }}
          viewport={{ once: true }}
          className="border-t border-border pt-6 text-center text-xs text-muted-foreground"
        >
          {t("copyright")}
        </motion.p>
      </div>
    </section>
  );
}
