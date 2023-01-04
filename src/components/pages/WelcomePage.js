import React from "react";
import { Link } from "react-router-dom";
// import Navbar from "./NavBar";

const WelcomePage = () => {
  return (
    <div className="flex bg-green h-screen w-screen">
      {/* <Navbar /> */}

      {/* Left side */}
      <div className="bg-gray w-1/2 h-full flex items-center justify-center">
        <div className="text-2xl text-dark-gray font-bold">
          Welcome to our website!
        </div>
      </div>

      {/* Right side */}
      <div className="bg-gray w-1/2 h-full flex flex-col items-center justify-center">
        <div className="text-2xl text-dark-gray font-bold">
          Investing simplified.
        </div>
        {/* <button onClick={<Link></Link>>} className="bg-dark-gray rounded-full text-white p-4">
          Get Started
        </button> */}
        <Link to="/login" className="bg-dark-gray rounded-full text-white p-4">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
