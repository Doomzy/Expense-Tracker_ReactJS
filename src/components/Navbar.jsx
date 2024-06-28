import { Link } from "react-router-dom";
import { MobNav, DesktopNav } from "./";
import { Logo } from "../assets";
import { SignedIn } from "@clerk/clerk-react";

function Navbar() {
  return (
    <div className="w-full py-6 px-4 text-secondary-normal bg-primary-normal flex justify-between">
      <Link
        to={"/"}
        className=" flex gap-3 text-4xl font-extrabold self-center"
      >
        <Logo width={45} height={45} />
        Expenses
      </Link>
      <SignedIn>
        <MobNav />
        <DesktopNav />
      </SignedIn>
    </div>
  );
}

export default Navbar;
