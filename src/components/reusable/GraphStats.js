import React from "react";

const GraphStats = ({ stockData, selectedFilter }) => {
  const isTrendingUp = stockData[0].percentChanged >= 0;
  // Conditional variable to set the color of the text on stats based on if the stock at the timeframe selected is trending up
  const textColor = isTrendingUp ? "text-bright-green" : "text-red";
  return (
    <div className="mt-2 mb-4">
      <h2 className="text-green font-semibold text-5xl">
        ${stockData[0].recentPrice}
      </h2>
      <p
        className={`${textColor} font-medium text-md mt-2 py-2 px-4 rounded-full bg-green inline-block`}
      >
        {stockData[0].priceChange >= 0 ? "+" : "-"} $
        {Math.abs(stockData[0].priceChange)} ({stockData[0].percentChanged}
        %)
        <p className="inline text-light-gray font-light">
          {" "}
          {selectedFilter
            ? stockData[0].marketClosed
              ? selectedFilter +
                " - Closed on " +
                new Date(
                  parseInt(stockData[0].marketClosed) * 1000
                ).toLocaleDateString("en-US", {
                  month: "numeric",
                  day: "numeric",
                })
              : selectedFilter + " - Market Open"
            : ""}
        </p>
      </p>
    </div>
  );
};

export default GraphStats;
