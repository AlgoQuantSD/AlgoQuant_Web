import React from "react";
import { useLocation } from "react-router-dom";
import Graph from "../reusable/Graph";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";
// import BacktestAnalysis from "../singular/BacktestAnalysis";
import { Link } from "react-router-dom";

const BacktestingResultsPage = () => {
  const location = useLocation();
  const selectedFilter = null;
  const data = [
    {
      x: new Date(1538778600000),
      y: [6629.81, 6650.5, 6623.04, 6633.33],
    },
  ];

  // Conditional rendering logic
  let statement;
  let profitLoss = location.state.value.profitLoss;
  if (profitLoss < 0) {
    statement = "poorly";
  } else if (profitLoss > 0 && profitLoss < 20) {
    statement = "okay";
  } else if (profitLoss >= 20 && profitLoss < 50) {
    statement = "well";
  } else if (profitLoss >= 50) {
    statement = "extremely well";
  }

  return (
    <div className="bg-cokewhite overflow-y-auto overflow-x-hidden">
      <Navbar />
      <div className="flex self-stretch">
        <Sidebar />
        <div className="sm:w-3/4 md:w-5/6 lg:w-7/8 p-5">
          <div className="flex flex-col pt-10">
            <h1 className="text-green font-bold text-5xl">
              {location.state.value.backtestName} Backtest Results
            </h1>
            <div className="flex p-3 mb-7 w-1/2">
              <p className="flex text-green font-normal text-3xl">
                {location.state.value.investor} performed {statement} according
                to AlgoQuant metrics, yielding a{" "}
                {location.state.value.profitLoss}%{" "}
                {location.state.value.profitLoss > 0 ? "profit" : "loss"} over
                the course of 1,150 days.
              </p>
            </div>
            <div className="w-10/12 mx-auto">
              <Graph stockData={data} selectedFilter={selectedFilter} />
            </div>
            <div className="flex items-center pt-10">
              <h1 className="text-green font-bold sm:text-3xl md:text-4xl pt-3 pr-5">
                Analysis
              </h1>
              <Link
                to="/backtesting"
                className="bg-light-gray rounded-lg text-white font-medium px-4 py-3 mt-2"
              >
                View Full History
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-5 w-1/2 p-3">
              <div className="flex flex-col">
                <p className="text-green text-2xl font-semibold mb-2">
                  Backtest Name:
                </p>
                <p className="text-green text-2xl font-semibold mb-2">
                  Start date:
                </p>
                <p className="text-green text-2xl font-semibold mb-2">
                  End date:
                </p>
                <p className="text-green text-2xl font-semibold mb-2">
                  Initial investment:
                </p>
                <p className="text-green text-2xl font-semibold mb-2">
                  Final balance:
                </p>
                <p className="text-green text-2xl font-semibold mb-2">
                  Net earnings:
                </p>
                <p className="text-green text-2xl font-semibold mb-2">
                  Number of trades:
                </p>
                <p className="text-green text-2xl font-semibold mb-2">
                  Portfolio min value:
                </p>
                <p className="text-green text-2xl font-semibold mb-2">
                  Portfolio max value:
                </p>
                <p className="text-green text-2xl font-semibold mb-2">
                  Average win:
                </p>
                <p className="text-green text-2xl font-semibold mb-2">
                  Average loss:
                </p>
                <p className="text-green text-2xl font-semibold mb-2">
                  Average return:
                </p>
                <p className="text-green text-2xl font-semibold mb-2">
                  Max drawdown:
                </p>
                <p className="text-green text-2xl font-semibold mb-2">
                  Portfolio volatility:
                </p>
                <p className="text-green text-2xl font-semibold mb-2">
                  Sharpe ratio:
                </p>
              </div>
              <div className="flex flex-col w-screen">
                <p className="text-green text-2xl font-medium mb-2">
                  {location.state.value.backtestName}
                </p>
                <p className="text-green text-2xl font-medium mb-2">
                  {location.state.value.startDate}
                </p>
                <p className="text-green text-2xl font-medium mb-2">
                  {location.state.value.endDate}
                </p>
                <p className="text-green text-2xl font-medium mb-2">$1000000</p>
                <p className="text-green text-2xl font-medium mb-2">$1000000</p>
                <p className="text-green text-2xl font-medium mb-2">$1000000</p>
                <p className="text-green text-2xl font-medium mb-2">0</p>
                <p className="text-green text-2xl font-medium mb-2">$1000000</p>
                <p className="text-green text-2xl font-medium mb-2">$1000000</p>
                <p className="text-green text-2xl font-medium mb-2">0</p>
                <p className="text-green text-2xl font-medium mb-2">0</p>
                <p className="text-green text-2xl font-medium mb-2">0</p>
                <p className="text-green text-2xl font-medium mb-2">0</p>
                <p className="text-green text-2xl font-medium mb-2">0</p>
                <p className="text-green text-2xl font-medium mb-2">0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BacktestingResultsPage;
