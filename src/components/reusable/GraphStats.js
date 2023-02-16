import React from "react";

const GraphStats = ({ recentPrice, open, percentChanged }) => {
  return (
    <div>
      <h2 className="text-green font-semibold text-5xl mt-2">${recentPrice}</h2>
      <p className="text-green font-medium text-md mt-2">
        {recentPrice - open >= 0 ? "+" : "-"} $
        {Math.abs(recentPrice - open).toFixed(2)} ({percentChanged}%)
      </p>
    </div>
  );
};

export default GraphStats;
