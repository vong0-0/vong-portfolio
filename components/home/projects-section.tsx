"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

const PROJECTS = [
  {
    title:
      "Receipt Scanner & Financial Dashboard",
    desc: "AI-powered receipt scanner that extracts expense details from a photo and visualizes spending on a dashboard with Lao language and Kip currency support.",
    repo: "#",
  },
  {
    title: "TonNam Smart Restaurant System",
    desc: "A full-stack restaurant platform connecting admins, cashiers, waiters, and kitchen staff — handling orders, real-time kitchen updates, billing, and analytics in one system.",
    repo: "#",
  },
];

export default function ProjectSection() {
  return (
    <section
      id="projects"
      className="relative z-40 border-b-[0.5px] border-solid border-[#38393C] bg-secondary"
    >
      <div className="content-max-width space-y-6 px-6 py-12 xs:pt-20 md:space-y-10 md:pb-20 lg:space-y-14">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="section-header"
        >
          Projects
        </motion.p>

        {/* Project cards */}
        <div className="flex flex-col gap-6">
          {PROJECTS.map(
            ({ title, desc, repo }, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? -48 : 48,
                }}
                key={title}
                className={`mx-auto flex flex-col xs:max-w-125 md:max-w-full md:flex-row ${
                  index % 2 !== 0
                    ? "md:flex-row-reverse"
                    : ""
                  }`}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ amount: 0.2, once: true }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <div className="flex aspect-video w-full min-w-0 flex-none items-center justify-center border-2 border-solid border-foreground md:w-1/2">
                  <p className="font-regular text-xs text-foreground">
                    GIF / screenshot
                  </p>
                </div>

                <div
                  className={`flex w-full min-w-0 flex-none flex-col items-start justify-center border-2 border-t-0 border-solid border-foreground bg-background p-4 md:w-1/2 md:border-t-2 ${
                    index % 2 !== 0
                      ? "md:border-r-0 md:border-l-2"
                      : "md:border-l-0"
                  }`}
                >
                  {/* Project title */}
                  <p className="mb-4 text-xl font-medium lg:text-2xl">
                    {title}
                  </p>

                  {/* Project description */}
                  <p className="mb-4.5 text-[15px] text-muted-foreground lg:text-base">
                    {desc}
                  </p>
                  <Link
                    href={repo}
                    className="group flex items-center gap-1"
                  >
                    <span className="text-[15px] underline underline-offset-2 transition-all duration-300 group-hover:text-muted-foreground lg:text-base">
                      View repo
                    </span>
                    <span className="transition-all duration-300 group-hover:translate-x-[20%] group-hover:text-muted-foreground">
                      <ArrowRight className="size-4.5" />
                    </span>
                  </Link>
                </div>
              </motion.div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
