"use client";

import { useTranslations } from "next-intl";
import { Languages } from "lucide-react";

export default function LanguageButton() {
  const t = useTranslations("HeaderActions");

  return (
    <button
      aria-label={t("changeLanguageLabel")}
      className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      type="button"
    >
      <span>{t("changeLanguage")}</span>
      <Languages aria-hidden="true" className="size-3.5" />
    </button>
  );
}
