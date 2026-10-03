"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";

export default function AboutSection() {
  const t = useTranslations("HomePage.About");
  const tRoot = useTranslations();

  return (
    <section
      id="about"
      className="relative border-b-[0.5px] border-solid border-[#38393C]"
    >
      <div className="content-max-width space-y-6 px-6 py-12 md:py-20">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
          className="section-header"
        >
          {t("header")}
        </motion.h2>

        <div className="mx-auto max-w-140 space-y-4 text-[15px] text-muted-foreground md:text-base">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.25 }}
          >
            {t("intro", { name: tRoot("HomePage.name") })}
          </motion.p>
          {(t.raw("paragraphs") as string[]).map(
            (paragraph, index) => (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.25 }}
              key={index}
            >
              {paragraph}
            </motion.p>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
