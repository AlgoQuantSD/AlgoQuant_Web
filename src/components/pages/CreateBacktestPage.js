import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";

const CreateBacktestPage = () => {
  const location = useLocation();

  // State variables used to keep track of user input
  const [backtestName, setBacktestName] = useState(null);

  return (
    <div className="bg-cokewhite overflow-x-auto overflow-y-auto">
      <Navbar />
      <div className="flex self-stretch">
        <Sidebar />
        <div className="sm:w-3/4 md:w-5/6 lg:w-7/8 p-5">
          <div className="flex pt-10">
            <h1 className="text-green font-bold text-5xl">
              Create a Backtest for {location.state.value.investor_name}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBacktestPage;
