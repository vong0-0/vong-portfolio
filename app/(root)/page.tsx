import Link from "next/link";
import { routing } from "@/i18n/routing";

export default function HomePage() {
  return (
    <main className="flex flex-1 items-center justify-center p-6">
      <p>
        Redirecting to your language. If you are not redirected,{" "}
        <Link
          className="underline underline-offset-4"
          href={`/${routing.defaultLocale}`}
        >
          continue in English
        </Link>
        .
      </p>
    </main>
  );
}
