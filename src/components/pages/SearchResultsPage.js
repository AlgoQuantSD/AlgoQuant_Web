import { React, useState, useEffect, useContext, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";
import Graph from "../reusable/Graph";
import StockTable from "../singular/StockTable";
import AlgoquantApiContext from "../../api/ApiContext";
const SearchResultsPage = () => {
  const location = useLocation();
  const [selectedFilter, setSelectedFilter] = useState("Today");

  // Currently hardcoded but will eventually come from API
  const [chartData, setChartData] = useState([1, 2, 3, 4, 5]);
  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);
  const [categories, setCategories] = useState([1, 2, 3, 4, 5]);

  const filters = {
    DAY: "Today",
    FIVE: "Past 5 days",
    MONTH: "Past month",
    YEAR: "Past Year",
  };

  const [stockData, setStockData] = useState([
    {
      symbol: "",
      recentPrice: 0,
      open: 0,
      high: 0,
      low: 0,
      yearHigh: 0,
      yearLow: 0,
      percentChanged: 0,
    },
  ]);

  const handleFilterSelection = (filter) => {
    console.log("in here");
    getData(filter);
    setSelectedFilter(filter);
    // logic to update chart data based on selected filter
  };

  /*
  Callback used to get more data based on the filter. Each time any of the buttons 
  are clicked this will be called to get more data. This will update the chart data which 
  will then re-render the graph
  */
  const getData = (filters) => {
    // if (filter === "year") {
    //   setChartData([]);
    // } else {
    //   getGraphData("5D");
    //   setCategories(categories);
    //   setStockData(stockData);
    //   console.log("Request f
    console.log(filters);
    switch (filters) {
      case "Today":
        getGraphData("D");
        console.log("ep");
        break;
      case "Past 5 Days":
        getGraphData("5D");
        break;
      case filters.MONTH:
        getGraphData("M");
        break;
      case filters.YEAR:
        getGraphData("Y");
        break;
      // default:
      //   break;
    }
  };
  const getGraphData = useCallback(
    (timeframe) => {
      if (algoquantApi.token) {
        algoquantApi
          .getGraphData(location.state.value, timeframe)
          .then((resp) => {
            setChartData(resp.data["close"]);
            setCategories(resp.data["timestamp"]);
          })
          .catch((err) => {
            // TODO: Need to implement better error handling
            console.log(err);
          });
      }
    },
    [algoquantApi, location.state.value]
  );
  console.log(chartData);
  console.log(stockData);
  // Should initial get all the graphdata for the day time frame and the stock data info for the table and when the search value change
  // aka when a user searches for a new ticker
  useEffect(() => {
    getData(filters.DAY);
    if (algoquantApi.token) {
      algoquantApi
        .getStockInfo(location.state.value)
        .then((resp) => {
          setStockData([
            {
              symbol: location.state.value,
              recentPrice: resp.data["recent_price"],
              open: resp.data["open"],
              high: resp.data["high"],
              low: resp.data["low"],
              yearHigh: resp.data["52wk_high"],
              yearLow: resp.data["52wk_low"],
              percentChanged: 1.5,
            },
          ]);
          console.log("poop");
        })
        .catch((err) => {
          // TODO: Need to implement better error handling
          console.log(err);
        });
    }
  }, [location.state.value, algoquantApi]);
  console.log(location.state.value);
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
