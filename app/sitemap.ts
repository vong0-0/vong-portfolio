import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const localizedUrls = Object.fromEntries(
    routing.locales.map((locale) => [
      locale,
      new URL(`/${locale}`, SITE_URL).toString(),
    ]),
  ) as Record<(typeof routing.locales)[number], string>;
  const alternateLanguages = {
    ...localizedUrls,
    "x-default": localizedUrls[routing.defaultLocale],
  };

  return routing.locales.map((locale) => ({
    url: localizedUrls[locale],
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === routing.defaultLocale ? 1 : 0.8,
    alternates: {
      languages: alternateLanguages,
    },
  }));
}
