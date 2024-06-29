import { Link } from "react-router-dom";
import { mobNavLinks } from "../constants";
import { useState, useRef, useEffect } from "react";
import { MenuBtn } from "./";
import { Burger_Icon, Close_Icon, Logout_Icon } from "../assets";
import { SignOutButton } from "@clerk/clerk-react";

function MobNav() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        toggleMenu &&
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setToggleMenu(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [toggleMenu]);

  return (
    <div ref={menuRef}>
      <MenuBtn onClick={() => setToggleMenu(!toggleMenu)}>
        {toggleMenu ? (
          <Close_Icon width={50} height={50} />
        ) : (
          <Burger_Icon width={50} height={50} />
        )}
      </MenuBtn>

      <ul
        id="MobNav"
        className={`${
          toggleMenu ? "h-[35rem]" : "h-0"
        } transition-all md:hidden overflow-hidden fixed left-0 text-3xl right-0 top-[7.1rem] pt-0 px-5 bg-primary-normal`}
      >
        {mobNavLinks.map((link) => (
          <li
            key={link.name}
            className="hover:scale-105 transition-all my-5 rounded-3xl border-4 border-primary-dark"
          >
            <Link
              className="w-full h-full p-4 flex justify-between items-center"
              to={"/" + link.name}
            >
              <span>{link.name}</span>
              <link.icon width={45} height={45} />
            </Link>
          </li>
        ))}
        <li className="hover:scale-105 transition-all my-5 rounded-3xl border-4 border-primary-dark">
          <SignOutButton>
            <button className="flex justify-between">
              <p>Logout</p>
              <Logout_Icon width={45} height={45} />
            </button>
          </SignOutButton>
        </li>
      </ul>
    </div>
  );
}

export default MobNav;
