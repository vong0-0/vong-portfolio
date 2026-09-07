"use client";

import { useEffect, useState } from "react";
import { Download, Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

const themeOptions = [
  { value: "light", label: "Light theme", icon: Sun },
  { value: "dark", label: "Dark theme", icon: Moon },
] as const;

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export default function HeaderActions() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    const initialTheme: Theme = savedTheme === "dark" ? "dark" : "light";

    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  function handleThemeChange(nextTheme: Theme) {
    setTheme(nextTheme);
    window.localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
  }

  return (
    <div className="content-max-width flex items-center justify-center px-6 py-5 sm:px-20">
      <div
        aria-label="Theme preference and resume"
        className="border-border bg-card flex items-center rounded-full border p-1"
        role="group"
      >
        {themeOptions.map(({ value, label, icon: Icon }, index) => {
          const isActive = theme === value;

          return (
            <span className="flex items-center" key={value}>
              {index > 0 && (
                <span aria-hidden="true" className="bg-border mx-2 h-5 w-px" />
              )}
              <button
                aria-label={label}
                aria-pressed={isActive}
                className={`focus-visible:ring-ring flex items-center justify-center rounded-full px-1.5 py-1.5 transition-colors focus-visible:ring-2 focus-visible:outline-none ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                onClick={() => handleThemeChange(value)}
                title={label}
                type="button"
              >
                <Icon aria-hidden="true" className="size-3 sm:size-3.5" />
              </button>
            </span>
          );
        })}

        <div
          aria-hidden="true"
          className="bg-border mx-2 h-5 w-px"
          role="separator"
        />

        <a
          aria-label="Download resume"
          className="text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-ring flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none"
          download
          href="/resume.pdf"
          title="Download resume"
        >
          <span>Resume</span>
          <Download aria-hidden="true" className="size-3 sm:size-3.5" />
        </a>
      </div>
    </div>
  );
}
