import Link from "next/link";
import { Button } from "../ui/shared/button";

export default function Navbar() {
  return (
    <div className="content-max-width px-20 py-[20]">
      <nav className="flex items-center justify-center">
        {/* Logo */}
        <Link href="/">
          <span className="text-[17px] font-bold uppercase">Vongsouvan</span>
        </Link>
      </nav>
    </div>
  )
}