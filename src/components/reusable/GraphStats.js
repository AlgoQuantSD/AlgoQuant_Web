import React from "react";

const GraphStats = ({ recentPrice, lastIntervalChange, percentChanged }) => {
  return (
    <div>
      <h2 className="text-white font-semibold text-5xl mt-2">
        ${recentPrice.toFixed(2)}
      </h2>
      <p className="text-bright-green font-medium text-md mt-2">
        {lastIntervalChange >= 0 ? "+" : "-"} $
        {Math.abs(lastIntervalChange).toFixed(2)} ({percentChanged.toFixed(2)}%)
      </p>
    </div>
  );
};

export default GraphStats;
