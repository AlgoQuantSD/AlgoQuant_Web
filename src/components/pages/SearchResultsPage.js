import { React, useState, useEffect, useContext, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";
import Graph from "../reusable/Graph";
import AlgoquantApiContext from "../../api/ApiContext";
import Table from "../reusable/Table";
import { SaveSpinner } from "../reusable/LoadSpinner";
import { GraphSpinner } from "../reusable/LoadSpinner";

const SearchResultsPage = () => {
  const location = useLocation();

  const [selectedFilter, setSelectedFilter] = useState("Today");
  // Currently hardcoded but will eventually come from API
  const [chartData, setChartData] = useState([]);
  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);
  const [categories, setCategories] = useState([]);

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
    },
  ]);
  const [percentChanged, setPercentChanged] = useState(0);
  const [priceChange, setPriceChange] = useState(0);
  const [graphLoading, setGraphLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [dateClosed, setDateClosed] = useState(0);
  const [marketClosed, setMarketClosed] = useState(false);

  const isTrendingUp = percentChanged >= 0;
  // header used for the columns on the table
  const header = [
    { key: "open", title: "Open" },
    { key: "high", title: "High" },
    { key: "low", title: "Low" },
    { key: "yearHigh", title: "Year High" },
    { key: "yearLow", title: "Year Low" },
  ];

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
    switch (filter) {
      case filters.DAY:
        getGraphData("D");
        break;
      case filters.FIVE:
        getGraphData("5D");
        break;
      case filters.MONTH:
        getGraphData("M");
        break;
      case filters.YEAR:
        getGraphData("Y");
        break;
      default:
        break;
    }
  };
  const getGraphData = useCallback(
    (timeframe) => {
      if (algoquantApi.token) {
        setGraphLoading(true);
        algoquantApi
          .getGraphData(location.state.value, timeframe)
          .then((resp) => {
            setPercentChanged(resp.data["percent_change"]);
            setPriceChange(resp.data["interval_price_change"]);
            setChartData(resp.data["close"]);
            setMarketClosed(resp.data["is_market_closed"]);
            if (timeframe === "D") {
              setDateClosed(
                new Date(resp.data["timestamp"][0] * 1000).toLocaleDateString(
                  "en-US",
                  {
                    weekday: "long",
                    month: "numeric",
                    day: "numeric",
                  }
                )
              );
            }
            switch (timeframe) {
              case "D":
                setCategories(
                  resp.data["timestamp"].map((timestamp) =>
                    new Date(timestamp * 1000).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  )
                );
                break;
              case "5D":
                setCategories(
                  resp.data["timestamp"].map((timestamp) =>
                    new Date(timestamp * 1000).toLocaleDateString("en-US", {
                      month: "numeric",
                      day: "numeric",
                    })
                  )
                );
                break;
              case "M":
                setCategories(
                  resp.data["timestamp"].map((timestamp) =>
                    new Date(timestamp * 1000).toLocaleDateString("en-US", {
                      month: "numeric",
                      day: "numeric",
                    })
                  )
                );
                break;
              case "Y":
                setCategories(
                  resp.data["timestamp"].map((timestamp) =>
                    new Date(timestamp * 1000).toLocaleDateString("en-US", {
                      month: "numeric",
                      year: "numeric",
                    })
                  )
                );
                break;
              default:
                break;
            }
            setGraphLoading(false);
          })
          .catch((err) => {
            // TODO: Need to implement better error handling
            console.log(err);
          });
      }
    },
    [algoquantApi, location.state.value]
  );

  // Should initial get all the graphdata for the day time frame and the stock data info for the table and when the search value change
  // aka when a user searches for a new ticker
  useEffect(() => {
    if (selectedFilter !== "Today") {
      setSelectedFilter("Today");
    }
    setChartData([]);
    setStatsLoading(true);
    getData(filters.DAY);
    if (algoquantApi.token) {
      algoquantApi
        .getStockInfo(location.state.value)
        .then((resp) => {
          setStockData([
            {
              symbol: location.state.value,
              recentPrice: resp.data["recent_price"].toFixed(2),
              open: resp.data["open"].toFixed(2),
              high: resp.data["high"].toFixed(2),
              low: resp.data["low"].toFixed(2),
              yearHigh: resp.data["52wk_high"].toFixed(2),
              yearLow: resp.data["52wk_low"].toFixed(2),
            },
          ]);
          setStatsLoading(false);
        })
        .catch((err) => {
          // TODO: Need to implement better error handling
          console.log(err);
        });
    }
    // eslint-disable-next-line
  }, [location.state.value, algoquantApi]);

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
            {isTrendingUp ? (
              <p className="text-bright-green font-medium text-md mt-2">
                {priceChange >= 0 ? "+" : "-"} ${Math.abs(priceChange)} (
                {percentChanged.toFixed(2)}
                %)
                <p className="inline text-light-gray font-light">
                  {" "}
                  {marketClosed
                    ? selectedFilter + " Closed on " + dateClosed
                    : selectedFilter + " - Market  Open"}
                </p>
              </p>
            ) : (
              <p className="text-red font-medium text-md mt-2">
                {priceChange >= 0 ? "+" : "-"} ${Math.abs(priceChange)} (
                {percentChanged.toFixed(2)}
                %)
                <p className="inline text-light-gray font-light">
                  {" "}
                  {marketClosed
                    ? selectedFilter + " Closed on " + dateClosed
                    : selectedFilter + " - Market  Open"}
                </p>
              </p>
            )}
          </div>
          <div className="w-11/12 h-4/5 mx-auto my-10">
            {graphLoading ? (
              <GraphSpinner />
            ) : (
              <Graph
                chartData={chartData}
                categories={categories}
                isTrendingUp={isTrendingUp}
              />
            )}

            <div className="flex mt-4 justify-center pb-10">
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
            {statsLoading ? (
              <SaveSpinner />
            ) : (
              <Table data={stockData} header={header} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
