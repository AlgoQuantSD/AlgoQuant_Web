import { React, useState, useEffect, useContext, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";
import Graph from "../reusable/Graph";
import AlgoquantApiContext from "../../api/ApiContext";
import Table from "../reusable/Table";
import { SaveSpinner } from "../reusable/LoadSpinner";
import { GraphSpinner } from "../reusable/LoadSpinner";
import GraphStats from "../reusable/GraphStats";
import { filters } from "../utils/filtersEnum";

const SearchResultsPage = () => {
  const location = useLocation();
  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);

  // State variable to keep track of what timeframe of data is fetched
  const [selectedFilter, setSelectedFilter] = useState("Today");

  // State variable to store the graph data displayed
  // x - amount, y - time
  const [xValues, setXValues] = useState([]);
  const [yValues, setYValues] = useState([]);

  // All state variables for stock related data / statistics
  const [percentChanged, setPercentChanged] = useState(null);
  const [priceChange, setPriceChange] = useState(null);
  const [dateClosed, setDateClosed] = useState(null);
  const [marketClosed, setMarketClosed] = useState(false);
  const [high52w, setHigh52w] = useState(null);
  const [low52w, setLow52w] = useState(null);
  const [high, setHigh] = useState(null);
  const [low, setLow] = useState(null);
  const [open, setOpen] = useState(null);
  const [recentPrice, setRecentPrice] = useState(null);

  // used to determine when to show a loading component when data is being fetched
  const [graphLoading, setGraphLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);

  // header used for the columns on the table
  const header = [
    { key: "open", title: "Open" },
    { key: "high", title: "High" },
    { key: "low", title: "Low" },
    { key: "yearHigh", title: "Year High" },
    { key: "yearLow", title: "Year Low" },
  ];

  // Aggregated object of the stock data to pass as a prop to children components
  // using the state variables from above
  const aggregatedStockData = [
    {
      recentPrice: recentPrice,
      open: open,
      high: high,
      low: low,
      yearHigh: high52w,
      yearLow: low52w,
      priceChange: priceChange,
      percentChanged: percentChanged,
      marketClosed: marketClosed,
      dateClosed: dateClosed,
    },
  ];

  /*
 Function to determine what timeframe of graph data to fetch based on the filter enum (timeframe selected by user)
  calls the getGraphData to retreive data and updates the filter the user has selcted with: setSelectedFilter
  */
  const getData = (filter) => {
    switch (filter) {
      case filters.DAY:
        getGraphData("D");
        setSelectedFilter(filter);
        break;
      case filters.FIVE:
        getGraphData("5D");
        setSelectedFilter(filter);
        break;
      case filters.MONTH:
        getGraphData("M");
        setSelectedFilter(filter);
        break;
      case filters.YEAR:
        getGraphData("Y");
        setSelectedFilter(filter);
        break;
      default:
        break;
    }
  };

  // Callback function that calls Algoquant's api to grab new graph data based on the timeframe
  const getGraphData = useCallback(
    (timeframe) => {
      if (algoquantApi.token) {
        setGraphLoading(true);
        algoquantApi
          .getGraphData(location.state.value, timeframe)
          .then((resp) => {
            setXValues(resp.data["close"]);
            setPercentChanged(resp.data["percent_change"].toFixed(2));
            setPriceChange(
              parseFloat(resp.data["interval_price_change"]).toFixed(2)
            );
            setMarketClosed(resp.data["is_market_closed"]);

            // If the timeframe selected was day, store the first timeframe (yVal) to keep track of the day the market was open,
            // DateClosed variable will then used to show the date the market is closed, if it is.
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

            // based on the timeframe selected (filter) set the timeframe (yData) from response to appropriate date format
            switch (timeframe) {
              case "D":
                setYValues(
                  resp.data["timestamp"].map((timestamp) =>
                    new Date(timestamp * 1000).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  )
                );
                break;
              case "5D":
                setYValues(
                  resp.data["timestamp"].map((timestamp) =>
                    new Date(timestamp * 1000).toLocaleDateString("en-US", {
                      month: "numeric",
                      day: "numeric",
                    })
                  )
                );
                break;
              case "M":
                setYValues(
                  resp.data["timestamp"].map((timestamp) =>
                    new Date(timestamp * 1000).toLocaleDateString("en-US", {
                      month: "numeric",
                      day: "numeric",
                    })
                  )
                );
                break;
              case "Y":
                setYValues(
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

  // Helper function to reset state variables to inital values when a new stock is searched, as it does not refresh any of the state variables
  const ResetStockData = () => {
    setSelectedFilter("Today");
    setXValues(null);
    setXValues(null);
    setRecentPrice(null);
    setOpen(null);
    setHigh(null);
    setLow(null);
    setLow52w(null);
    setHigh52w(null);
    setPriceChange(null);
    setPercentChanged(null);
    setMarketClosed(null);
    setDateClosed(null);
  };

  // Should initially get all the graphdata for the day time frame and the stock data info for the table and when the search value change
  // aka when a user searches for a new ticker
  useEffect(() => {
    ResetStockData();
    setStatsLoading(true);
    getData(filters.DAY);
    if (algoquantApi.token) {
      algoquantApi
        .getStockInfo(location.state.value)
        .then((resp) => {
          setRecentPrice(resp.data["recent_price"].toFixed(2));
          setOpen(resp.data["open"].toFixed(2));
          setHigh(resp.data["high"].toFixed(2));
          setLow(resp.data["low"].toFixed(2));
          setHigh52w(resp.data["low"].toFixed(2));
          setLow52w(resp.data["52wk_low"].toFixed(2));
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
    <div className="bg-cokewhite">
      <Navbar />
      <div className="flex self-stretch">
        <Sidebar />
        <div className="sm:w-3/4 md:w-5/6 lg:w-7/8 p-5 ">
          <div className="pt-10">
            <h1 className="text-green font-bold text-5xl">
              {location.state.value}
            </h1>
            <GraphStats
              stockData={aggregatedStockData}
              selectedFilter={selectedFilter}
            />
          </div>
          <div className="w-11/12 h-4/5">
            {graphLoading ? (
              <GraphSpinner />
            ) : (
              <Graph
                stockData={aggregatedStockData}
                xValues={xValues}
                yValues={yValues}
                getData={getData}
                selectedFilter={selectedFilter}
              />
            )}

            {statsLoading ? (
              <div className="mt-28 w-full">
                <SaveSpinner />
              </div>
            ) : (
              <div className="mt-20 w-full">
                <Table data={aggregatedStockData} header={header} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
