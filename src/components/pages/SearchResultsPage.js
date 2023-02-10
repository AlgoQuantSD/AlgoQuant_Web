import { React, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";
import Graph from "../reusable/Graph";
import StockTable from "../singular/StockTable";

const SearchResultsPage = () => {
  const location = useLocation();
  const [selectedFilter, setSelectedFilter] = useState("Today");

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

  const filters = {
    DAY: "Today",
    FIVE: "Past 5 days",
    MONTH: "Past month",
    YEAR: "Past Year",
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

  const handleFilterSelection = (filter) => {
    getData(filter);
    setSelectedFilter(filter);
    // logic to update chart data based on selected filter
  };

  /*
  Callback used to get more data based on the filter. Each time any of the buttons 
  are clicked this will be called to get more data. This will update the chart data which 
  will then re-render the graph
  */
  const getData = (filter) => {
    if (filter === "year") {
      setChartData([]);
    } else {
      setChartData(chartData.concat(chartData));
      setCategories(categories.concat(categories));
      setStockData(stockData);
      console.log("Request filter: " + filter);
    }
  };

  // Should initial get all the data for the day time frame
  //useEffect(() => {
  //  `getData("day")
  //})

  return (
    <div className="bg-dark-gray overflow-x-auto overflow-y-auto">
      <Navbar />
      <div className="flex self-stretch">
        <Sidebar />
        <div className="sm:w-3/4 md:w-5/6 lg:w-7/8 p-5">
          <div className="pt-10">
            <h1 className="text-white font-bold text-5xl">
              {location.state.value}
            </h1>
            <h2 className="text-white font-semibold text-3xl mt-2">
              ${stockData[0].recentPrice}
            </h2>
            <p className="text-bright-green font-medium text-md mt-2">
              {stockData[0].recentPrice - stockData[0].open >= 0 ? "+" : "-"} $
              {Math.abs(stockData[0].recentPrice - stockData[0].open).toFixed(
                2
              )}{" "}
              ({stockData[0].percentChanged}
              %)
              <p className="inline text-light-gray font-light">
                {" "}
                {selectedFilter}
              </p>
            </p>
          </div>
          <div className="w-11/12 h-4/5 mx-auto my-10">
            <Graph
              chartData={chartData}
              categories={categories}
              getData={getData}
            />
            <div className="flex mt-4 justify-center">
              <button
                className={`py-2 px-4 text-white font-semibold border-b-2 border-dark-gray hover:bg-another-gray ${
                  selectedFilter === filters.DAY ? "border-b-green active" : ""
                }`}
                onClick={() => handleFilterSelection(filters.DAY)}
              >
                D
              </button>
              <button
                className={`py-2 px-4 text-white font-semibold border-b-2 border-dark-gray hover:bg-another-gray ${
                  selectedFilter === filters.FIVE ? "border-b-green active" : ""
                }`}
                onClick={() => handleFilterSelection(filters.FIVE)}
              >
                5D
              </button>
              <button
                className={`py-2 px-4 text-white font-semibold border-b-2 border-dark-gray hover:bg-another-gray ${
                  selectedFilter === filters.MONTH
                    ? "border-b-green active"
                    : ""
                }`}
                onClick={() => handleFilterSelection(filters.MONTH)}
              >
                M
              </button>
              <button
                className={`py-2 px-4 text-white font-semibold border-b-2 border-dark-gray hover:bg-another-gray ${
                  selectedFilter === filters.YEAR ? "border-b-green active" : ""
                }`}
                onClick={() => handleFilterSelection(filters.YEAR)}
              >
                Y
              </button>
            </div>
            <StockTable stockData={stockData} getData={getData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
