import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";
import Table from "../reusable/Table";

const BacktestingPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const viewBacktest = (value) => {
    navigate("/backtestresults", { state: { value: value } });
  };

  // header used for the columns on the table
  const header = [
    { key: "backtestName", title: "Backtest Name" },
    { key: "investor", title: "Investor" },
    { key: "status", title: "Status" },
    { key: "profitLoss", title: "Profit / Loss" },
    { key: "startDate", title: "Start Date" },
    { key: "endDate", title: "End Date" },
  ];

  // Filler table data until we connect to backend
  const backtestData = [
    {
      backtestName: "Sample backtest",
      investor: "James Franco",
      status: "running",
      profitLoss: 89,
      startDate: "3/13/2019",
      endDate: "3/10/2023",
    },
    {
      backtestName: "Sample backtest2g",
      investor: "Warren Buffett",
      status: "completed",
      profitLoss: -15,
      startDate: "5/16/2020",
      endDate: "3/10/2023",
    },
    {
      backtestName: "Random",
      investor: "Elon Musk",
      status: "completed",
      profitLoss: 33,
      startDate: "5/16/2020",
      endDate: "3/10/2023",
    },
    {
      status: "completed",
      backtestName: "Musk",
      investor: "Elephant",
      profitLoss: 57,
      startDate: "5/16/2020",
      endDate: "3/10/2023",
    },
  ];

  const transactions = backtestData.map((transaction, index) => {
    return {
      id: index,
      backtestName: transaction.backtestName,
      investor: transaction.investor,
      status: transaction.status,
      profitLoss: transaction.profitLoss,
      startDate: transaction.startDate,
      endDate: transaction.endDate,
    };
  });

  const transactionsPerPage = 10;
  const startIndex = (page - 1) * transactionsPerPage;
  const endIndex = startIndex + transactionsPerPage;
  const visibleTransactions = transactions.slice(startIndex, endIndex);

  // functions to handle a page change
  const handleNextClick = () => {
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
          </div>
          <p className="text-faded-green text-2xl font-light w-1/2 mt-5">
            AlgoQuant allows you to backtest your investors against historical
            data so you can see how your investors would have performed in the
            past.
          </p>
          <div className="flex pt-10">
            <h1 className="text-green font-bold sm:text-3xl md:text-4xl mb-10">
              Completed Backtests
            </h1>
          </div>
          <Table
            data={visibleTransactions}
            header={header}
            viewBacktest={viewBacktest}
          ></Table>
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

            {endIndex >= transactions.length ? (
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
        </div>
      </div>
    </div>
  );
};

export default BacktestingPage;
