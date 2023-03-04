import React from "react";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";
import bot1 from "../../assets/images/investors/bot1.png";
import investor1 from "../../assets/images/investors/investor1.png";

const CreateInvestorPage = () => {
  return (
    <div className="bg-cokewhite overflow-x-auto overflow-y-auto">
      <Navbar />
      <div className="flex self-stretch">
        <Sidebar />
        <div className="sm:w-3/4 md:w-5/6 lg:w-7/8 p-5">
          <div className="flex pt-10">
            <h1 className="text-green font-bold text-5xl">Create Investor</h1>
          </div>
          {/* <div className="flex flex-col w-44 mt-10">
            <p className="mb-1 text-gold font-semibold flex justify-center">
              P R E M I U M
            </p>
            <button className="relative text-white font-medium rounded-lg bg-gold px-4 py-3">
              Create Trading AI
            </button>
          </div>
          <div className="mt-10">
            <button className="relative text-white font-medium rounded-lg bg-green px-4 py-3">
              Start From Scratch
            </button>
          </div> */}
          <div className="flex w-full mt-10 h-3/4">
            <button className="flex flex-col justify-center items-center w-1/2 h-full bg-gold hover:bg-selection-gold">
              <img src={bot1} alt="bot" className="h-72 mt-12" />
              <p className="mb-1 text-white font-semibold flex justify-center">
                P R E M I U M
              </p>
            </button>
            <button className="flex flex-col justify-center items-center w-1/2 h-full bg-green hover:bg-selection-green">
              <img src={investor1} alt="investor" className="h-72 mt-12" />
              <p className="mb-1 text-white font-semibold flex justify-center">
                S T A N D A R D
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInvestorPage;
