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
import HeaderActions from "@/components/layout/header-actions.tsx";
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

const themeScript = `
  (function () {
    var theme = localStorage.getItem("theme");
    document.documentElement.classList.toggle("dark", theme === "dark");
  })();
`;

export const metadata: Metadata = {
  title: "Vongsouvan Chanthasone",
  description:
    "Frontend Developer from Laos building clean, functional web experiences with React and Next.js. Focused on performance, accessibility, and thoughtful design.",
  openGraph: {
    title: "Vongsouvan Chanthasone",
    description:
      "Frontend Developer from Laos building clean, functional web experiences with React and Next.js. Focused on performance, accessibility, and thoughtful design.",
    url: "https://vongsouvan.com",
    siteName: "Vongsouvan Chanthasone",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vongsouvan Chanthasone",
    description:
      "Frontend Developer from Laos building clean, functional web experiences with React and Next.js. Focused on performance, accessibility, and thoughtful design.",
    images: ["/images/og-image.png"],
  },
};

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
            __html: themeScript,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider locale={locale}>
          <HeaderActions />
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
