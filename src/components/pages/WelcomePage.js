import React from "react";
import { Link } from "react-router-dom";
import aqLogoWithName from "../../assets/images/aq-logo-with-name.png";
import CardGallery from "../reusable/CardGallery";

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
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/login"
                  className="bg-green text-dark-gray font-semibold py-2 px-4 rounded-full hover:bg-green-600"
                >
                  Log in / Sign up
                </Link>
              </li>
            </ul>
          </div>
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
          className="bg-dark-gray rounded-full text-green p-4 font-semibold w-32 flex items-center justify-center"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
