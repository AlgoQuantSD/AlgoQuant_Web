import React from "react";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";

const TransactionHistoryPage = () => {
  return (
    <div className="w-full h-screen bg-dark-gray">
      <Navbar />
      <Sidebar />
      <div className="flex justify-center items-center">
        <div className="w-7/12">
          <div className="ml-3 flex">
            <h1 className="text-green font-bold text-5xl pt-24">
              Transaction History
            </h1>
          </div>
          <table className="table-auto text-white mt-5">
            <thead>
              <tr>
                <th className="px-4 py-2">Job Name</th>
                <th className="px-4 py-2">Buy/Sell</th>
                <th className="px-4 py-2">Stock Ticker</th>
                <th className="px-4 py-2">Number of Shares</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">Job 1</td>
                <td className="px-4 py-2">Buy</td>
                <td className="px-4 py-2">AAPL</td>
                <td className="px-4 py-2">100</td>
                <td className="px-4 py-2">$5000</td>
                <td className="px-4 py-2">Jan 1, 2020</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Job 2</td>
                <td className="px-4 py-2">Sell</td>
                <td className="px-4 py-2">GOOGL</td>
                <td className="px-4 py-2">50</td>
                <td className="px-4 py-2">$3000</td>
                <td className="px-4 py-2">Feb 15, 2020</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistoryPage;
