import AboutSection from "@/components/home/about-section";
import ContactSection from "@/components/home/contact-section";
import HeroSection from "@/components/home/hero-section";
import ProjectSection from "@/components/home/projects-section";
import ExprienceSection from "@/components/home/exprience-section";
import SkillSection from "@/components/home/skill-section";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("HomePage");

  return (
    <>
      <HeroSection />
      <ProjectSection />
      <ExprienceSection />
      <SkillSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
