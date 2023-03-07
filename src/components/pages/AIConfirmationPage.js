import React from "react";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";
import { useLocation } from "react-router-dom";

const InvestorConfirmationPage = () => {
  const location = useLocation();

  return (
    <div className="bg-cokewhite overflow-x-auto overflow-y-auto">
      <Navbar />
      <div className="flex self-stretch">
        <Sidebar />
        <div className="sm:w-3/4 md:w-5/6 lg:w-7/8 p-5">
          <div className="flex flex-col pt-10">
            <h1 className="text-green font-bold text-5xl">
              AI Investor Confirmation
            </h1>
            <p className="mt-3 text-another-gray text-lg font-light">
              Please review over the information and confirm that it is correct.
            </p>
          </div>
          <div className="grid grid-cols-2 mt-5 w-1/3">
            <div className="flex flex-col">
              <p className="text-green text-2xl font-semibold mb-5">
                Investor Name:
              </p>
              <p className="text-green text-2xl font-semibold mb-5">
                Profit Stop:
              </p>
              <p className="text-green text-2xl font-semibold mb-5">
                Loss Stop:
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-green text-2xl font-medium mb-5">
                {location.state.value.investorName}
              </p>
              <p className="text-green text-2xl font-medium mb-5">
                {location.state.value.profitStop}%
              </p>
              <p className="text-green text-2xl font-medium mb-5">
                {location.state.value.lossStop}%
              </p>
            </div>
          </div>
          {/* Create Investor Button */}
          <div className="mt-10">
            <button className="text-cokewhite font-medium rounded-lg bg-green px-4 py-2">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorConfirmationPage;
