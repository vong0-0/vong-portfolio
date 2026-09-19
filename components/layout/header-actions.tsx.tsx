"use client";

import { useSyncExternalStore } from "react";
import {
  Moon,
  Sun,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

type Theme = "light" | "dark";

const themeOptions = [
  {
    value: "light",
    label: "Light theme",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Dark theme",
    icon: Moon,
  },
] as const;

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle(
    "dark",
    theme === "dark",
  );
}

function subscribeToTheme(onChange: () => void) {
  window.addEventListener("themechange", onChange);

  return () => {
    window.removeEventListener("themechange", onChange);
  };
}

function getThemeSnapshot(): Theme {
  return document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";
}

function getServerThemeSnapshot(): Theme {
  return "light";
}

export default function HeaderActions() {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  function handleThemeChange(nextTheme: Theme) {
    window.localStorage.setItem(
      "theme",
      nextTheme,
    );
    applyTheme(nextTheme);
    window.dispatchEvent(new Event("themechange"));
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        transform: "translateY(-30%)",
      }}
      whileInView={{
        opacity: 1,
        transform: "translateY(0%)",
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.5,
      }}
      className="content-max-width flex items-center justify-center px-6 py-5 sm:px-20"
    >
      <div
        aria-label="Theme preference and contact"
        className="flex items-center rounded-full border border-border bg-card p-1"
        role="group"
      >
        {themeOptions.map(
          (
            { value, label, icon: Icon },
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
                  aria-label={label}
                  aria-pressed={isActive}
                  className={`flex items-center justify-center rounded-full px-1.5 py-1.5 text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted hover:text-foreground"
                  }`}
                  onClick={() =>
                    handleThemeChange(value)
                  }
                  title={label}
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

        <Link
          className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          href="#contact"
          title="Contact"
        >
          <span>Contact</span>
          <User
            aria-hidden="true"
            className="size-3 sm:size-3.5"
          />
        </Link>
      </div>
    </motion.div>
  );
}
