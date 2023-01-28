import { React, useState, useEffect, useContext } from "react";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";
import { useAuthenticator } from "@aws-amplify/ui-react";
import AlgoquantApiContext from "../../api/ApiContext";

const TransactionHistoryPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const { user } = useAuthenticator((context) => [context.user]);
  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);
  const [pagUser, setPaguser] = useState(null);

  useEffect(() => {
    const newTransactions = [];
    if (algoquantApi.token) {
      algoquantApi
        .getTrades(10, pagUser)
        .then((resp) => {
          setPaguser(null);
          if (resp.data.LastEvaluatedKey !== undefined) {
            setPaguser({
              timestamp: resp.data.LastEvaluatedKey.timestamp,
              user_id: resp.data.LastEvaluatedKey.user_id,
            });
          }
          console.log(resp.data);
          console.log(resp.data.Count);
          for (let i = 0; i < resp.data.Count; i++) {
            let timestamp = new Date(parseInt(resp.data.Items[i].timestamp));
            newTransactions.push({
              // jobName: `Job ${i + 1}`,
              // buyOrSell: i & (2 === 0) ? "Buy" : "Sell",
              // stockTicker: "Puss",
              // shares: i + 1,
              // amount: i * 100,
              // date: "01/01/2022 8:55PM",
              jobName: resp.data.Items[i].job_name,
              buyOrSell: resp.data.Items[i].side === "B" ? "Buy" : "Sell",
              stockTicker: resp.data.Items[i].symbol,
              shares: resp.data.Items[i].qty,
              amount: resp.data.Items[i].avg_price,
              date: timestamp.toLocaleString(),
            });
          }
          setTransactions(newTransactions);
        })
        .catch((err) => {
          // TODO: Need to implement better error handling
          console.log(err);
        });
    }
  }, [algoquantApi, page]);

  const handleNextClick = () => {
    setPage(page + 1);
  };

  const handlePreviousClick = () => {
    if (page > 1) setPage(page - 1);
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
            <button
              className="text-white rounded-md bg-another-gray py-2 px-6"
              onClick={handlePreviousClick}
            >
              Previous
            </button>
            <button
              className="text-white rounded-md bg-another-gray py-2 px-6 float-right"
              onClick={handleNextClick}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistoryPage;
