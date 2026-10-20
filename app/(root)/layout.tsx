import type { ReactNode } from "react";
import Script from "next/script";
import "../globals.css";

const defaultLocaleRedirect = `
(() => {
  const basePath = window.location.pathname.replace(/\\/+$/, "");
  window.location.replace(basePath + "/en/");
})();
`;

export default function HomeLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <Script
          id="default-locale-redirect"
          strategy="beforeInteractive"
        >
          {defaultLocaleRedirect}
        </Script>
        {children}
      </body>
    </html>
  );
}
