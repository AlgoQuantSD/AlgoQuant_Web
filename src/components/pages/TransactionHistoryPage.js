import { React, useState, useEffect } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";

const TransactionHistoryPage = () => {
  // const { user } = useAuthenticator((context) => [context.user]);
  // const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch transaction data from API and set it to the transactions state
    // Example:
    // axios.get('api/transactions')
    //   .then(res => setTransactions(res.data))
    //   .catch(err => console.log(err))
  }, []);

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
              <tr className="bg-medium-gray text-white">
                <th className="lg:px-5 lg:py-5 md:px-2 md:py-2 font-semibold lg:text-xl md:text-md">
                  Job Name
                </th>
                <th className="lg:px-5 lg:py-5 md:px-2 md:py-2 font-semibold lg:text-xl md:text-md">
                  Buy or Sell
                </th>
                <th className="lg:px-5 lg:py-5 md:px-2 md:py-2 font-semibold lg:text-xl md:text-md">
                  Stock Ticker
                </th>
                <th className="lg:px-5 lg:py-5 md:px-2 md:py-2 font-semibold lg:text-xl md:text-md">
                  Shares
                </th>
                <th className="lg:px-5 lg:py-5 md:px-2 md:py-2 font-semibold lg:text-xl md:text-md">
                  Amount
                </th>
                <th className="lg:px-5 lg:py-5 md:px-2 md:py-2 font-semibold lg:text-xl md:text-md">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="border border-another-gray border-opacity-30">
              {/* {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{transaction.jobName}</td>
                  <td className="border px-4 py-2">{transaction.buyOrSell}</td>
                  <td className="border px-4 py-2">
                    {transaction.stockTicker}
                  </td>
                  <td className="border px-4 py-2">{transaction.shares}</td>
                  <td className="border px-4 py-2">{transaction.amount}</td>
                  <td className="border px-4 py-2">{transaction.date}</td>
                </tr>
              ))} */}
              <tr className="bg-dark-gray text-center align-left">
                <td className="lg:px-3 lg:py-3 md:px-2 md:py-2">Job 1</td>
                <td className="lg:px-3 lg:py-3 md:px-2 md:py-2">Buy</td>
                <td className="lg:px-3 lg:py-3 md:px-2 md:py-2">APPL</td>
                <td className="lg:px-3 lg:py-3 md:px-2 md:py-2">1</td>
                <td className="lg:px-3 lg:py-3 md:px-2 md:py-2">$128.55</td>
                <td className="lg:px-3 lg:py-3 md:px-2 md:py-2">
                  08/12/2022
                  <br></br>
                  8:55PM
                </td>
              </tr>
              <tr className="bg-another-gray text-center">
                <td className="lg:px-3 lg:py-3 md:px-2 md:py-2">Job 1</td>
                <td className="lg:px-3 lg:py-3 md:px-2 md:py-2">Buy</td>
                <td className="lg:px-3 lg:py-3 md:px-2 md:py-2">APPL</td>
                <td className="lg:px-3 lg:py-3 md:px-2 md:py-2">1</td>
                <td className="lg:px-3 lg:py-3 md:px-2 md:py-2">$128.55</td>
                <td className="lg:px-3 lg:py-3 md:px-2 md:py-2">
                  08/12/2022
                  <br></br>
                  8:55PM
                </td>
              </tr>
              <tr className="bg-dark-gray text-center">
                <td className="lg:px-3 lg:py-3 md:px-2 md:py-2">Job 1</td>
                <td className="lg:px-3 lg:py-3 md:px-2 md:py-2">Buy</td>
                <td className="lg:px-3 lg:py-3 md:px-2 md:py-2">APPL</td>
                <td className="lg:px-3 lg:py-3 md:px-2 md:py-2">1</td>
                <td className="lg:px-3 lg:py-3 md:px-2 md:py-2">$128.55</td>
                <td className="lg:px-3 lg:py-3 md:px-2 md:py-2">
                  08/12/2022
                  <br></br>
                  8:55PM
                </td>
              </tr>
              <tr className="bg-another-gray text-center">
                <td className="lg:px-3 lg:py-3 md:px-2 md:py-2">Job 1</td>
                <td className="lg:px-3 lg:py-3 md:px-2 md:py-2">Buy</td>
                <td className="lg:px-3 lg:py-3 md:px-2 md:py-2">APPL</td>
                <td className="lg:px-3 lg:py-3 md:px-2 md:py-2">1</td>
                <td className="lg:px-3 lg:py-3 md:px-2 md:py-2">$128.55</td>
                <td className="lg:px-3 lg:py-3 md:px-2 md:py-2">
                  08/12/2022
                  <br></br>
                  8:55PM
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistoryPage;
