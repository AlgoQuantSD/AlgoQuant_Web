import React from "react";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";

const TransactionHistoryPage = () => {
  return (
    <div className="flex bg-dark-gray overflow-x-scroll">
      <Navbar />
      <Sidebar />
      <div className="flex justify-center items-center">
        <div className="w-7/12">
          <div className="ml-3 flex">
            <h1 className="text-green font-bold text-5xl pt-24">
              Transaction History
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistoryPage;
