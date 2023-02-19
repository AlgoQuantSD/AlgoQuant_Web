import React from "react";

const GraphStats = ({ stockData, selectedFilter }) => {
  const isTrendingUp = stockData[0].percentChanged >= 0;

  return (
    <div className="mt-2 mb-4">
      <h2 className="text-green font-semibold text-5xl">
        ${stockData[0].recentPrice}
      </h2>
      {isTrendingUp ? (
        <p className="text-bright-green font-medium text-md mt-2 py-2 px-4 rounded-full bg-green inline-block">
          {stockData[0].priceChange >= 0 ? "+" : "-"} $
          {Math.abs(stockData[0].priceChange)} ({stockData[0].percentChanged}
          %)
          <p className="inline text-light-gray font-light">
            {" "}
            {stockData[0].marketClosed
              ? selectedFilter + " - Closed on " + stockData[0].dateClosed
              : selectedFilter + " - Market Open"}
          </p>
        </p>
      ) : (
        <p className="text-red font-medium text-md mt-2 py-2 px-4 rounded-full bg-green inline-block">
          {stockData[0].priceChange >= 0 ? "+" : "-"} $
          {Math.abs(stockData[0].priceChange)} ({stockData[0].percentChanged}
          %)
          <p className="inline text-light-gray font-light">
            {" "}
            {stockData[0].marketClosed
              ? selectedFilter + " - Closed on " + stockData[0].dateClosed
              : selectedFilter + " - Market Open"}
          </p>
        </p>
      )}
    </div>
  );
};

export default GraphStats;
