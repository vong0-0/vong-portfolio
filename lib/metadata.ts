import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site-url";

const openGraphLocales: Record<
  (typeof routing.locales)[number],
  string
> = {
  en: "en_US",
  lo: "lo_LA",
};

export async function generateLocaleMetadata(
  locale: string,
): Promise<Metadata> {
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({
    locale,
    namespace: "metadata",
  });
  const description = t("description");
  const englishUrl = new URL("/en", SITE_URL).toString();

  return {
    metadataBase: new URL(SITE_URL),
    title: "Vongsouvan Chanthasone",
    description,
    alternates: {
      languages: {
        en: englishUrl,
        lo: new URL("/lo", SITE_URL).toString(),
        "x-default": englishUrl,
      },
    },
    openGraph: {
      title: "Vongsouvan Chanthasone",
      description,
      url: new URL(`/${locale}`, SITE_URL).toString(),
      siteName: "Vongsouvan Chanthasone",
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
        },
      ],
      locale: openGraphLocales[locale],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Vongsouvan Chanthasone",
      description,
      images: ["/images/og-image.png"],
    },
  };
}
