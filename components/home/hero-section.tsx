import Image from "next/image";

export default function HeroSection() {
  const name = "Vongsouvan Chanthasone";
  const profileImage = "/profile-image.png";

  return (
    <div className="content-max-width border-0.5 border-[#38393C]">
      <div className="flex flex-col gap-9 items-center justify-center px-6 py-10 sm:px-20 sm:pt-20 pb-36.25">
        <div className="flex flex-col items-center gap-y-2.5">
          <div className="h-21 w-21 overflow-hidden rounded-full grayscale-100">
            <Image
              alt="Profile image"
              className="h-full w-full object-cover"
              height={84}
              src={profileImage}
              width={84}
            />
          </div>
          <p className="font-normal text-sm text-center">{name}</p>
        </div>
        <p className="font-medium text-lg sm:text-2xl max-w-133.5 w-full mx-auto text-center ">
          I'm a Frontend Developer from Laos, building clean and functional web
          experiences.
        </p>
      </div>
    </div>
  );
}
