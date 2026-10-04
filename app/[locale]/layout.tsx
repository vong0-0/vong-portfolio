import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { hasLocale } from "next-intl";
import {
  Space_Grotesk,
  Noto_Sans_Lao,
} from "next/font/google";
import "../globals.css";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { generateLocaleMetadata } from "@/lib/metadata";
import HeaderActions from "@/components/layout/header-actions";
import { LocaleAnimationProvider } from "@/components/providers/locale-animation-provider";
import { NextIntlClientProvider } from "next-intl";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "700"],
});
const notoSansLao = Noto_Sans_Lao({
  subsets: ["lao"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-lao",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateLocaleMetadata(locale);
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const cookieStore = await cookies();
  const savedTheme = cookieStore.get("theme")?.value;
  const initialTheme = savedTheme === "dark" ? "dark" : "light";
  const skipEntranceAnimations =
    cookieStore.get("skip-entrance")?.value === "1";

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(
        "h-full",
        initialTheme === "dark" && "dark",
        "antialiased",
        spaceGrotesk.variable,
        notoSansLao.variable,
        "font-sans",
      )}
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider locale={locale}>
          <LocaleAnimationProvider
            skipEntranceAnimations={
              skipEntranceAnimations
            }
          >
            <HeaderActions initialTheme={initialTheme} />
            <main>{children}</main>
          </LocaleAnimationProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
