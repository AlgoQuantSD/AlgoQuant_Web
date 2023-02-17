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
    <div>
      <h2 className="text-white font-semibold text-3xl mt-2">
        ${stockData[0].recentPrice}
      </h2>
      {isTrendingUp ? (
        <p className="text-bright-green font-medium text-md mt-2">
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
        <p className="text-red font-medium text-md mt-2">
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
