import { React, useState } from "react";
import { Link } from "react-router-dom";
import Graph from "../reusable/Graph";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";

const HomePage = () => {
  // Currently hardcoded but will eventually come from API
  const [chartData, setChartData] = useState([
    50, 41, 35, 51, 4, 62, 262, 91, 134,
  ]);

  const [categories, setCategories] = useState([
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
  ]);

  const [selectedTabFilter, setSelectedTabFilter] = useState("investor");
  const [selectedGraphFilter, setSelectedGraphFilter] = useState("Today");

  const graphFilters = {
    DAY: "Today",
    FIVE: "Past 5 days",
    MONTH: "Past month",
    YEAR: "Past Year",
  };

  const tabFilters = {
    INVESTOR: "investor",
    JOB: "job",
    history: "history",
  };

  const [stockData, setStockData] = useState([
    {
      symbol: "AAPL",
      recentPrice: 150.23,
      open: 140.0,
      high: 162.5,
      low: 126.5,
      yearHigh: 167.0,
      yearLow: 100.0,
      percentChanged: 1.5,
    },
  ]);

  const handleTabFilterSelection = (filter) => {
    setSelectedTabFilter(filter);
    // logic to update chart data based on selected filter
  };

  const handleGraphFilterSelection = (filter) => {
    getGraphData(filter);
    setSelectedGraphFilter(filter);
    // logic to update chart data based on selected filter
  };

  /*
    Callback used to get more data based on the filter. Each time any of the buttons 
    are clicked this will be called to get more data. This will update the chart data which 
    will then re-render the graph
    */
  const getGraphData = (filter) => {
    if (filter === "Past Year") {
      setChartData([]);
    } else {
      setChartData(chartData.concat(chartData));
      setCategories(categories.concat(categories));
      setStockData(stockData);
      console.log("Request filter: " + filter);
    }
  };

  return (
    <div className="bg-dark-gray overflow-x-auto overflow-y-auto">
      <Navbar />
      <div className="flex self-stretch">
        <Sidebar />
        <div className="sm:w-3/4 md:w-5/6 lg:w-7/8 p-5">
          <div className="pt-10">
            <h2 className="text-green font-bold text-4xl">Your Assets</h2>
          </div>
          <h2 className="text-white font-semibold text-5xl mt-2">
            ${stockData[0].recentPrice}
          </h2>
          <p className="text-bright-green font-medium text-md mt-2">
            {stockData[0].recentPrice - stockData[0].open >= 0 ? "+" : "-"} $
            {Math.abs(stockData[0].recentPrice - stockData[0].open).toFixed(2)}{" "}
            ({stockData[0].percentChanged}
            %)
            <p className="inline text-light-gray font-light">
              {" "}
              {selectedGraphFilter}
            </p>
          </p>
          <div className="w-11/12 mx-auto my-10">
            <Graph
              chartData={chartData}
              categories={categories}
              getGraphData={getGraphData}
            />
            <div className="flex mt-4 justify-center">
              <button
                className={`py-2 px-4 text-white font-semibold border-b-2 border-dark-gray hover:bg-another-gray ${
                  selectedGraphFilter === graphFilters.DAY
                    ? "border-b-green active"
                    : ""
                }`}
                onClick={() => handleGraphFilterSelection(graphFilters.DAY)}
              >
                D
              </button>
              <button
                className={`py-2 px-4 text-white font-semibold border-b-2 border-dark-gray hover:bg-another-gray ${
                  selectedGraphFilter === graphFilters.FIVE
                    ? "border-b-green active"
                    : ""
                }`}
                onClick={() => handleGraphFilterSelection(graphFilters.FIVE)}
              >
                5D
              </button>
              <button
                className={`py-2 px-4 text-white font-semibold border-b-2 border-dark-gray hover:bg-another-gray ${
                  selectedGraphFilter === graphFilters.MONTH
                    ? "border-b-green active"
                    : ""
                }`}
                onClick={() => handleGraphFilterSelection(graphFilters.MONTH)}
              >
                M
              </button>
              <button
                className={`py-2 px-4 text-white font-semibold border-b-2 border-dark-gray hover:bg-another-gray ${
                  selectedGraphFilter === graphFilters.YEAR
                    ? "border-b-green active"
                    : ""
                }`}
                onClick={() => handleGraphFilterSelection(graphFilters.YEAR)}
              >
                Y
              </button>
            </div>
          </div>
          <div className="w-full">
            <h3 className="text-green font-bold text-4xl">Invest</h3>
          </div>
          <div className="flex mx-auto justify-center w-2/4 mt-8">
            <button
              className={`py-2 px-20 text-white border-b-2 border-dark-gray hover:bg-another-gray ${
                selectedTabFilter === tabFilters.INVESTOR
                  ? "border-b-green active"
                  : ""
              }`}
              onClick={() => handleTabFilterSelection(tabFilters.INVESTOR)}
            >
              Investor
            </button>
            <button
              className={`py-2 px-20 text-white border-b-2 border-dark-gray hover:bg-another-gray ${
                selectedTabFilter === tabFilters.JOB
                  ? "border-b-green active"
                  : ""
              }`}
              onClick={() => handleTabFilterSelection(tabFilters.JOB)}
            >
              Job
            </button>
            <button
              className={`py-2 px-20 text-white border-b-2 border-dark-gray hover:bg-another-gray ${
                selectedTabFilter === tabFilters.history
                  ? "border-b-green active"
                  : ""
              }`}
              onClick={() => handleTabFilterSelection(tabFilters.history)}
            >
              History
            </button>
          </div>
          <div className="mt-10 h-screen">
            {(() => {
              switch (selectedTabFilter) {
                case "investor":
                  return (
                    <div>
                      <Link
                        to="/createinvestor"
                        className="relative text-white font-medium rounded-lg bg-green px-4 py-3"
                      >
                        Create Investor
                      </Link>
                    </div>
                  );
                case "job":
                  return (
                    <div>
                      <Link
                        to="/createjob"
                        className="relative text-white font-medium rounded-lg bg-green px-4 py-3"
                      >
                        Create Job
                      </Link>
                    </div>
                  );
                case "history":
                  return (
                    <div>
                      <Link
                        to="/history"
                        className="relative text-white font-medium rounded-lg bg-green px-4 py-3"
                      >
                        View all transactions
                      </Link>
                    </div>
                  );
                default:
                  return null;
              }
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
