import React from "react";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";

const CreateInvestorPage = () => {
  return (
    <div className="flex bg-dark-gray overflow-x-scroll">
      <Navbar />
      <Sidebar />
      <h1 className="font-semibold text-5xl text-white text-center pt-32">
        Create Investor Page
      </h1>
    </div>
  );
};

export default CreateInvestorPage;
