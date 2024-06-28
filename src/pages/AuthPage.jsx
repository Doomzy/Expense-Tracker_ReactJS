import { Logo } from "../assets";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

function AuthPage() {
  return (
    <div id="AuthPage" className="w-full h-full">
      <SignedOut>
        <div className="m-auto text-white w-fit pt-24 md:pt-36 px-4">
          <div className=" w-fit m-auto mb-4">
            <Logo width={120} height={120}></Logo>
          </div>
          <span className=" text-3xl md:text-4xl font-bold mt-5">
            Hello, Welcome to
            <span className=" text-secondary-dark text-4xl md:text-5xl">
              {" "}
              Expenses{" "}
            </span>
            Tracker
          </span>
          <p className=" text-md md:text-lg font-semibold text-secondary-normal mt-3">
            The Pathway to Manage Your Finances Like Never Before.
          </p>

          <div className="grid grid-rows-2 px-7 gap-14 md:px-0 md:gap-0 md:flex md:justify-around mt-16 ">
            <SignInButton mode="modal">Login</SignInButton>
            <SignUpButton mode="modal" forceRedirectUrl="/">
              Register
            </SignUpButton>
          </div>
        </div>
      </SignedOut>
      <SignedIn>
        <Navigate to={"/"} />
      </SignedIn>
    </div>
  );
}

export default AuthPage;
