import { React, useState, useEffect, useContext, useCallback } from "react";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";
import AlgoquantApiContext from "../../api/ApiContext";
import Table from "../reusable/Table";
import formatter from "../utils/CurrencyFormatter";
import { TableSpinner } from "../reusable/LoadSpinner";

// The amount of data (trade history for a user) that is being fetched for each api call
const FETCH_AMOUNT = 10;

const TransactionHistoryPage = () => {
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

  // function that that queries users trades and stores them into history in a paginated manner
  const fetchTrades = useCallback(() => {
    const historyBuffer = [];
    if (!lastPage && pagesSeen < page) {
      if (algoquantApi.token) {
        algoquantApi
          .getTrades(FETCH_AMOUNT, null, lastKey)
          .then((resp) => {
            console.log(resp.data);
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
  }, [algoquantApi, page, history, lastPage, pagesSeen, lastKey]);

  // controls when fetchTrades functin will be called
  // uses transaction to show at most a FETCH_AMOUNT of history data on a page, uses a paginated approach to target the values from history. transaction variable changes with each page change to show new and the correct data on each page
  useEffect(() => {
    const newTransactions = [];
    let itemCounter = 0;

    fetchTrades(FETCH_AMOUNT);

    //  this is whats gonna handle what shows on screen
    for (let i = (page - 1) * FETCH_AMOUNT; i < history.length; i++) {
      if (itemCounter === FETCH_AMOUNT) break;
      newTransactions.push(history[i]);
      itemCounter++;
    }

    setTransactions(newTransactions);
  }, [history, fetchTrades, page]);

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

  // header used for the columns on the table
  const header = [
    { key: "jobName", title: "Job Name" },
    { key: "buyOrSell", title: "Buy or Sell" },
    { key: "stockTicker", title: "Stock Ticker" },
    { key: "shares", title: "Shares" },
    { key: "avgPrice", title: "Average Price" },
    { key: "date", title: "Date" },
  ];

  return (
    <div className="bg-cokewhite overflow-x-auto overflow-y-auto">
      <Navbar />
      <div className="flex self-stretch">
        <Sidebar />
        <div className="sm:w-3/4 md:w-5/6 lg:w-7/8 p-5">
          <div className="flex pt-10">
            <h1 className="text-green font-bold sm:text-3xl md:text-5xl mb-10">
              Transaction History
            </h1>
          </div>
          {isLoading ? (
            <TableSpinner />
          ) : (
            <>
              <Table data={transactions} header={header}></Table>
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

                {transactions.length < 10 ? (
                  <button
                    className="text-cokewhite rounded-md w-28 h-10 bg-dark-gray py-2 px-6"
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

export default TransactionHistoryPage;
