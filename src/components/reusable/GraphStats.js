import React from "react";

const GraphStats = ({
  stockData,
  percentChanged,
  marketClosed,
  isTrendingUp,
  selectedFilter,
  priceChange,
  dateClosed,
}) => {
  return (
    <div className="mt-2">
      <h2 className="text-green font-semibold text-5xl">
        ${stockData[0].recentPrice}
      </h2>
      {isTrendingUp ? (
        <p className="text-bright-green font-medium text-md mt-2 py-2 px-4 rounded-full bg-green inline-block">
          {priceChange >= 0 ? "+" : "-"} ${Math.abs(priceChange)} (
          {percentChanged.toFixed(2)}
          %)
          <p className="inline text-light-gray font-light">
            {" "}
            {marketClosed
              ? selectedFilter + " Closed on " + dateClosed
              : selectedFilter + " - Market  Open"}
          </p>
        </p>
      ) : (
        <p className="text-red font-medium text-md mt-2 py-2 px-4 rounded-full bg-green inline-block">
          {priceChange >= 0 ? "+" : "-"} ${Math.abs(priceChange)} (
          {percentChanged.toFixed(2)}
          %)
          <p className="inline text-light-gray font-light">
            {" "}
            {marketClosed
              ? selectedFilter + " Closed on " + dateClosed
              : selectedFilter + " - Market  Open"}
          </p>
        </p>
      )}
    </div>
  );
};

export default GraphStats;
