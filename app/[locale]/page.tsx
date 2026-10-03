import AboutSection from "@/components/home/about-section";
import ContactSection from "@/components/home/contact-section";
import HeroSection from "@/components/home/hero-section";
import ProjectSection from "@/components/home/projects-section";
import ExperienceSection from "@/components/home/experience-section";
import SkillSection from "@/components/home/skill-section";

export default function Page() {
  return (
    <>
      <HeroSection />
      <ProjectSection />
      <ExperienceSection />
      <SkillSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
