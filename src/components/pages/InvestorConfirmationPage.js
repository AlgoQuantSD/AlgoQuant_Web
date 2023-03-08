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
          <div className="grid grid-cols-2 gap-8 mt-5 w-1/2">
            <div className="flex flex-col">
              <p className="text-green text-2xl font-semibold mb-2">
                Investor Name:
              </p>
              <p className="text-green text-2xl font-semibold mb-2">
                Trade Frequency:
              </p>
              <p className="text-green text-2xl font-semibold mb-2">
                Profit Stop:
              </p>
              <p className="text-green text-2xl font-semibold mb-2">
                Loss Stop:
              </p>
              <p className="text-green text-2xl font-semibold mb-2">
                Selected Indicators:
              </p>
              <p className="text-green text-2xl font-semibold mb-2">
                Stock Tickers:
              </p>
            </div>
            <div className="flex flex-col w-screen">
              <p className="text-green text-2xl font-medium mb-2">
                {location.state.value.investorName}
              </p>
              <p className="text-green text-2xl font-medium mb-2">
                {location.state.value.tradeFrequency === "minutes"
                  ? "High Frequency Day Trader - 30 minutes"
                  : location.state.value.tradeFrequency === "hour"
                  ? "Low Frequency Day Trader - 1 hour"
                  : location.state.value.tradeFrequency === "hours"
                  ? "High Frequency Swing Trader - 4 hours"
                  : location.state.value.tradeFrequency === "day"
                  ? "Low Frequency Swing Trader - 1 day"
                  : location.state.value.tradeFrequency === "week"
                  ? "High Frequency Long Trader - 1 week"
                  : location.state.value.tradeFrequency === "month"
                  ? "Low Frequency Long Trader - 1 month"
                  : ""}
              </p>
              <p className="text-green text-2xl font-medium mb-2">
                {location.state.value.profitStop}%
              </p>
              <p className="text-green text-2xl font-medium mb-2">
                {location.state.value.lossStop}%
              </p>
              <p className="text-green text-2xl font-medium mb-2">
                {location.state.value.indicators
                  .map((indicator) => indicator.toUpperCase())
                  .join(", ")}
              </p>
              <p className="text-green text-2xl font-medium mb-2">
                {location.state.value.stocks.join(", ")}
              </p>
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
    </div>
  );
};

export default InvestorConfirmationPage;
