import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import HeaderActions from "@/components/layout/header-actions.tsx";
import { NextIntlClientProvider } from "next-intl";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "700"],
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

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        spaceGrotesk.variable,
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
        <HeaderActions />
        <main>
          <NextIntlClientProvider>
            {children}
          </NextIntlClientProvider>
        </main>
      </body>
    </html>
  );
}
