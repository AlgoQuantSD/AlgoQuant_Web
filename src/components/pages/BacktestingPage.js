import React from "react";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";

const BacktestingPage = () => {
  return (
    <div className="w-full h-screen bg-dark-gray">
      <Navbar />
      <Sidebar />
      <h1 className="font-semibold text-5xl text-white text-center pt-32">
        BacktestingPage
      </h1>
    </div>
  );
};

export default BacktestingPage;
