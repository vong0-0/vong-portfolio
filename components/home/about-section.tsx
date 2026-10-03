import { useTranslations } from "next-intl";

export default function AboutSection() {
  const t = useTranslations("HomePage.About");
  const tRoot = useTranslations();

  return (
    <section
      id="about"
      className="relative border-b-[0.5px] border-solid border-[#38393C]"
    >
      <div className="content-max-width space-y-6 px-6 py-12 md:py-20">
        <h2 className="section-header">
          {t("header")}
        </h2>

        <div className="mx-auto max-w-140 space-y-4 text-[15px] text-muted-foreground md:text-base">
          <p>
            {t("intro", { name: "ວົງສຸວັນ" })}
          </p>
          {(t.raw("paragraphs") as string[]).map(
            (paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
