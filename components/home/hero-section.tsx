import { Button } from "@base-ui/react";

export default function HeroSection() {
  return (
    <div className="w-full h-screen flex items-center">
      <div className="grid grid-cols-1 auto-rows-auto gap-3.5 content-max-width px-6 py-10">
        <div className="space-y-3.5">
          <div className="text-[65px] font-bold text-foreground space-y-[-15px]">
            <p className="">Hello.</p>
            <p className="">I'm Vong.</p>
          </div>
          <p className="text-muted-foreground text-lg max-w-[360px]">I'm a Frontend Developer from Laos, building clean and functional web experiences.</p>
        </div>
        <Button className="text-background px-4 py-4 rounded-md bg-accent font-medium">Resume</Button>
      </div>
    </div>
  )
}