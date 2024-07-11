import { Logo } from "../assets";
import { Link } from "react-router-dom";
import { mobNavLinks } from "../constants";

function Footer() {
  return (
    <footer className=" shadow mt-auto">
      <div className=" bg-primary-dark lg:px-32 w-full mt-20 p-4 md:py-8">
        <div className=" sm:flex sm:items-center sm:justify-between">
          <Link
            to={"/"}
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <Logo width={60} height={60} />
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium  sm:mb-0 text-gray-400">
            {mobNavLinks.map((navLink) => (
              <li key={navLink.name}>
                <Link
                  to={"/" + navLink.name}
                  className="hover:underline me-4 md:me-6"
                >
                  {navLink.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <hr className="my-6  sm:mx-auto rder-gray-700 lg:my-8" />
        <span className="block text-sm 00 sm:text-center text-gray-400">
          © 2024 <span className="hover:underline cursor-pointer">Expense</span>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
