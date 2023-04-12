import React from "react";
import MobileApp from "../../assets/images/mobileAQ2.png";
import { Link } from "react-router-dom";

const MobileLoginPage = () => {
  return (
    <div className="bg-smokewhite flex h-full w-screen justify-center items-center flex-col overflow-y-auto">
      <h1 className="text-green font-bold text-3xl text-center mb-4 pt-6">
        Open Algoquant
      </h1>
      <p className="text-green text-xl font-medium text-center mb-4">
        You must have Algoquant mobile app installed for this link to work.
      </p>
      <Link
        to="/"
        className="block bg-green rounded-full text-white p-2 font-normal w-32 flex items-center justify-center mb-4"
      >
        Back
      </Link>
      <div>
        <img
          src={MobileApp}
          alt="mobile app"
          className="object-contain md:object-scale-down max-h-screen pb-6 px-6"
        />
      </div>
    </div>
  );
};

export default MobileLoginPage;
