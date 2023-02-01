import { React, useState, useEffect, useContext, useCallback } from "react";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";
import AlgoquantApiContext from "../../api/ApiContext";
import Table from "../reusable/Table";
import formatter from "../utils/CurrencyFormatter";
import { TableSpinner } from "../reusable/LoadSpinner";

const FETCH_AMOUNT = 10;
const TransactionHistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [lastPage, setLastPage] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);
  const [lastKey, setLastKey] = useState(null);
  const [pagesSeen, setPagesSeen] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTrades = useCallback(() => {
    const historyBuffer = [];
    if (!lastPage && pagesSeen < page) {
      if (algoquantApi.token) {
        algoquantApi
          .getTrades(FETCH_AMOUNT, lastKey)
          .then((resp) => {
            setLastKey(null);
            setPagesSeen(pagesSeen + 1);
            if (resp.data.LastEvaluatedKey === undefined) {
              setLastPage(true);
            }
            if (resp.data.LastEvaluatedKey !== undefined) {
              setLastKey({
                timestamp: resp.data.LastEvaluatedKey.timestamp,
                user_id: resp.data.LastEvaluatedKey.user_id,
              });
            }
            for (let i = 0; i < resp.data.Count; i++) {
              let timestamp = new Date(parseInt(resp.data.Items[i].timestamp));
              let shares = parseFloat(resp.data.Items[i].qty).toFixed(3);
              historyBuffer.push({
                jobName: resp.data.Items[i].job_name,
                buyOrSell: resp.data.Items[i].side === "B" ? "Buy" : "Sell",
                stockTicker: resp.data.Items[i].symbol,
                shares: shares,
                avgPrice: formatter.format(resp.data.Items[i].avg_price),
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

  const handleNextClick = () => {
    if (pagesSeen <= page) {
      setIsLoading(true);
    }
    setPage(page + 1);
  };

  const handlePreviousClick = () => {
    setPage(page - 1);
  };

  const header = [
    { key: "jobName", title: "Job Name" },
    { key: "buyOrSell", title: "Buy or Sell" },
    { key: "stockTicker", title: "Stock Ticker" },
    { key: "shares", title: "Shares" },
    { key: "avgPrice", title: "Average Price" },
    { key: "date", title: "Date" },
  ];

  return (
    <div className="bg-dark-gray overflow-auto">
      <Navbar />
      <div className="container mx-auto flex bg-dark-gray">
        <Sidebar />
        <div className="sm:w-3/4 md:w-5/6 lg:w-7/8 bg-dark-gray pl-5">
          <div className="flex pt-24">
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
                  <span />
                ) : (
                  <button
                    className="text-white rounded-md bg-another-gray py-2 px-6"
                    onClick={handlePreviousClick}
                  >
                    Previous
                  </button>
                )}

                {transactions.length < 10 ? (
                  <span />
                ) : (
                  <button
                    className="text-white rounded-md bg-another-gray py-2 px-6 float-right"
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
