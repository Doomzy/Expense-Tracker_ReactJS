import { Link } from "react-router-dom";
import { navLinks } from "../constants";
import { UserButton } from "@clerk/clerk-react";

function DesktopNav() {
  return (
    <ul className="md:flex hidden gap-8 lg:gap-10 text-xl font-semibold items-center">
      {navLinks.map((link) => (
        <li key={link.name} className=" hover:scale-110 transition-all">
          <Link className="w-full h-full flex gap-2 items-center" to={""}>
            <link.icon width={30} height={30} />
            {link.name}
          </Link>
        </li>
      ))}

      <li>
        <UserButton
          userProfileUrl="/profile"
          appearance={{ variables: { colorText: "#063348" } }}
        />
      </li>
    </ul>
  );
}

export default DesktopNav;
