import React, { useState, useContext, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../reusable/NavBar";
import Graph from "../reusable/Graph";
import Table from "../reusable/Table";
import GraphStats from "../reusable/GraphStats";
import Sidebar from "../reusable/SideBar";
import StopJobModal from "../singular/Modals/StopJobModal";
import AlgoquantApiContext from "../../api/ApiContext";
import formatter from "../utils/CurrencyFormatter";
import { filters } from "../utils/filtersEnum";
import { GraphSpinner } from "../reusable/LoadSpinner";
import { TableSpinner } from "../reusable/LoadSpinner";
import { tabFilters } from "../utils/hometabFilterEnum";
import { FaLock } from "react-icons/fa";

// The amount of data (trade history for a user) that is being fetched for each api call
const FETCH_AMOUNT = 5;

const JobViewPage = () => {
  // used to get the passed job_id from the navigation routing
  const location = useLocation();
  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);

  // history - store the data and previous data fetched from api endpoint. keeps a local copy of data instead of continously calling the api
  // lastPage - boolean value that will be set to true when the last query of data has been called, the highest amount of trades a user has in their history
  // transactions - used to show data in a paginated manner on the screen for EACH page, gets data from history array
  // page - tracks the current page is currently on, starts at page one
  // lastKey - stores a "key" that is a response from the api that allows paginated calls, used to stop fetching for data when "key" is not returned from the api endpoint
  // pagesSeen - tracks the highest page number the user has seen to prevent fetching of newer data until the user goes to a new page for the first time.
  // isLoading - used to show a loading spinner if their is new data being fetched for a page
  const [history, setHistory] = useState([]);
  const [lastPage, setLastPage] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [lastKey, setLastKey] = useState(null);
  const [pagesSeen, setPagesSeen] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // State variables to store the graph data of user's performance
  const [xValues, setXValues] = useState([]);
  const [yValues, setYValues] = useState([]);

  // All state variables for stock related data / statistics
  const [percentChanged, setPercentChanged] = useState(null);
  const [priceChange, setPriceChange] = useState(null);
  const [dateClosed, setDateClosed] = useState(null);
  const [marketClosed, setMarketClosed] = useState(false);
  const [recentPrice, setRecentPrice] = useState(0);
  const [graphLoading, setGraphLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState(null);

  // state variable to hold the job (active or past) object or used for get-job related endpoint
  const [job, setJob] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [stopJobModal, setStopJobModal] = useState(null);

  // Aggregated JSON object containing all the related performance stats of the user
  // All combined to a single object - so only need to pass a single prop to children components instead of multiple
  const aggregatedPerformanceData = [
    {
      recentPrice: recentPrice,
      priceChange: priceChange,
      percentChanged: percentChanged,
      marketClosed: marketClosed,
      dateClosed: dateClosed,
    },
  ];

  console.log("job " + location.state.value);
  console.log("type:" + location.state.type);
  console.log("job object: ", job);

  // functions to handle a page change
  const handleNextClick = () => {
    if (pagesSeen <= page && !lastPage) {
      setIsLoading(true);
    }
    setPage(page + 1);
  };

  const handlePreviousClick = () => {
    setPage(page - 1);
  };

  // Function to get the job clicked by the user using the jobID passed from the getJobList endpoint
  const getJob = useCallback(() => {
    if (algoquantApi.token) {
      algoquantApi
        .getJob(location.state.value)
        .then((resp) => {
          setJob(resp.data);
          setStartDate(
            new Date(parseInt(resp.data?.start_time)).toLocaleString("en-US", {
              month: "numeric",
              day: "numeric",
              year: "numeric",
            })
          );

          setEndDate(
            new Date(parseInt(resp.data?.end_time)).toLocaleString("en-US", {
              month: "numeric",
              day: "numeric",
              year: "numeric",
            })
          );
        })
        .catch((err) => {
          // TODO: Need to implement better error handling
          console.log(err);
        });
    }
  }, [algoquantApi, location]);

  // function that that queries users trades and stores them into history in a paginated manner
  const fetchTrades = useCallback(() => {
    const historyBuffer = [];
    if (!lastPage && pagesSeen < page) {
      if (algoquantApi.token) {
        algoquantApi
          .getTrades(FETCH_AMOUNT, location.state.value, lastKey)
          .then((resp) => {
            setPagesSeen(pagesSeen + 1);
            if (resp.data.LEK_timestamp === undefined) {
              setLastPage(true);
            } else {
              setLastKey(resp.data.LEK_timestamp);
            }
            for (let i = 0; i < resp.data.trades_count; i++) {
              let timestamp = new Date(parseInt(resp.data.trades[i].timestamp));
              let shares = parseFloat(resp.data.trades[i].qty).toFixed(3);
              historyBuffer.push({
                jobName: resp.data.trades[i].job_name,
                buyOrSell: resp.data.trades[i].side === "B" ? "Buy" : "Sell",
                stockTicker: resp.data.trades[i].symbol,
                shares: shares,
                avgPrice: formatter.format(resp.data.trades[i].avg_price),
                date: timestamp.toLocaleString(),
              });
            }

            setHistory(history.concat(historyBuffer));
            setIsLoading(false);
          })
          .catch((err) => {
            // TODO: Need to implement better error handling
            console.log(err);
          });
      }
    }
  }, [algoquantApi, page, history, lastPage, pagesSeen, lastKey, location]);

  // CallBack function used to obtain user's performance information
  const getGraphData = useCallback(
    (timeframe) => {
      setGraphLoading(true);
      if (algoquantApi.token) {
        algoquantApi
          .getPerformance(timeframe)
          .then((resp) => {
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

  // controls when fetchTrades functin will be called
  // uses transaction to show at most a FETCH_AMOUNT of history data on a page, uses a paginated approach to target the values from history. transaction variable changes with each page change to show new and the correct data on each page
  useEffect(() => {
    console.log("useeffect otherone 1");
    const newTransactions = [];
    let itemCounter = 0;

    fetchTrades();

    //  this is whats gonna handle what shows on screen
    for (let i = (page - 1) * FETCH_AMOUNT; i < history.length; i++) {
      if (itemCounter === FETCH_AMOUNT) break;
      newTransactions.push(history[i]);
      itemCounter++;
    }

    setTransactions(newTransactions);
  }, [history, fetchTrades, page]);

  // initial data is shown on screen
  useEffect(() => {
    console.log("useEffect");
    setSelectedFilter(filters.DAY);
    getData(selectedFilter);
    // eslint-disable-next-line
  }, [selectedFilter, getData]);

  // get the job once
  useEffect(() => {
    getJob();
  }, [getJob]);

  // header used for the columns on the table
  const header = [
    { key: "jobName", title: "Job Name" },
    { key: "buyOrSell", title: "Buy or Sell" },
    { key: "stockTicker", title: "Stock Ticker" },
    { key: "shares", title: "Shares" },
    { key: "avgPrice", title: "Amount" },
    { key: "date", title: "Date" },
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
            jobObj={job}
          />
          <div class="flex justify-between items-center mb-8">
            <p className="text-green font-bold text-5xl">{job?.name} Job</p>
            {location.state.type === tabFilters.JOB ? (
              <button
                className="rounded bg-red text-white px-4 py-2 mt-3"
                onClick={() => {
                  setStopJobModal(true);
                }}
              >
                Stop Job
              </button>
            ) : (
              <div className="flex items-center justify-between text-right">
                <p className="text-green font-semibold text-lg pr-4">
                  Completed Job
                  <br></br>
                  {startDate} - {endDate}
                </p>

                <FaLock className="text-xl text-green" />
              </div>
            )}
          </div>
          <GraphStats
            stockData={aggregatedPerformanceData}
            selectedFilter={selectedFilter}
          />
          <div className="z-10 w-11/12 mx-auto my-10 mb-32">
            {graphLoading ? (
              <GraphSpinner />
            ) : (
              <Graph
                stockData={aggregatedPerformanceData}
                xValues={xValues}
                yValues={yValues}
                getData={getData}
                selectedFilter={selectedFilter}
              />
            )}
          </div>
          <div class="flex justify-between items-center mb-4">
            <p className="text-green font-bold text-5xl">Recent Trades</p>
          </div>
          {isLoading ? (
            <TableSpinner />
          ) : (
            <Table data={transactions} header={header} />
          )}
          <div className="p-6 pt-24 pb-20 overflow-auto	">
            {page === 1 ? (
              <button
                className="text-green rounded-md w-28 h-10 bg-cokewhite py-2 px-6"
                disabled
              ></button>
            ) : (
              <button
                className="text-cokewhite rounded-md w-28 h-10 bg-green py-2 px-6"
                onClick={handlePreviousClick}
              >
                Previous
              </button>
            )}

            {transactions.length < 5 ? (
              <button
                className="text-green rounded-md w-28 h-10 bg-cokewhite py-2 px-6"
                disabled
              ></button>
            ) : (
              <button
                className="text-cokewhite w-28 h-10 rounded-md bg-green py-2 px-6 float-right"
                onClick={handleNextClick}
              >
                Next
              </button>
            )}
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
