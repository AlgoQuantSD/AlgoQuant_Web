import { React, useState, useEffect, useContext } from "react";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";
import AlgoquantApiContext from "../../api/ApiContext";
import Table from "../reusable/Table";
import formatter from "../utils/CurrencyFormatter";
import { TableSpinner } from "../reusable/LoadSpinner";

const TransactionHistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [lastPage, setLastPage] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);
  const [pagUser, setPaguser] = useState(null);
  const [next, setNext] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // if page == 1 then dont set last page. if so if the last key is undefined then set it
  useEffect(() => {
    const historyBuffer = [];
    if (!lastPage && next < page) {
      if (algoquantApi.token) {
        algoquantApi
          .getTrades(10, pagUser)
          .then((resp) => {
            setPaguser(null);
            setNext(next + 1);
            if (resp.data.LastEvaluatedKey === undefined && page !== 1) {
              setLastPage(true);
            }
            if (resp.data.LastEvaluatedKey !== undefined) {
              setPaguser({
                timestamp: resp.data.LastEvaluatedKey.timestamp,
                user_id: resp.data.LastEvaluatedKey.user_id,
              });
            }
            for (let i = 0; i < resp.data.Count; i++) {
              let timestamp = new Date(parseInt(resp.data.Items[i].timestamp));
              historyBuffer.push({
                jobName: resp.data.Items[i].job_name,
                buyOrSell: resp.data.Items[i].side === "B" ? "Buy" : "Sell",
                stockTicker: resp.data.Items[i].symbol,
                shares: resp.data.Items[i].qty,
                amount: formatter.format(resp.data.Items[i].avg_price),
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
  }, [algoquantApi, page, history, lastPage, next, pagUser]);
  useEffect(() => {
    const newTransactions = [];
    let itemCounter = 0;

    //  this is whats gonna handle what shows on screen
    if (history.length !== 0) {
      for (let i = (page - 1) * 10; i < history.length; i++) {
        if (itemCounter === 10) break;
        newTransactions.push(history[i]);
        itemCounter++;
      }
    }
    setTransactions(newTransactions);
  }, [history, algoquantApi, page]);

  const handleNextClick = () => {
    if (!lastPage && next <= page) {
      setIsLoading(true);
    }
    setPage(page + 1);
  };

  const handlePreviousClick = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const header = [
    { key: "jobName", title: "Job Name" },
    { key: "buyOrSell", title: "Buy or Sell" },
    { key: "stockTicker", title: "Stock Ticker" },
    { key: "shares", title: "Shares" },
    { key: "amount", title: "Amount" },
    { key: "date", title: "Date" },
  ];

  return (
    <div className="bg-dark-gray overflow-y-scroll overflow-x-scroll">
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
              {" "}
              <Table data={transactions} header={header}></Table>
              <div className="p-6 pt-24 pb-20 overflow-auto	">
                <p className="text-2xl font-light text-center text-white ">
                  {"Page " + page}
                </p>
                {page === 1 ? (
                  <button
                    className="text-white rounded-md bg-another-gray py-2 px-6"
                    disabled
                  >
                    Previous
                  </button>
                ) : (
                  <button
                    className="text-white rounded-md bg-another-gray py-2 px-6"
                    onClick={handlePreviousClick}
                  >
                    Previous
                  </button>
                )}

                {transactions.length === 0 || transactions.length !== 10 ? (
                  <button
                    className="text-white rounded-md bg-another-gray py-2 px-6 float-right"
                    disabled
                  >
                    Next
                  </button>
                ) : (
                  <button
                    className="text-white rounded-md bg-another-gray py-2 px-6 float-right"
                    onClick={handleNextClick}
                  >
                    Next
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistoryPage;
