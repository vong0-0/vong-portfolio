import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ProjectSection() {
  return (
    <section
      id="projects"
      className="relative z-40 border-b-[0.5px] border-solid border-[#38393C] bg-secondary"
    >
      <div className="content-max-width space-y-6 px-6 py-12">
        <p className="text-[28px] font-bold text-foreground">
          Projects
        </p>

        {/* Project cards */}
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex aspect-video items-center justify-center border-2 border-solid border-foreground">
              <p className="font-regular text-xs text-muted-foreground">
                GIF / screenshot
              </p>
            </div>

            <div className="flex flex-col items-start border-2 border-t-0 border-solid border-foreground p-4">
              {/* Project title */}
              <p className="mb-4 text-xl font-medium">
                Receipt Scanner & Financial
                Dashboard
              </p>

              {/* Project description */}
              <p className="mb-[18px] text-[15px] text-muted-foreground">
                AI-powered receipt scanner that
                extracts expense details from a
                photo and visualizes spending on a
                dashboard — with Lao language and
                Kip currency support.
              </p>
              <Link
                href={"#"}
                className="group flex items-center gap-1"
              >
                <span className="text-[15px] underline underline-offset-2 transition-all duration-300 group-hover:text-muted-foreground">
                  View repo
                </span>
                <span className="transition-all duration-300 group-hover:translate-x-[20%] group-hover:text-muted-foreground">
                  <ArrowRight className="size-4.5" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
