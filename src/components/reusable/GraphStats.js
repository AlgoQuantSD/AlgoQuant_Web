import React from "react";

const GraphStats = ({ recentPrice, open, percentChanged }) => {
  return (
    <div className="mt-2">
      <h2 className="text-green font-semibold text-5xl">${recentPrice}</h2>
      {recentPrice - open >= 0 ? (
        <p className="text-bright-green font-medium text-md mt-2 py-2 px-4 rounded-full bg-green inline-block">
          + ${Math.abs(recentPrice - open).toFixed(2)} ({percentChanged}%)
        </p>
      ) : (
        <p className="text-red font-medium text-md mt-2">
          - ${Math.abs(recentPrice - open).toFixed(2)} ({percentChanged}%)
        </p>
      )}
    </div>
  );
};

export default GraphStats;
