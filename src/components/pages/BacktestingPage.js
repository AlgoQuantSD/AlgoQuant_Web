import { React, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";
import Table from "../reusable/Table";

const BacktestingPage = () => {
  const [page, setPage] = useState(1);
  const [pagesSeen, setPagesSeen] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // header used for the columns on the table
  const header = [
    { key: "backtestName", title: "Backtest Name" },
    { key: "investor", title: "Investor" },
    { key: "initialInvestment", title: "Initial Investment" },
    { key: "finalBalance", title: "Final Balance" },
    { key: "profitLoss", title: "Profit / Loss" },
    { key: "dateRange", title: "Date Range" },
  ];

  const transactions = [
    {
      backtestName: "Backtest 1",
      investor: "Investor 1",
      initialInvestment: "$100,000",
      finalBalance: "$120,000",
      profitLoss: "$20,000",
      dateRange: "01/01/2020 - 01/01/2021",
    },
    {
      backtestName: "Backtest 2",
      investor: "Investor 2",
      initialInvestment: "$100,000",
      finalBalance: "$120,000",
      profitLoss: "$20,000",
      dateRange: "01/01/2020 - 01/01/2021",
    },
    {
      backtestName: "Backtest 3",
      investor: "Investor 3",
      initialInvestment: "$100,000",
      finalBalance: "$120,000",
      profitLoss: "$20,000",
      dateRange: "01/01/2020 - 01/01/2021",
    },
    {
      backtestName: "Backtest 4",
      investor: "Investor 4",
      initialInvestment: "$100,000",
      finalBalance: "$120,000",
      profitLoss: "$20,000",
      dateRange: "01/01/2020 - 01/01/2021",
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
          <div className="flex pt-10">
            <h1 className="text-green font-bold text-5xl">Backtesting</h1>
            <Link
              to={"/createbacktest"}
              className="relative text-white bg-green rounded-lg px-4 py-3 font-medium ml-10"
            >
              Create New Backtest
            </Link>
          </div>
          <p className="text-faded-green text-2xl font-light w-1/2 mt-5">
            AlgoQuant allows you to backtest your investors against historical
            data so you can see how your investors would have performed in the
            past
          </p>
          <div className="flex pt-10">
            <h1 className="text-green font-bold sm:text-3xl md:text-4xl mb-10">
              Completed Backtests
            </h1>
          </div>
          {/* {isLoading ? (
            <TableSpinner />
          ) : ( */}
          <>
            <Table data={transactions} header={header}></Table>
            <div className="p-6 pt-24 pb-20 overflow-auto	">
              {page === 1 ? (
                <button
                  className="text-green rounded-md w-28 h-10 bg-cokewhite py-2 px-6"
                  disabled
                ></button>
              ) : (
                <button
                  className="text-cokewhite rounded-md w-28 h-10 bg-green py-2 px-6"
                  onClick={handlePreviousClick}
                >
                  Previous
                </button>
              )}

              {transactions.length < 10 ? (
                <button
                  className="text-green rounded-md w-28 h-10 bg-cokewhite py-2 px-6"
                  disabled
                ></button>
              ) : (
                <button
                  className="text-cokewhite w-28 h-10 rounded-md bg-green py-2 px-6 float-right"
                  onClick={handleNextClick}
                >
                  Next
                </button>
              )}
              <p className="text-md font-light text-center text-light-gray mt-5">
                {"Page " + page}
              </p>
            </div>
          </>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default BacktestingPage;
