"use client";

import { CONTACT_DETAILS } from "@/constants";
import { Check, Copy } from "lucide-react";
import { motion } from "motion/react";
import {
  useEffect,
  useRef,
  useState,
} from "react";

export default function ContactSection() {
  const [copiedLabel, setCopiedLabel] = useState<
    string | null
  >(null);
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
    label: string,
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
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
          className="section-header text-left xs:text-left"
        >
          Contact
        </motion.h2>

        <div className="grid gap-4 md:grid-cols-2">
          {CONTACT_DETAILS.map(
            ({ label, value, Icon }, index) => {
              const isCopied =
                copiedLabel === label;

              return (
                <motion.button
                  aria-label={`Copy ${label}`}
                  className="group flex items-center gap-3 border-2 border-solid border-foreground bg-background p-3 text-left transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  onClick={() =>
                    handleCopy(label, value)
                  }
                  key={label}
                  type="button"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.08,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true, amount: 0.2 }}
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
                        ? "Copied!"
                        : value}
                    </p>
                  </div>
                </motion.button>
              );
            },
          )}
        </div>

        <p aria-live="polite" className="sr-only">
          {copiedLabel
            ? `${copiedLabel} copied to clipboard.`
            : ""}
        </p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="border-t border-border pt-6 text-center text-xs text-muted-foreground"
        >
          © 2026 Vong Souvan. All rights reserved.
        </motion.p>
      </div>
    </section>
  );
}
