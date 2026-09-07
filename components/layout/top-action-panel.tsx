'use client'

import { useEffect, useState } from "react"
import { Download, Moon, Sun } from "lucide-react"

type Theme = "light" | "dark"

const themeOptions = [
  { value: "light", label: "Light theme", icon: Sun },
  { value: "dark", label: "Dark theme", icon: Moon },
] as const

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark")
}

export default function TopActionPanel() {
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme")
    const initialTheme: Theme = savedTheme === "dark" ? "dark" : "light"

    setTheme(initialTheme)
    applyTheme(initialTheme)
  }, [])

  function handleThemeChange(nextTheme: Theme) {
    setTheme(nextTheme)
    window.localStorage.setItem("theme", nextTheme)
    applyTheme(nextTheme)
  }

  return (
    <div className="content-max-width flex items-center justify-center px-6 py-5 sm:px-20">
      <div
        aria-label="Theme preference and resume"
        className="flex items-center rounded-full border border-border bg-card p-1"
        role="group"
      >
        {themeOptions.map(({ value, label, icon: Icon }, index) => {
          const isActive = theme === value

          return (
            <span className="flex items-center" key={value}>
              {index > 0 && (
                <span aria-hidden="true" className="mx-2 h-5 w-px bg-border" />
              )}
              <button
                aria-label={label}
                aria-pressed={isActive}
                className={`flex size-9 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                onClick={() => handleThemeChange(value)}
                title={label}
                type="button"
              >
                <Icon aria-hidden="true" className="size-4" />
              </button>
            </span>
          )
        })}

        <div aria-hidden="true" className="mx-2 h-5 w-px bg-border" role="separator" />

        <a
          aria-label="Download resume"
          className="flex h-9 items-center gap-2 rounded-full px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          download
          href="/resume.pdf"
          title="Download resume"
        >
          <span>Resume</span>
          <Download aria-hidden="true" className="size-4" />
        </a>
      </div>
    </div>
  )
}