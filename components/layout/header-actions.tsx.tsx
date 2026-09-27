"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import LanguageButton from "@/components/ui/shared/language-button";
import {
  Moon,
  Sun,
} from "lucide-react";

type Theme = "light" | "dark";

const themeOptions = [
  {
    value: "light",
    labelKey: "lightTheme",
    icon: Sun,
  },
  {
    value: "dark",
    labelKey: "darkTheme",
    icon: Moon,
  },
] as const;

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle(
    "dark",
    theme === "dark",
  );
}

export default function HeaderActions() {
  const t = useTranslations("HeaderActions");
  const [theme, setTheme] =
    useState<Theme | null>(null);

  useEffect(() => {
    const savedTheme =
      window.localStorage.getItem("theme");
    const initialTheme: Theme =
      savedTheme === "dark" ? "dark" : "light";

    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  function handleThemeChange(nextTheme: Theme) {
    setTheme(nextTheme);
    window.localStorage.setItem(
      "theme",
      nextTheme,
    );
    applyTheme(nextTheme);
  }

  return (
    <div className="content-max-width flex items-center justify-center px-6 py-5 sm:px-20">
      <div
        aria-label={t("groupLabel")}
        className="flex items-center rounded-full border border-border bg-card p-1"
        role="group"
      >
        {themeOptions.map(
          (
            { value, labelKey, icon: Icon },
            index,
          ) => {
            const isActive = theme === value;

            return (
              <span
                className="flex items-center"
                key={value}
              >
                {index > 0 && (
                  <span
                    aria-hidden="true"
                    className="mx-2 h-5 w-px bg-border"
                  />
                )}
                <button
                  aria-label={t(labelKey)}
                  aria-pressed={isActive}
                  className={`flex items-center justify-center rounded-full px-1.5 py-1.5 text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted hover:text-foreground"
                  }`}
                  onClick={() =>
                    handleThemeChange(value)
                  }
                  title={t(labelKey)}
                  type="button"
                >
                  <Icon
                    aria-hidden="true"
                    className="size-3 sm:size-3.5"
                  />
                </button>
              </span>
            );
          },
        )}

        <div
          aria-hidden="true"
          className="mx-2 h-5 w-px bg-border"
          role="separator"
        />

        <LanguageButton />
      </div>
    </div>
  );
}
