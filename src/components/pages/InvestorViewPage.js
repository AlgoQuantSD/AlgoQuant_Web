import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";
import investorPhotos from "../../assets/images/investors/InvestorPhotos";
import bot from "../../assets/images/investors/bot1.png";
import Table from "../reusable/Table";

const InvestorViewPage = () => {
  const location = useLocation();
  const [transactions, setTransactions] = useState([]);
  const [lastPage, setLastPage] = useState(false);
  const [page, setPage] = useState(1);
  const [pagesSeen, setPagesSeen] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // dummy data for the table
  const profitStop = "$50";
  const lossStop = "$30";
  const stockTicker = "AAPL";
  const indicators = ["RSI", "MACD", "SMA"];

  // header used for the columns on the table
  const header = [
    { key: "jobName", title: "Job Name" },
    { key: "balance", title: "Balance" },
  ];

  const data = [
    {
      jobName: "Job 1",
      balance: "$128.34 (4.8%)",
    },
    {
      jobName: "Job 2",
      balance: "$128.34 (4.8%)",
    },
    {
      jobName: "Job 3",
      balance: "$128.34 (4.8%)",
    },
    {
      jobName: "Job 4",
      balance: "$128.34 (4.8%)",
    },
  ];

  // functions to handle a page change
  const handleNextClick = () => {
    if (pagesSeen <= page) {
      setIsLoading(true);
    }
    setPage(page + 1);
  };

  const handlePreviousClick = () => {
    setPage(page - 1);
  };

  return (
    <div className="bg-cokewhite overflow-x-auto overflow-y-auto">
      <Navbar />
      <div className="flex self-stretch">
        <Sidebar />
        <div className="sm:w-3/4 md:w-5/6 lg:w-7/8 p-5">
          <div className="flex pt-10 justify-between">
            <div className="">
              <h1 className="text-green font-bold text-5xl mb-10">
                {location.state.value.name}
              </h1>
            </div>

            <div className="">
              <button className="items-center text-white font-medium rounded-lg bg-green px-4 py-3">
                Delete Investor
              </button>
            </div>
          </div>

          <div className="m-4">
            <button className="items-center text-white font-medium rounded-lg bg-green px-4 py-3">
              Create New Job
            </button>
          </div>

          <div className="flex h-1/4">
            <div className="flex justify-center w-1/2">
              {location.state.value.id === "investor" ? (
                // Find out how to receive the photo associated with the selected investor
                <img
                  src={investorPhotos[10 % investorPhotos.length]}
                  alt=""
                  className="h-52 mt-6 mb-6"
                />
              ) : (
                <img src={bot} alt="bot" className="h-72 mt-12" />
              )}
            </div>
            <div className="justify-center w-1/2 bg-cokewhite">
              <p className="text-green text-3xl font-semibold">
                Investor Configuration
              </p>
              <table className="table-auto mt-5">
                <tbody>
                  <tr>
                    <td className="px-4 py-2 text-xl font-semibold">
                      Profit Stop:
                    </td>
                    <td className="px-4 py-2 text-lg">{profitStop}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-xl font-semibold">
                      Loss Stop:
                    </td>
                    <td className="px-4 py-2 text-lg">{lossStop}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-xl font-semibold">
                      Stock Ticker:
                    </td>
                    <td className="px-4 py-2 text-lg">{stockTicker}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-xl font-semibold">
                      Indicators:
                    </td>
                    <td className="px-4 py-2 text-lg">
                      {indicators.map((indicator, index) => (
                        <div key={index} className="mb-1">
                          {indicator}
                        </div>
                      ))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-24 w-1/2">
            <h1 className="text-green font-bold text-5xl mb-10">Jobs</h1>
            <Table data={data} header={header}></Table>
            <div className="p-6 pt-24 pb-20 overflow-auto	">
              <button
                className="text-cokewhite rounded-md w-28 h-10 bg-green py-2 px-6"
                onClick={handlePreviousClick}
              >
                Previous
              </button>

              <button
                className="text-cokewhite w-28 h-10 rounded-md bg-green py-2 px-6 float-right"
                onClick={handleNextClick}
              >
                Next
              </button>
              <p className="text-md font-light text-center text-light-gray mt-5">
                {"Page " + page}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorViewPage;
