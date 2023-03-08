import React from "react";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";
import bot1 from "../../assets/images/investors/bot1.png";
import investor1 from "../../assets/images/investors/investor1.png";
import { Link } from "react-router-dom";

const CreateInvestorPage = () => {
  return (
    <div className="bg-cokewhite overflow-x-auto overflow-y-auto">
      <Navbar />
      <div className="flex self-stretch">
        <Sidebar />
        <div className="sm:w-3/4 md:w-5/6 lg:w-7/8 p-5">
          <div className="flex pt-10">
            <h1 className="text-green font-bold text-5xl">
              Create an Investor
            </h1>
          </div>
          <div className="flex w-full mt-10 h-3/4">
            <Link
              to="/createai"
              className="flex flex-col justify-center items-center w-1/2 h-full bg-gold hover:bg-selection-gold relative"
            >
              <div>
                <img src={bot1} alt="bot" className="h-72 mt-12" />
                <p className="mb-1 text-white font-semibold flex justify-center">
                  A R T I F I C I A L &nbsp; I N T E L L I G E N C E
                </p>
              </div>
            </Link>
            <Link
              to="/createstandard"
              className="flex flex-col justify-center items-center w-1/2 h-full bg-green hover:bg-selection-green relative"
            >
              <div>
                <img src={investor1} alt="investor" className="h-72 mt-12" />
                <p className="mb-1 text-white font-semibold flex justify-center">
                  A L G O R I T H M I C
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInvestorPage;
