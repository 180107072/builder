import Image from "next/image";
import Logo from "@/shared/graphics/logo.svg";
import { MenuIcon } from "../icons/menu";

export const Header = () => {
  return (
    <div className="min-h-[100px] w-full shrink-0">
      <div className="h-[100px] px-[100px] w-full items-center flex shrink-0 border-b z-50 border-b-white/25 fixed top-0 left-0">
        <button className="text-[14px] flex gap-5 items-center">
          <MenuIcon />
          Menu
        </button>

        <div className="mx-auto">
          <Image src={Logo} alt="Logo" />
        </div>
      </div>
      &nbsp;
    </div>
  );
};
