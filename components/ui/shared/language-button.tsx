"use client";

import {
  useLocale,
  useTranslations,
} from "next-intl";
import { Check, Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/shared/dropdown-menu";
import Link from "next/link";

const locales = [
  {
    code: "en",
    label: "English",
    available: true,
  },
  { code: "lo", label: "ລາວ", available: true },
] as const;

export default function LanguageButton() {
  const t = useTranslations("HeaderActions");
  const currentLocale = useLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={t("changeLanguageLabel")}
        className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        type="button"
      >
        <span>{t("changeLanguage")}</span>
        <Languages
          aria-hidden="true"
          className="size-3.5"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="max-h-60 w-auto min-w-32 overflow-y-auto"
      >
        {locales.map(
          ({ code, label, available }) => (
            <DropdownMenuItem
              disabled={!available}
              key={code}
              render={
                available ? (
                  <Link
                    href={`/${code}`}
                    prefetch={false}
                    onClick={() => {
                      if (currentLocale !== code) {
                        document.cookie =
                          "skip-entrance=1; path=/; max-age=5; samesite=lax";
                      }
                    }}
                  />
                ) : undefined
              }
            >
              <span>{label}</span>
              {currentLocale === code && (
                <Check
                  aria-hidden="true"
                  className="ml-auto size-3.5"
                />
              )}
            </DropdownMenuItem>
          ),
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
