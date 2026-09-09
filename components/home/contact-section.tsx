"use client";

import { CONTACT_DETAILS } from "@/constants";
import { Check, Copy } from "lucide-react";
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
        <h2 className="section-header text-left xs:text-left">
          Contact
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {CONTACT_DETAILS.map(
            ({ label, value, Icon }) => {
              const isCopied =
                copiedLabel === label;

              return (
                <button
                  aria-label={`Copy ${label}`}
                  className="group flex items-center gap-3 border-2 border-solid border-foreground bg-background p-3 text-left transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  onClick={() =>
                    handleCopy(label, value)
                  }
                  key={label}
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
                        ? "Copied!"
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
            ? `${copiedLabel} copied to clipboard.`
            : ""}
        </p>

        <p className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © 2026 Vong Souvan. All rights reserved.
        </p>
      </div>
    </section>
  );
}
