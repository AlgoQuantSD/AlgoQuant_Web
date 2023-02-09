import { React, useState } from "react";
import { Link } from "react-router-dom";
import Graph from "../reusable/Graph";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";

const HomePage = () => {
  // Currently hardcoded but will eventually come from API
  const [chartData, setChartData] = useState([1000, 50, 1]);
  const [categories, setCategories] = useState(["Jan", "Feb", "Mar"]);

  /*
    Callback used to get more data based on the filter. Each time any of the buttons 
    are clicked this will be called to get more data. This will update the chart data which 
    will then re-render the graph
    */
  const getData = (filter) => {
    setChartData([]);
    setCategories([]);
    console.log(filter);
  };

  // Defining variables for Investing tabs
  const [selectedFilter, setSelectedFilter] = useState("investor");

  const filters = {
    INVESTOR: "investor",
    JOB: "job",
    history: "history",
  };

  const handleFilterSelection = (filter) => {
    setSelectedFilter(filter);
    // logic to update chart data based on selected filter
  };

  return (
    <div className="bg-dark-gray overflow-x-auto overflow-y-auto">
      <Navbar />
      <div className="flex self-stretch">
        <Sidebar />
        <div className="sm:w-3/4 md:w-5/6 lg:w-7/8 p-5">
          <div className="flex pt-10">
            <h2 className="text-green font-bold text-4xl m-4">Your Assets</h2>
          </div>
          <Graph
            chartData={chartData}
            categories={categories}
            getData={getData}
          />
          <div className="flex mt-24 w-full">
            <h3 className="text-green font-bold text-4xl m-4">Invest</h3>
            <div className="pl-5 self-center">
              <Link
                to="/createinvestor"
                className="text-white font-medium rounded-lg bg-green px-4 py-3"
              >
                Create new
              </Link>
            </div>
          </div>
          <div className="flex mx-auto justify-center w-2/4 mt-8">
            <button
              className={`py-2 px-20 text-white border-b-2 border-dark-gray hover:bg-another-gray ${
                selectedFilter === filters.INVESTOR
                  ? "border-b-green active"
                  : ""
              }`}
              onClick={() => handleFilterSelection(filters.INVESTOR)}
            >
              Investor
            </button>
            <button
              className={`py-2 px-20 text-white border-b-2 border-dark-gray hover:bg-another-gray ${
                selectedFilter === filters.JOB ? "border-b-green active" : ""
              }`}
              onClick={() => handleFilterSelection(filters.JOB)}
            >
              Job
            </button>
            <button
              className={`py-2 px-20 text-white border-b-2 border-dark-gray hover:bg-another-gray ${
                selectedFilter === filters.history
                  ? "border-b-green active"
                  : ""
              }`}
              onClick={() => handleFilterSelection(filters.history)}
            >
              History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
