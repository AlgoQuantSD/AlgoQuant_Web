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
import { tabFilters } from "../utils/hometabFilterEnum";
import { ToastContext } from "../reusable/ToastContext";
import ToastNotification from "../reusable/ToastNotifcation";
import Banner from "../reusable/Banner";

const HomePage = () => {
  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);
  const { isToastOpen, toastMessage, toastType, hideToast } =
    useContext(ToastContext);

  // State variable used to keep track of what tab the user is on
  const [selectedTabFilter, setSelectedTabFilter] = useState(
    tabFilters.INVESTOR
  );

  // State variables to store the graph data of user's performance
  const [xValues, setXValues] = useState([]);
  const [yValues, setYValues] = useState([]);

  // All state variables for stock related data / statistics
  const [percentChanged, setPercentChanged] = useState(null);
  const [priceChange, setPriceChange] = useState(null);
  const [marketClosed, setMarketClosed] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [recentPrice, setRecentPrice] = useState(0);
  const [graphLoading, setGraphLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Aggregated JSON object containing all the related performance stats of the user
  // All combined to a single object - so only need to pass a single prop to children components instead of multiple
  const aggregatedPerformanceData = [
    {
      recentPrice: recentPrice,
      priceChange: priceChange,
      percentChanged: percentChanged,
      marketClosed: marketClosed,
    },
  ];

  // Handles keeping track which tab a user is on
  const handleTabFilterSelection = (filter) => {
    setSelectedTabFilter(filter);
  };

  // CallBack function used to obtain user's performance information
  const getGraphData = useCallback(
    (timeframe) => {
      setGraphLoading(true);
      if (algoquantApi.token) {
        algoquantApi
          .getPerformance(timeframe)
          .then((resp) => {
            setYValues(resp.data["close"]);
            setPercentChanged(resp.data["percent_change"].toFixed(2));
            setPriceChange(
              parseFloat(resp.data["interval_price_change"]).toFixed(2)
            );
            setRecentPrice(resp.data["recent_price"].toFixed(2));
            setMarketClosed(resp.data["market_closed"]);

            setXValues(resp.data["timestamp"]);

            setGraphLoading(false);
          })
          .catch((err) => {
            setXValues([]);
            setYValues([]);
            setGraphLoading(false);
            setErrorMsg(err.toString());
          });
      }
    },
    [algoquantApi]
  );

  /*
 Function to determine what timeframe of graph data to fetch based on the filter enum (timeframe selected by user)
  calls the getGraphData to retreive data and updates the filter the user has selcted with: setSelectedFilter
  */
  const getData = useCallback(
    (filter) => {
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
    },
    [getGraphData, setSelectedFilter]
  );

  // Useeffect that is called to render the days performance
  useEffect(() => {
    setSelectedFilter(filters.DAY);
    getData(selectedFilter);
    // eslint-disable-next-line
  }, [selectedFilter, algoquantApi]);

  return (
    <div className="bg-cokewhite overflow-x-auto overflow-y-auto">
      {errorMsg === "" ? (
        <></>
      ) : (
        <Banner message={errorMsg} setMessage={setErrorMsg} type="error" />
      )}
      <Navbar />
      <div className="flex self-stretch">
        <Sidebar />
        <div className="sm:w-3/4 md:w-5/6 lg:w-7/8 p-5">
          <ToastNotification
            isOpen={isToastOpen}
            message={toastMessage}
            type={toastType}
            handleClose={hideToast}
          />
          <div className="pt-10">
            <h2 className="text-green font-bold text-5xl">Your Assets</h2>
          </div>
          <GraphStats
            stockData={aggregatedPerformanceData}
            selectedFilter={selectedFilter}
          />
          {graphLoading ? (
            <GraphSpinner />
          ) : (
            <div className="w-12/12 mx-auto my-10 mb-28">
              <Graph
                stockData={aggregatedPerformanceData}
                lines={[{ x: xValues, y: yValues }]}
                getData={getData}
                selectedFilter={selectedFilter}
              />
            </div>
          )}
          <div className="w-full">
            <h3 className="text-green font-bold text-5xl">Invest</h3>
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
                selectedTabFilter === tabFilters.HISTORY
                  ? "text-cokewhite border-b-green bg-green active hover:bg-green"
                  : ""
              }`}
              onClick={() => handleTabFilterSelection(tabFilters.HISTORY)}
            >
              History
            </button>
          </div>
          <div className=" mt-10">
            {(() => {
              switch (selectedTabFilter) {
                case tabFilters.INVESTOR:
                  return (
                    <div>
                      <Link
                        to="/createinvestor"
                        className="relative text-green border-2 border-green font-medium rounded-lg bg-cokewhite hover:bg-smokewhite px-4 py-3"
                      >
                        Create Investor
                      </Link>
                      <div>
                        <InvestorGallery type={selectedTabFilter} />
                      </div>
                    </div>
                  );
                case tabFilters.JOB:
                  return (
                    <div>
                      <JobGallery type={selectedTabFilter} />
                    </div>
                  );
                case tabFilters.HISTORY:
                  return (
                    <div>
                      <Link
                        to="/history"
                        className="relative text-white font-medium rounded-lg bg-green px-4 py-3"
                      >
                        View all transactions
                      </Link>
                      <JobGallery type={selectedTabFilter} investorID={null} />
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
