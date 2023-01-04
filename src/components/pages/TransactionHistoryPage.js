import React from "react";
import Navbar from "../NavBar";
import Sidebar from "../SideBar";

const TransactionHistoryPage = () => {
  return (
    <div className="w-gull h-screen bg-dark-gray">
      <Navbar />
      <Sidebar />
      <h1 className="font-semibold text-5xl text-white text-center pt-32">
        Transaction History Page
      </h1>
    </div>
  );
};

export default TransactionHistoryPage;
