"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { HERO } from "@/constants";
import QuickLinkSection from "../layout/quick-link-section";
import { motion } from "motion/react";

export default function HeroSection() {
  const t = useTranslations("HomePage");

  return (
    <section
      id="hero"
      className="relative border-b-[0.5px] border-solid border-[#38393C]"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="content-max-width flex flex-col items-center justify-center gap-9 px-6 py-10 pb-20 xs:pb-25 sm:px-20 sm:pt-20 sm:pb-36.25"
      >
        <div className="flex flex-col items-center gap-y-2.5">
          <div className="h-21 w-21 overflow-hidden rounded-full grayscale-100">
            <Image
              alt={HERO.profileImageAlt}
              className="h-full w-full object-cover"
              height={84}
              src={HERO.profileImage}
              width={84}
            />
          </div>
          <p className="text-center text-sm font-normal">
            {t("name")}
          </p>
        </div>
        <p className="mx-auto w-full max-w-133.5 text-center text-lg font-medium sm:text-2xl">
          {t("Hero.tagline")}
        </p>
      </motion.div>

      <div className="absolute bottom-0 left-1/2 z-50 hidden w-full -translate-x-1/2 translate-y-1/2 xs:block">
        <QuickLinkSection />
      </div>
    </section>
  );
}
