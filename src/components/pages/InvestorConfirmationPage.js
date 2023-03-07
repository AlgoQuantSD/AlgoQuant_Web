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
              Investor Confirmation
            </h1>
            <p className="mt-3 text-another-gray text-lg font-light">
              Please review over the information and confirm that it is correct.
            </p>
          </div>
          <ul className="grid gap-8 mt-5">
            <li className="flex">
              <p className="text-green text-2xl font-semibold mb-2">
                Investor Name:
              </p>
              <p className="text-green text-2xl font-semibold mb-2">
                {location.state.value.investorName}
              </p>
            </li>
            <li className="flex">
              <p className="text-green text-2xl font-semibold mb-2">
                Trade Frequency:
              </p>
              <p className="text-green text-2xl font-semibold mb-2">
                {location.state.value.tradeFrequency}
              </p>
            </li>

            <li className="flex">
              <p className="text-green text-2xl font-semibold mb-2">
                Profit Stop:
              </p>
              <p className="text-green text-2xl font-semibold mb-2">
                {location.state.value.profitStop}%
              </p>
            </li>

            <li className="flex">
              <p className="text-green text-2xl font-semibold mb-2">
                Loss Stop:
              </p>
              <p className="text-green text-2xl font-semibold mb-2">
                {location.state.value.lossStop}%
              </p>
            </li>

            <li className="flex">
              <p className="text-green text-2xl font-semibold mb-2">
                Selected Indicators:
              </p>
              <p className="text-green text-2xl font-semibold mb-2">
                {location.state.value.indicators.join(", ")}
              </p>
            </li>

            <li className="flex">
              <p className="text-green text-2xl font-semibold mb-2">
                Stock Tickers:
              </p>
              <p className="text-green text-2xl font-semibold mb-2">
                {location.state.value.stocks.join(", ")}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InvestorConfirmationPage;
