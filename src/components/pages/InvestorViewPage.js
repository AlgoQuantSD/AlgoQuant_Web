import React from "react";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";

const InvestorViewPage = () => {
  return (
    <div className="bg-cokewhite overflow-x-auto overflow-y-auto">
      <Navbar />
      <div className="flex self-stretch">
        <Sidebar />
        <div className="sm:w-3/4 md:w-5/6 lg:w-7/8 p-5">
          <div className="flex pt-10">
            <h1 className="text-green font-bold text-5xl">Investor View</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorViewPage;
