import { ABOUT } from "@/constants";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative border-b-[0.5px] border-solid border-[#38393C]"
    >
      <div className="content-max-width space-y-6 px-6 py-12 md:py-20">
        <h2 className="section-header">About</h2>

        <div className="mx-auto max-w-140 space-y-4 text-[15px] text-muted-foreground md:text-base">
          {ABOUT.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
