const EXPRIENCES = [
  {
    year: "2025",
    title: "Dev Tour Laos — Programming Contest",
    decs: "Competed in Dev Tour Laos Programming Contest 2025, one of the country's largest developer competitions, held under the Web Technology track with support from the Ministry of Labor and Social Welfare and Lailaolab to discover Laos's top emerging developers.",
  },
  {
    year: "2025",
    title: "WorldSkills ASEAN Manila 2025",
    decs: "Represented Laos in the Web Technologies category at WorldSkills ASEAN Manila 2025, a regional skills competition held in August 2025 — building functioning web solutions from a live brief under strict time constraints alongside some of the region's most skilled young developers.",
  },
  {
    year: "2025",
    title: "Internship — Lailaolab",
    decs: "During a one-month internship at Lailaolab, a software development company in Laos, I worked as a Frontend Developer Intern building the admin-side interface for a food delivery platform, including partial API integration — using React, React Router DOM, TanStack Query, Zustand, Tailwind CSS, and shadcn/ui in a real product codebase alongside a professional engineering team.",
  },
];

export default function ExprienceSection() {
  return (
    <section
      id="exprience"
      className="relative z-40 border-b-[0.5px] border-solid border-[#38393C]"
    >
      <div className="content-max-width space-y-6 px-6 py-12 md:space-y-10 lg:space-y-14">
        <p className="section-header">
          Experience
        </p>

        <div className="relative pl-10 lg:mx-auto lg:w-fit lg:pl-0">
          <div className="absolute top-0 left-0 h-full w-px translate-x-2 bg-foreground lg:left-57 lg:translate-x-0"></div>
          <div className="space-y-8">
            {EXPRIENCES.map(
              ({ year, title, decs }) => (
                <div
                  className="relative lg:grid lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-12"
                  key={`${year}-${title}`}
                >
                  {/* Circle */}
                  <div className="absolute top-0 -left-10 h-4 w-4 rounded-full bg-foreground lg:left-55"></div>

                  {/* Year */}
                  <p className="mb-1.5 text-[13px] text-muted-foreground lg:col-start-1 lg:row-start-1 lg:mb-0 lg:translate-y-[-10%] lg:text-right lg:text-[36px] lg:font-medium lg:text-foreground lg:underline lg:underline-offset-4">
                    {year}
                  </p>

                  <div className="lg:col-start-2 lg:row-start-1 lg:max-w-162.5 lg:pl-8">
                    {/* Title */}
                    <p className="mb-3 text-base font-medium lg:mb-0 lg:border-2 lg:border-solid lg:border-foreground lg:bg-secondary lg:px-6 lg:py-3 lg:text-[18px]">
                      {title}
                    </p>

                    {/* Desc */}
                    <p className="text-[15px] text-muted-foreground lg:border-2 lg:border-t-0 lg:border-solid lg:border-foreground lg:px-6 lg:py-3 lg:text-base">
                      {decs}
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
