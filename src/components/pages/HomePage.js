import { React, useState, useContext, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";
import InvestorGallery from "../singular/InvestorGallery";
import "react-multi-carousel/lib/styles.css";
import Graph from "../reusable/Graph";
import GraphStats from "../reusable/GraphStats";
import JobGallery from "../singular/JobGallery";
import AlgoquantApiContext from "../../api/ApiContext";
import { GraphSpinner } from "../reusable/LoadSpinner";
import { filters } from "../utils/filtersEnum";

const HomePage = () => {
  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);
  const [xValues, setXValues] = useState([]);
  const [yValues, setYValues] = useState([]);
  // All state variables for stock related data / statistics
  const [percentChanged, setPercentChanged] = useState(null);
  const [priceChange, setPriceChange] = useState(null);
  const [dateClosed, setDateClosed] = useState(null);
  const [marketClosed, setMarketClosed] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const [selectedTabFilter, setSelectedTabFilter] = useState("investor");
  const [recentPrice, setRecentPrice] = useState(0);
  const [graphLoading, setGraphLoading] = useState(true);

  const [investorList, setInvestorList] = useState([]);

  const tabFilters = {
    INVESTOR: "investor",
    JOB: "job",
    history: "history",
  };

  const handleTabFilterSelection = (filter) => {
    setSelectedTabFilter(filter);
    // logic to update chart data based on selected filter
  };

  // const handleFilterSelection = (filter) => {
  //   getData(filter);
  //   setSelectedFilter(filter);
  // };

  /*Callback used to get more data based on the filter. Each time any of the buttons 
    are clicked this will be called to get more data. This will update the chart data which 
    will then re-render the graph
    */

  const getGraphData = useCallback(
    (timeframe) => {
      if (algoquantApi.token) {
        algoquantApi
          .getPerformance(timeframe)
          .then((resp) => {
            console.log(resp.data);
            setXValues(resp.data["close"]);
            setPercentChanged(resp.data["percent_change"].toFixed(2));
            setPriceChange(
              parseFloat(resp.data["interval_price_change"]).toFixed(2)
            );
            setRecentPrice(resp.data["recent_price"].toFixed(2));
            setMarketClosed(resp.data["is_market_closed"]);

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

                // If the timeframe selected was day, store the first timeframe (yVal) to keep track of the day the market was open,
                // DateClosed variable will then used to show the date the market is closed, if it is.
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
    [algoquantApi]
  );

  const getInvestorList = useCallback(() => {
    if (algoquantApi.token) {
      algoquantApi
        .getInvestorList()
        .then((resp) => {
          setInvestorList(resp.data["investors"]);
        })
        .catch((err) => {
          // TODO: Need to implement better error handling
          console.log(err);
        });
    }
  });

  const aggregatedStockData = [
    {
      recentPrice: recentPrice,
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
  const getData = useCallback((filter) => {
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
  });

  useEffect(() => {
    setSelectedFilter(filters.DAY);
    getData(selectedFilter);
    getInvestorList();
  }, [algoquantApi, selectedFilter]);

  return (
    <div className="bg-cokewhite overflow-x-auto overflow-y-auto">
      <Navbar />
      <div className="flex self-stretch">
        <Sidebar />
        <div className="sm:w-3/4 md:w-5/6 lg:w-7/8 p-5">
          <div className="pt-10">
            <h2 className="text-green font-bold text-4xl">Your Assets</h2>
          </div>
          <GraphStats
            stockData={aggregatedStockData}
            selectedFilter={selectedFilter}
          />
          <div className="w-11/12 mx-auto my-10 mb-32">
            <Graph
              stockData={aggregatedStockData}
              xValues={xValues}
              yValues={yValues}
              getData={getData}
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
                      <InvestorGallery investorList={investorList} />
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
