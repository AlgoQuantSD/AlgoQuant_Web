import React from "react";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";

const BacktestingPage = () => {
  return (
    <div className="bg-dark-gray h-screen">
      <Navbar />
      <div className="container mx-auto flex">
        <Sidebar className="w-1/6 ml-3 md:ml-0 lg:ml-0" />
        <div className="sm:w-3/4 md:w-5/6 lg:w-7/8 bg-dark-gray overflow-y">
          <div className="flex justify-center items-center pt-24">
            <div className="sm:w-full md:w-8/12">
              <h1 className="text-green font-bold text-5xl">Backtesting</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BacktestingPage;
