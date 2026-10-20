import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import {
  Space_Grotesk,
  Noto_Sans_Lao,
} from "next/font/google";
import "../globals.css";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { generateLocaleMetadata } from "@/lib/metadata";
import AppearanceLanguageControls from "@/components/layout/appearance-language-controls";
import HeaderContainer from "@/components/layout/header-container";
import { LocaleAnimationProvider } from "@/components/providers/locale-animation-provider";
import { NextIntlClientProvider } from "next-intl";

const initialThemeScript = `
(() => {
  try {
    const savedTheme = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const theme =
      savedTheme === "dark" || savedTheme === "light"
        ? savedTheme
        : prefersDark
          ? "dark"
          : "light";

    document.documentElement.classList.toggle(
      "dark",
      theme === "dark",
    );
  } catch {
    document.documentElement.classList.remove("dark");
  }
})();
`;

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
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

  const initialTheme = "light";

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        spaceGrotesk.variable,
        notoSansLao.variable,
        "font-sans",
      )}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: initialThemeScript,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider locale={locale}>
          <LocaleAnimationProvider
            skipEntranceAnimations={false}
          >
            <HeaderContainer
              className={
                "absolute top-0 w-full bg-transparent"
              }
            >
              <AppearanceLanguageControls
                initialTheme={initialTheme}
              />
            </HeaderContainer>
            <main>{children}</main>
          </LocaleAnimationProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
