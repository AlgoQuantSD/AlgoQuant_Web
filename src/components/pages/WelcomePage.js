import React from "react";
import { Link } from "react-router-dom";
import aqLogoWithName from "../../assets/images/aq-logo-with-name.png";
import CardGallery from "../singular/CardGallery";

const WelcomePage = () => {
  return (
    <div className="flex bg-green h-screen w-screen overflow-x-auto overflow-y-auto">
      <nav className="fixed top-0 w-full bg-cokewhite p-3 border-gray-300 shadow">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <Link to="/" className="flex items-center">
            <img
              src={aqLogoWithName}
              className="mr-3 h-6 sm:h-9"
              alt="AlgoQuant Logo"
            />
          </Link>
          <div
            className="hidden w-full  md:block md:w-auto"
            id="navbar-default"
          >
            <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/login"
                  className="bg-green text-cokewhite font-semibold py-2 px-4 rounded-full hover:bg-green-600"
                >
                  Log in / Sign up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="flex justify-between items-center">
        {/* Left side */}
        <div className="flex bg-gray ml-60">
          <CardGallery />
        </div>

        {/* Right side */}
        <div className="flex bg-gray flex-col justify-center ml-80">
          <div className="text-7xl text-cokewhite font-bold pb-5">
            Investing
            <br></br>
            simplified.
          </div>
          <Link
            to="/login"
            className="bg-cokewhite rounded-full text-green p-4 font-normal w-32 flex items-center justify-center"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
