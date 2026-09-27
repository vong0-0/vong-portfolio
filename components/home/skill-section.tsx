import { SKILL_ICONS } from "@/constants";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function SkillSection() {
  const t = useTranslations("HomePage.Skills");

  return (
    <section
      id="projects"
      className="relative z-40 border-b-[0.5px] border-solid border-[#38393C] bg-secondary"
    >
      <div className="content-max-width space-y-6 px-6 py-12 md:space-y-10 md:py-20">
        <p className="section-header">{t("header")}</p>

        <div className="flex flex-col items-center justify-center xs:grid xs:auto-rows-auto xs:grid-cols-2 xs:gap-4 md:flex md:flex-row md:flex-wrap">
          {SKILL_ICONS.map(
            ({ name, color, href, Icon }) => (
              <Link
                className="relative flex w-full max-w-90 flex-col items-center gap-3 border-2 border-t-0 border-solid border-foreground bg-background px-6 py-3 first:border-t-2 xs:max-w-full xs:border-2 xs:transition-transform xs:duration-150 xs:hover:-translate-y-2 xs:active:translate-y-0 md:max-w-50 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-[-8px] after:h-[8px] after:bg-foreground after:opacity-0 after:transition-opacity after:duration-150 xs:hover:after:opacity-100 xs:active:after:opacity-0"
                href={href}
                key={name}
                rel="noreferrer"
                target="_blank"
              >
                <Icon style={{ color }} />
                <p className="text-2xl font-bold">
                  {name}
                </p>
              </Link>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
