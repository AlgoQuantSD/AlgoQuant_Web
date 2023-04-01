import { React, useState, useContext, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";
import Table from "../reusable/Table";
import AlgoquantApiContext from "../../api/ApiContext";
import { TableSpinner } from "../reusable/LoadSpinner";
import Banner from "../reusable/Banner";

// The amount of data (backtestfor a user) that is being fetched for each api call
const FETCH_AMOUNT = 10;
const BacktestingPage = () => {
  const navigate = useNavigate();
  const viewBacktest = (value) => {
    navigate("/backtestresults", { state: { value: value } });
  };

  // header used for the columns on the table
  const header = [
    { title: "Status", key: "status" },
    { title: "Backtest Name", key: "backtestName" },
    { title: "Initial Investment", key: "initialInvestment" },
    { title: "Final Balance", key: "finalBalance" },
    { title: "Start Date", key: "startDate" },
    { title: "End Date", key: "endDate" },
    { title: "Investor", key: "investor" },
  ];

  /* 
  history - store the data and previous data fetched from api endpoint. keeps a local copy of data instead of continously calling the api 
  lastPage - boolean value that will be set to true when the last query of data has been called, the highest amount of trades a user has in their history 
  transactions - used to show data in a paginated manner on the screen for EACH page, gets data from history array 
  page - tracks the current page is currently on, starts at page one 
  lastKey - stores a "key" that is a response from the api that allows paginated calls, used to stop fetching for data when "key" is not returned from the api endpoint 
  pagesSeen - tracks the highest page number the user has seen to prevent fetching of newer data until the user goes to a new page for the first time.
  isLoading - used to show a loading spinner if their is new data being fetched for a page 
  */
  const [history, setHistory] = useState([]);
  const [lastPage, setLastPage] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [lastKey, setLastKey] = useState(null);
  const [pagesSeen, setPagesSeen] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);
  const [errorMsg, setErrorMsg] = useState("");

  // function that that queries users trades and stores them into history in a paginated manner
  const fetchBacktestList = useCallback(() => {
    const historyBuffer = [];
    if (!lastPage && pagesSeen < page) {
      if (algoquantApi.token) {
        algoquantApi
          .getBacktestList(FETCH_AMOUNT, lastKey)
          .then((resp) => {
            console.log(resp.data);
            setPagesSeen(pagesSeen + 1);
            if (resp.data.LEK_backtest_id === undefined) {
              setLastPage(true);
            } else {
              setLastKey(resp.data.LEK_backtest_id);
            }
            for (let i = 0; i < resp.data.backtests_count; i++) {
              // FIX THE TIME STAMPS TO BOTH BE IN MILLISECONDS IN BACKEND ******
              let startTimeDate = new Date(
                parseInt(resp.data.backtests[i].start_time) * 1000
              );
              let endTimeDate = new Date(
                parseInt(resp.data.backtests[i].end_time) * 1000
              );
              const options = {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              };
              const formattedStartTime = startTimeDate.toLocaleString(
                [],
                options
              );
              const formattedEndTime = endTimeDate.toLocaleString([], options);

              let initInvestment = parseFloat(
                resp.data.backtests[i].initial_investment
              ).toFixed(3);
              let finalBalance = parseFloat(
                resp.data.backtests[i].final_portfolio_value
              ).toFixed(3);

              historyBuffer.push({
                status: resp.data.backtests[i].status,
                backtestName: resp.data.backtests[i].backtest_name,
                initialInvestment: initInvestment,
                finalBalance: finalBalance,
                startDate: formattedStartTime,
                endDate: formattedEndTime,
                investor: resp.data.backtests[i].investor_name,
                id: resp.data.backtests[i].backtest_id,
              });
            }

            setHistory(history.concat(historyBuffer));
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
            setErrorMsg(
              "Failed to load all completed Backtest. Please try again later."
            );
          });
      }
    }
  }, [algoquantApi, page, history, lastPage, pagesSeen, lastKey]);

  // controls when fetchBacktestList function will be called
  // uses transaction to show at most a FETCH_AMOUNT of history data on a page, uses a paginated approach to target the values from history. transaction variable changes with each page change to show new and the correct data on each page
  useEffect(() => {
    const newTransactions = [];
    let itemCounter = 0;

    fetchBacktestList();

    //  this is whats gonna handle what shows on screen
    for (let i = (page - 1) * FETCH_AMOUNT; i < history.length; i++) {
      if (itemCounter === FETCH_AMOUNT) break;
      newTransactions.push(history[i]);
      itemCounter++;
    }

    setTransactions(newTransactions);
  }, [history, fetchBacktestList, page]);

  // functions to handle a page change
  const handleNextClick = () => {
    if (pagesSeen <= page) {
      setIsLoading(true);
    }
    setPage(page + 1);
  };

  const handlePreviousClick = () => {
    setPage(page - 1);
  };
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
          <div className="flex pt-10">
            <h1 className="text-green font-bold text-5xl">Backtesting</h1>
          </div>
          <p className="text-faded-green text-2xl font-light w-1/2 mt-5">
            AlgoQuant allows you to backtest your investors against historical
            data so you can see how your investors would have performed in the
            past.
          </p>
          <div className="flex pt-10">
            <h1 className="text-green font-bold sm:text-3xl md:text-4xl mb-10">
              Completed Backtests
            </h1>
          </div>
          {isLoading ? (
            <TableSpinner />
          ) : (
            <>
              <Table
                data={transactions}
                header={header}
                onItemPress={viewBacktest}
              ></Table>
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

                {transactions.length < FETCH_AMOUNT ? (
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BacktestingPage;
