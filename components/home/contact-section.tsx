"use client";

import { CONTACT_DETAILS } from "@/constants";
import { Check, Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  useEffect,
  useRef,
  useState,
} from "react";

type ContactLabelKey =
  (typeof CONTACT_DETAILS)[number]["labelKey"];

export default function ContactSection() {
  const t = useTranslations("HomePage.Contact");
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
        <h2 className="section-header text-left xs:text-left">
          {t("header")}
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {CONTACT_DETAILS.map(
            ({ labelKey, value, Icon }) => {
              const label = t(`labels.${labelKey}`);
              const isCopied =
                copiedLabel === labelKey;

              return (
                <button
                  aria-label={t("copy", { label })}
                  className="group flex items-center gap-3 border-2 border-solid border-foreground bg-background p-3 text-left transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  onClick={() =>
                    handleCopy(labelKey, value)
                  }
                  key={labelKey}
                  type="button"
                >
                  {isCopied ? (
                    <Check
                      aria-hidden="true"
                      className="size-5 shrink-0 text-primary"
                    />
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
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {label}
                    </p>
                    <p className="font-medium">
                      {isCopied
                        ? t("copied")
                        : value}
                    </p>
                  </div>
                </button>
              );
            },
          )}
        </div>

        <p aria-live="polite" className="sr-only">
          {copiedLabel
            ? t("copiedAnnouncement", {
                label: t(`labels.${copiedLabel}`),
              })
            : ""}
        </p>

        <p className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
          {t("copyright")}
        </p>
      </div>
    </section>
  );
}
