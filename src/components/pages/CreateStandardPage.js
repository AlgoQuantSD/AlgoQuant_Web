import React, { useState } from "react";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";
import CardGallery from "../singular/CardGallery";

const CreateStandardPage = () => {
  const [investorName, setInvestorName] = useState(null);
  // const [indicators, setIndicators] = useState([]);
  // const [profitStop, setprofitStop] = useState(null);
  // const [lossStop, setLossStop] = useState(null);

  return (
    <div className="bg-cokewhite overflow-x-auto overflow-y-auto">
      <Navbar />
      <div className="flex self-stretch">
        <Sidebar />
        <div className="sm:w-3/4 md:w-5/6 lg:w-7/8 p-5">
          <div className="flex pt-10">
            <h1 className="text-green font-bold text-5xl">
              Start from Scratch
            </h1>
          </div>
          <div className="p-3 mt-6">
            {/* Name */}
            <p className="text-another-gray text-2xl font-semibold mb-2">
              What do you want to call your investor?
            </p>
            <input
              className="bg-smokewhite focus:outline-none focus:shadow-outline py-2 px-4 block w-1/3 font-medium text-xl appearance-none leading-normal shadow-md caret-green text-green"
              type="text"
              placeholder={"Investor Name"}
              onChange={(event) => {
                setInvestorName(event.target.value);
              }}
            />
            {/* Indicator Selection */}
            <div className="flex flex-col bg-faded-green p-24 mt-10">
              <CardGallery />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStandardPage;
