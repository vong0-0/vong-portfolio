import { useTranslations } from "next-intl";

const EXPERIENCES = [
  { key: "devTour" },
  { key: "worldSkills" },
  { key: "internship" },
] as const;

export default function ExprienceSection() {
  const t = useTranslations("HomePage.Experience");
  return (
    <section
      id="timeline"
      className="relative z-40 border-b-[0.5px] border-solid border-[#38393C]"
    >
      <div className="content-max-width space-y-6 px-6 py-12 md:space-y-10 md:py-20 lg:space-y-14">
        <p className="section-header">
          {t("header")}
        </p>

        <div className="relative pl-10 lg:mx-auto lg:w-fit lg:pl-0">
          <div className="absolute top-0 left-0 h-full w-px translate-x-2 bg-foreground lg:left-57 lg:translate-x-0"></div>
          <div className="space-y-8">
            {EXPERIENCES.map(
              ({ key }) => (
                <div
                  className="relative lg:grid lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-12"
                  key={key}
                >
                  {/* Circle */}
                  <div className="absolute top-0 -left-10 h-4 w-4 rounded-full bg-foreground lg:left-55"></div>

                  {/* Year */}
                  <p className="mb-1.5 text-[13px] text-muted-foreground lg:col-start-1 lg:row-start-1 lg:mb-0 lg:translate-y-[-10%] lg:text-right lg:text-[36px] lg:font-medium lg:text-foreground lg:underline lg:underline-offset-4">
                    {t(`items.${key}.year`)}
                  </p>

                  <div className="lg:col-start-2 lg:row-start-1 lg:max-w-162.5 lg:pl-8">
                    {/* Title */}
                    <p className="mb-3 text-base font-medium lg:mb-0 lg:border-2 lg:border-solid lg:border-foreground lg:bg-secondary lg:px-6 lg:py-3 lg:text-[18px]">
                      {t(`items.${key}.title`)}
                    </p>

                    {/* Desc */}
                    <p className="text-[15px] text-muted-foreground lg:border-2 lg:border-t-0 lg:border-solid lg:border-foreground lg:px-6 lg:py-3 lg:text-base">
                      {t(`items.${key}.desc`)}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

