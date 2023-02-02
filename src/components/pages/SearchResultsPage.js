import React from "react";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";
import Graph from "../reusable/Graph";
import { useLocation } from "react-router-dom";

const SearchResultsPage = () => {
  const location = useLocation();

  // const getGraphData = (timeFrame) => {
  //   // Get graph data from API using timeframe
  //   timeFrame = { timeFrame };
  // };

  return (
    <div className="bg-dark-gray overflow-x-auto overflow-y-auto">
      <Navbar />
      <div className="flex self-stretch">
        <Sidebar />
        <div className="sm:w-3/4 md:w-5/6 lg:w-7/8 pl-5">
          <div className="pt-10">
            <h1 className="text-white font-bold text-6xl">
              {location.state.value}
            </h1>
            <h2 className="text-white font-semibold text-4xl mt-2">$138.08</h2>
            <p className="text-bright-green font-medium text-md mt-2">
              +$4.61 (+3.22%)
              <p className="inline text-light-gray font-light"> Today</p>
            </p>
          </div>
          {/* <div className="flex"></div> */}
          <div className="w-3/4 h-2/5 mx-auto my-10">
            <Graph />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
