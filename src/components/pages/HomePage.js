import { React, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";
import InvestorGallery from "../singular/InvestorGallery";
import "react-multi-carousel/lib/styles.css";
import Graph from "../reusable/Graph";
import GraphStats from "../reusable/GraphStats";
import JobGallery from "../singular/JobGallery";

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
  const [selectedFilter, setSelectedFilter] = useState("Today");

  const [selectedTabFilter, setSelectedTabFilter] = useState("investor");

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

  const handleFilterSelection = (filter) => {
    getData(filter);
    setSelectedFilter(filter);
  };

  /*Callback used to get more data based on the filter. Each time any of the buttons 
    are clicked this will be called to get more data. This will update the chart data which 
    will then re-render the graph
    */
  const getData = (filter) => {
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
    <div className="bg-cokewhite overflow-x-auto overflow-y-auto">
      <Navbar />
      <div className="flex self-stretch">
        <Sidebar />
        <div className="sm:w-3/4 md:w-5/6 lg:w-7/8 p-5">
          <div className="pt-10">
            <h2 className="text-green font-bold text-4xl">Your Assets</h2>
          </div>
          <GraphStats stockData={stockData} selectedFilter={selectedFilter} />
          <div className="w-11/12 mx-auto my-10 mb-32">
            <Graph
              stockData={stockData}
              chartData={chartData}
              categories={categories}
              handleFilterSelection={handleFilterSelection}
              selectedFilter={selectedFilter}
            />
          </div>
          <div className="w-full">
            <h3 className="text-green font-bold text-4xl">Invest</h3>
          </div>
          <div className="flex mx-auto justify-center w-2/4 mt-8">
            <button
              className={`py-2 px-20 text-green border-b-2 border-b-green border-cokewhite hover:bg-smokewhite  ${
                selectedTabFilter === tabFilters.INVESTOR
                  ? "text-cokewhite border-b-green bg-green active hover:bg-green"
                  : ""
              }`}
              onClick={() => handleTabFilterSelection(tabFilters.INVESTOR)}
            >
              Investor
            </button>
            <button
              className={`py-2 px-20 text-green border-b-2 border-b-green border-cokewhite hover:bg-smokewhite ${
                selectedTabFilter === tabFilters.JOB
                  ? "text-cokewhite border-b-green bg-green active hover:bg-green"
                  : ""
              }`}
              onClick={() => handleTabFilterSelection(tabFilters.JOB)}
            >
              Job
            </button>
            <button
              className={`py-2 px-20 text-green border-b-2 border-b-green border-cokewhite hover:bg-smokewhite ${
                selectedTabFilter === tabFilters.history
                  ? "text-cokewhite border-b-green bg-green active hover:bg-green"
                  : ""
              }`}
              onClick={() => handleTabFilterSelection(tabFilters.history)}
            >
              History
            </button>
          </div>
          <div className=" mt-10">
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
                      <InvestorGallery />
                    </div>
                  );
                case "job":
                  return (
                    <div>
                      <JobGallery />
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
                      <JobGallery />
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
