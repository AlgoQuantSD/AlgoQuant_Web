import React from "react";
import { Link } from "react-router-dom";
import aqLogoWithName from "../../assets/images/aqLogoWithName.png";
import CardGallery from "../CardGallery";

const WelcomePage = () => {
  return (
    <div className="flex bg-green h-screen w-screen">
      <nav className="fixed top-0 w-full z-50 px-4 py-2 bg-dark-gray border-gray-300 shadow">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <a href="http://localhost:3000/" className="flex items-center">
            <img
              src={aqLogoWithName}
              className="mr-3 h-6 sm:h-9"
              alt="AlgoQuant Logo"
            />
          </a>
        </div>
      </nav>

      {/* Left side */}
      <div className="bg-gray w-1/2 h-full flex items-center justify-center">
        <CardGallery />
      </div>

      {/* Right side */}
      <div className="bg-gray w-1/2 h-full flex flex-col justify-center pl-32">
        <div className="text-7xl text-dark-gray font-bold pb-5">
          Investing
          <br></br>
          simplified.
        </div>
        <Link
          to="/login"
          className="bg-dark-gray rounded-full text-white p-4 font-light w-32"
        >
          <p className="ml-1">Get Started</p>
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
