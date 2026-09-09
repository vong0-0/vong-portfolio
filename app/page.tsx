import AboutSection from "@/components/home/about-section";
import ContactSection from "@/components/home/contact-section";
import HeroSection from "@/components/home/hero-section";
import ProjectSection from "@/components/home/projects-section";
import ExprienceSection from "@/components/home/exprience-section";
import SkillSection from "@/components/home/skill-section";

export default function Page() {
  return (
    <div>
      <HeroSection />
      <ProjectSection />
      <ExprienceSection />
      <SkillSection />
      <AboutSection />
      <ContactSection />
    </div>
  );
}
