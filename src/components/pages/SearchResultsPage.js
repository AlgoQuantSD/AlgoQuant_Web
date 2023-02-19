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

const SearchResultsPage = () => {
  const location = useLocation();

  const [selectedFilter, setSelectedFilter] = useState("Today");
  // Currently hardcoded but will eventually come from API
  const [chartData, setChartData] = useState([]);
  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);
  const [categories, setCategories] = useState([]);

  const [percentChanged, setPercentChanged] = useState(null);
  const [priceChange, setPriceChange] = useState(0);
  const [graphLoading, setGraphLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [dateClosed, setDateClosed] = useState(0);
  const [marketClosed, setMarketClosed] = useState(false);

  const [high52w, setHigh52w] = useState(null);
  const [low52w, setLow52w] = useState(null);
  const [high, setHigh] = useState(null);
  const [low, setLow] = useState(null);
  const [open, setOpen] = useState(null);
  const [recentPrice, setRecentPrice] = useState(null);

  const filters = {
    DAY: "Today",
    FIVE: "Past 5 days",
    MONTH: "Past month",
    YEAR: "Past Year",
  };

  // header used for the columns on the table
  const header = [
    { key: "open", title: "Open" },
    { key: "high", title: "High" },
    { key: "low", title: "Low" },
    { key: "yearHigh", title: "Year High" },
    { key: "yearLow", title: "Year Low" },
  ];

  // Aggregated object of the stock data to pass as a prop to children components
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
            setPercentChanged(resp.data["percent_change"].toFixed(2));
            setPriceChange(
              parseFloat(resp.data["interval_price_change"]).toFixed(2)
            );
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
  const handleFilterSelection = (filter) => {
    getData(filter);
    setSelectedFilter(filter);
  };
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
                chartData={chartData}
                categories={categories}
                handleFilterSelection={handleFilterSelection}
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
