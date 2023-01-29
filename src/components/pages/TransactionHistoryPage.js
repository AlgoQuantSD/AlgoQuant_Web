import { React, useState, useEffect, useContext } from "react";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";
import { useAuthenticator } from "@aws-amplify/ui-react";
import AlgoquantApiContext from "../../api/ApiContext";

const TransactionHistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [lastPage, setLastPage] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);
  const [pagUser, setPaguser] = useState(null);
  const [next, setNext] = useState(0);

  // if page == 1 then dont set last page. if so if the last key is undefined then set it
  useEffect(() => {
    const historyBuffer = [];
    if (!lastPage && next < page) {
      if (algoquantApi.token) {
        algoquantApi
          .getTrades(10, pagUser)
          .then((resp) => {
            console.log("fuck yea");
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
                amount: resp.data.Items[i].avg_price,
                date: timestamp.toLocaleString(),
              });
            }

            setHistory(history.concat(historyBuffer));
          })
          .catch((err) => {
            // TODO: Need to implement better error handling
            console.log(err);
          });
      }
    }
  }, [algoquantApi, page]);
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
    setPage(page + 1);
    // setNext(true);
  };

  const handlePreviousClick = () => {
    if (page > 1) {
      setPage(page - 1);
      // setNext(false);
    }
  };

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
          <table className="table-auto w-full font-light text-white">
            <thead>
              <tr className="bg-medium-gray text-white ">
                <th className="lg:px-5 lg:py-5 md:px-2 md:py-2 lg:font-semibold md:font-medium sm:font-light lg:text-xl md:text-md sm:text-sm">
                  Job Name
                </th>
                <th className="lg:px-5 lg:py-5 md:px-2 md:py-2 lg:font-semibold md:font-medium sm:font-light lg:text-xl md:text-md sm:text-sm">
                  Buy or Sell
                </th>
                <th className="lg:px-5 lg:py-5 md:px-2 md:py-2 lg:font-semibold md:font-medium sm:font-light lg:text-xl md:text-md sm:text-sm">
                  Stock Ticker
                </th>
                <th className="lg:px-5 lg:py-5 md:px-2 md:py-2 lg:font-semibold md:font-medium sm:font-light lg:text-xl md:text-md sm:text-sm">
                  Shares
                </th>
                <th className="lg:px-5 lg:py-5 md:px-2 md:py-2 lg:font-semibold md:font-medium sm:font-light lg:text-xl md:text-md sm:text-sm">
                  Amount
                </th>
                <th className="lg:px-5 lg:py-5 md:px-2 md:py-2 lg:font-semibold md:font-medium sm:font-light lg:text-xl md:text-md sm:text-sm">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="border border-another-gray border-opacity-30 text-center lg:font-normal sm:font-thin">
              {transactions.map((transaction, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0
                      ? "bg-dark-gray align-left"
                      : "bg-another-gray align-left"
                  }
                >
                  <td className="lg:px-3 lg:py-5 md:px-2 md:py-2">
                    {transaction.jobName}
                  </td>
                  <td className="lg:px-3 lg:py-5 md:px-2 md:py-2">
                    {transaction.buyOrSell}
                  </td>
                  <td className="lg:px-3 lg:py-5 md:px-2 md:py-2">
                    {transaction.stockTicker}
                  </td>
                  <td className="lg:px-3 lg:py-5 md:px-2 md:py-2">
                    {transaction.shares}
                  </td>
                  <td className="lg:px-3 lg:py-5 md:px-2 md:py-2">
                    {transaction.amount}
                  </td>
                  <td className="lg:px-3 lg:py-5 md:px-2 md:py-2">
                    {transaction.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
        </div>
      </div>
    </div>
  );
};

export default TransactionHistoryPage;
