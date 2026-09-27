import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};
const withNextIntl = createNextIntlPlugin({
  experimental: {
    // Enables usage of `useExtracted`
    extract: true,

    messages: {
      // Relative path to the directory
      path: "./messages",

      // Either 'json', 'po', or a custom format (see below)
      format: "json",

      // Either 'infer' to automatically detect locales based on
      // matching files in `path` or an explicit array of locales
      locales: "infer",

      // Defines which locale holds the canonical source strings
      sourceLocale: "en",
    },

    // Relative path(s) to source code files
    srcPath: "./app",

    // Provide the path to the messages that you're using in `AppConfig`
    createMessagesDeclaration:
      "./messages/en.json",
  },
});

export default withNextIntl(nextConfig);
