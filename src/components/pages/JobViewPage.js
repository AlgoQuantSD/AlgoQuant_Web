import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../reusable/NavBar";
import Graph from "../reusable/Graph";
import Table from "../reusable/Table";
import GraphStats from "../reusable/GraphStats";
import Sidebar from "../reusable/SideBar";
import StopJobModal from "../singular/Modals/StopJobModal";

const JobViewPage = () => {
  const location = useLocation();
  const [stopJobModal, setStopJobModal] = useState(null);
  const [page, setPage] = useState(1);

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

  // functions to handle a page change
  const handleNextClick = () => {
    setPage(page + 1);
  };

  const handlePreviousClick = () => {
    setPage(page - 1);
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

  const handleFilterSelection = (filter) => {
    getData(filter);
    setSelectedFilter(filter);
  };

  const header = [
    { key: "jobName", title: "Job Name" },
    { key: "buyOrSell", title: "Buy or Sell" },
    { key: "stockTicker", title: "Stock Ticker" },
    { key: "shares", title: "Shares" },
    { key: "amount", title: "Amount" },
    { key: "date", title: "Date" },
  ];

  const data = [
    {
      jobName: "Job 1",
      buyOrSell: "Buy",
      stockTicker: "AAPL",
      shares: "1",
      amount: "$128.55",
      date: "08/12/2022",
    },
    {
      jobName: "Job 2",
      buyOrSell: "Buy",
      stockTicker: "AAPL",
      shares: "1",
      amount: "$128.55",
      date: "08/12/2022",
    },
    {
      jobName: "Job 3",
      buyOrSell: "Buy",
      stockTicker: "AAPL",
      shares: "1",
      amount: "$128.55",
      date: "08/12/2022",
    },
    {
      jobName: "Job 4",
      buyOrSell: "Buy",
      stockTicker: "AAPL",
      shares: "1",
      amount: "$128.55",
      date: "08/12/2022",
    },
  ];

  return (
    <div className="bg-cokewhite overflow-x-auto overflow-y-auto">
      <Navbar />
      <div className="flex self-stretch">
        <Sidebar />
        <div className="sm:w-3/4 md:w-5/6 lg:w-7/8 p-5">
          <StopJobModal
            setStopJobModal={setStopJobModal}
            stopJobModal={stopJobModal}
            investor={location.state.value}
          />
          <div className="flex pt-10 justify-between items-center">
            <p className="text-green font-bold text-5xl">
              {location.state.value.name}'s Job
            </p>
            <button
              className="rounded bg-red text-white px-4 py-2 mt-3"
              onClick={() => {
                setStopJobModal(true);
              }}
            >
              Stop Job
            </button>
          </div>
          <GraphStats stockData={stockData} selectedFilter={selectedFilter} />
          <div className="z-10 w-11/12 mx-auto my-10 mb-32">
            <Graph
              stockData={stockData}
              chartData={chartData}
              categories={categories}
              handleFilterSelection={handleFilterSelection}
              selectedFilter={selectedFilter}
            />
          </div>
          <p className="text-green font-bold text-5xl mb-8">Recent Trades</p>
          <Table data={data} header={header}></Table>
          <div className="p-6 pt-24 pb-20 overflow-auto	">
            <button
              className="text-cokewhite rounded-md w-28 h-10 bg-green py-2 px-6"
              onClick={handlePreviousClick}
            >
              Previous
            </button>

            <button
              className="text-cokewhite w-28 h-10 rounded-md bg-green py-2 px-6 float-right"
              onClick={handleNextClick}
            >
              Next
            </button>
            <p className="text-md font-light text-center text-light-gray mt-5">
              {"Page " + page}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobViewPage;
