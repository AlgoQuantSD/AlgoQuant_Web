import React from "react";
import investorPhotos from "../../assets/images/investors/InvestorPhotos";

const JobGallery = () => {
  const investors = [
    {
      name: "Warren Buffett",
      indicators: ["RSI", "MACD", "OBV"],
      stocks: [
        "AMZN",
        "APPL",
        "GOOGL",
        "SPOT",
        "WHAT",
        "WOWZ",
        "YEAH",
        "BALL",
        "DEEP",
        "YUMM",
        "FUKK",
      ],
      id: "investor",
    },
    {
      name: "Money Maker",
      indicators: ["RSI", "MACD", "OBV"],
      stocks: ["AMZN", "APPL", "GOOGL", "SPOT"],
      id: "bot",
    },
    {
      name: "Jordan Belfort",
      indicators: ["RSI", "MACD", "OBV"],
      stocks: ["AMZN", "APPL", "GOOGL", "SPOT"],
      id: "investor",
    },
    {
      name: "Jordan Belfort's Cat",
      indicators: ["RSI", "MACD", "OBV"],
      stocks: ["AMZN", "APPL", "GOOGL", "+ 3 more"],
      id: "investor",
    },
    {
      name: "Warren Buffett's Left Nut",
      indicators: ["RSI", "MACD", "OBV"],
      stocks: ["AMZN", "APPL", "GOOGL", "SPOT"],
      id: "investor",
    },
    {
      name: "Warren Buffett's Left Nut",
      indicators: ["RSI", "MACD", "OBV"],
      stocks: ["AMZN", "APPL", "GOOGL", "SPOT"],
      id: "investor",
    },
  ];

  return (
    <div className="mt-14 p-4">
      {investors.map((investor, i) => (
        <div
          className="w-11/12 text-white bg-red mx-auto p-6"
          key={investor.name}
        >
          {/* Investor Image */}
          <div className="flex justify-center h-24">
            <img
              src={investorPhotos[i % investorPhotos.length]}
              alt=""
              className="h-12 mt-6 mb-6"
            />
          </div>
          {/* Indicators / Stocks */}
          {investor.id !== "bot" && (
            <div className="flex flex-col">
              <div className="flex justify-between pl-16 pr-16"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default JobGallery;
