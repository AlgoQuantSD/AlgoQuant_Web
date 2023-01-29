import React from "react";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";

const CreateInvestorPage = () => {
  return (
    <div className="bg-dark-gray overflow-auto">
      <Navbar />
      <div className="container mx-auto flex bg-dark-gray">
        <Sidebar />
        <div className="sm:w-3/4 md:w-5/6 lg:w-7/8 bg-dark-gray pl-5">
          <div className="flex pt-24">
            <h1 className="text-green font-bold text-5xl">Create Investor</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInvestorPage;
