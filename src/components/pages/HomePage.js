import { React, useState, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";
import InvestorGallery from "../singular/InvestorGallery";
import "react-multi-carousel/lib/styles.css";
import Graph from "../reusable/Graph";
import GraphStats from "../reusable/GraphStats";
import AlgoquantApiContext from "../../api/ApiContext";

const HomePage = () => {
  const [chartData, setChartData] = useState([1, 2, 3, 4, 5]);
  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);
  const [categories, setCategories] = useState([1, 2, 3, 4, 5]);

  const [selectedTabFilter, setSelectedTabFilter] = useState("investor");

  const tabFilters = {
    INVESTOR: "investor",
    JOB: "job",
    history: "history",
  };

  const [stockData, setStockData] = useState([
    {
      symbol: "AAPL",
      recentPrice: 150.23,
      open: 140.0,
      high: 162.5,
      low: 126.5,
      yearHigh: 167.0,
      yearLow: 100.0,
      percentChanged: 1.5,
    },
  ]);

  const handleTabFilterSelection = (filter) => {
    setSelectedTabFilter(filter);
    // logic to update chart data based on selected filter
  };

  /*Callback used to get more data based on the filter. Each time any of the buttons 
    are clicked this will be called to get more data. This will update the chart data which 
    will then re-render the graph
    */

  const getData = useCallback(
    (timeframe) => {
      if (algoquantApi.token) {
        algoquantApi
          .getPerformance(timeframe)
          .then((resp) => {
            console.log(resp);
            setChartData(resp.data["close"]);
            switch (timeframe) {
              case "D":
                setCategories(
                  resp.data["timestamp"].map((timestamp) =>
                    new Date(timestamp * 1000).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  )
                );
                break;
              case "5D":
                setCategories(
                  resp.data["timestamp"].map((timestamp) =>
                    new Date(timestamp * 1000).toLocaleDateString("en-US", {
                      month: "numeric",
                      day: "numeric",
                    })
                  )
                );
                break;
              case "M":
                setCategories(
                  resp.data["timestamp"].map((timestamp) =>
                    new Date(timestamp * 1000).toLocaleDateString("en-US", {
                      month: "numeric",
                      day: "numeric",
                    })
                  )
                );
                break;
              case "Y":
                setCategories(
                  resp.data["timestamp"].map((timestamp) =>
                    new Date(timestamp * 1000).toLocaleDateString("en-US", {
                      month: "numeric",
                      year: "numeric",
                    })
                  )
                );
                break;
              default:
                break;
            }
          })
          .catch((err) => {
            // TODO: Need to implement better error handling
            console.log(err);
          });
      }
    },
    [algoquantApi]
  );

  // // get day when page loads
  // useEffect(() => {
  //   setChartData([1, 2, 3, 4, 5]);
  //   getData(filters.DAY);
  //   // eslint-disable-next-line
  // }, [algoquantApi]);

  return (
    <div className="bg-dark-gray overflow-x-auto overflow-y-auto">
      <Navbar />
      <div className="flex self-stretch">
        <Sidebar />
        <div className="sm:w-3/4 md:w-5/6 lg:w-7/8 p-5">
          <div className="pt-10">
            <h2 className="text-green font-bold text-4xl">Your Assets</h2>
          </div>
          <GraphStats
            recentPrice={stockData[0].recentPrice}
            open={stockData[0].open}
            percentChanged={stockData[0].percentChanged}
          />
          <div className="w-11/12 mx-auto my-10 mb-32">
            <Graph
              chartData={chartData}
              categories={categories}
              getData={getData}
            />
          </div>
          <div className="w-full">
            <h3 className="text-green font-bold text-4xl">Invest</h3>
          </div>
          <div className="flex mx-auto justify-center w-2/4 mt-8">
            <button
              className={`py-2 px-20 text-white border-b-2 border-dark-gray hover:bg-another-gray ${
                selectedTabFilter === tabFilters.INVESTOR
                  ? "border-b-green active"
                  : ""
              }`}
              onClick={() => handleTabFilterSelection(tabFilters.INVESTOR)}
            >
              Investor
            </button>
            <button
              className={`py-2 px-20 text-white border-b-2 border-dark-gray hover:bg-another-gray ${
                selectedTabFilter === tabFilters.JOB
                  ? "border-b-green active"
                  : ""
              }`}
              onClick={() => handleTabFilterSelection(tabFilters.JOB)}
            >
              Job
            </button>
            <button
              className={`py-2 px-20 text-white border-b-2 border-dark-gray hover:bg-another-gray ${
                selectedTabFilter === tabFilters.history
                  ? "border-b-green active"
                  : ""
              }`}
              onClick={() => handleTabFilterSelection(tabFilters.history)}
            >
              History
            </button>
          </div>
          <div className=" mt-10">
            {(() => {
              switch (selectedTabFilter) {
                case "investor":
                  return (
                    <div>
                      <Link
                        to="/createinvestor"
                        className="relative text-white font-medium rounded-lg bg-green px-4 py-3"
                      >
                        Create Investor
                      </Link>
                      <InvestorGallery />
                    </div>
                  );
                case "job":
                  return (
                    <div>
                      <p className="text-white">Create Job</p>
                    </div>
                  );
                case "history":
                  return (
                    <div>
                      <Link
                        to="/history"
                        className="relative text-white font-medium rounded-lg bg-green px-4 py-3"
                      >
                        View all transactions
                      </Link>
                    </div>
                  );
                default:
                  return null;
              }
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
