import React, { useContext, useCallback, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Graph from "../reusable/Graph";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";
import { Link } from "react-router-dom";
import AlgoquantApiContext from "../../api/ApiContext";

const BacktestingResultsPage = () => {
  const location = useLocation();
  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);

  // State variables to store the graph data of selected backtest graph data
  const [investorPerformance, setInvestorPerformance] = useState([]);
  const [buyHoldPerformance, setBuyHoldPerformance] = useState([]);

  const [yValues, setYValues] = useState([]);
  const [priceChange, setPriceChange] = useState([]);
  // store the backtest data
  const [backtestDataObject, setBacktestDataObject] = useState(null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  // // API call to get backtest based on the clicked backtest from the backtestScreen using the backtest ID
  // eslint-disable-next-line
  const getBacktestData = useCallback(() => {
    if (algoquantApi.token) {
      algoquantApi
        .getBacktest(location.state.value)
        .then((resp) => {
          setBacktestDataObject(resp.data);
          console.log(resp.data);
          setInvestorPerformance(resp.data["portfolio_value_history"])
          setBuyHoldPerformance(resp.data["portfolio_value_history_hold"])
          setYValues(
            resp.data["value_timestamps"].map((timestamp) =>
              new Date(timestamp * 1000).toLocaleDateString("en-US", {
                month: "numeric",
                day: "numeric",
              })
            )
          );

          let startTimeDate = new Date(parseInt(resp.data.start_time) * 1000);
          let endTimeDate = new Date(parseInt(resp.data.end_time) * 1000);
          const options = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          };
          const formattedStartTime = startTimeDate.toLocaleString([], options);
          const formattedEndTime = endTimeDate.toLocaleString([], options);
          setStartDate(formattedStartTime);
          setEndDate(formattedEndTime);
          setPriceChange([
            {
              priceChange:
                ((parseFloat(resp.data.final_portfolio_value) -
                  parseFloat(resp.data.initial_investment)) /
                  parseFloat(resp.data.initial_investment)) *
                100,
            },
          ]);
        })
        .catch((err) => {
          // TODO: Need to implement better error handling
          console.log(err);
        });
    }
  });

  useEffect(() => {
    getBacktestData();
    console.log("effect from backtesting result page");
    // eslint-disable-next-line
  }, [location.state.value, algoquantApi]);

  // Conditional rendering logic
  let statement;
  let profitLoss =
    ((backtestDataObject?.final_portfolio_value -
      backtestDataObject?.initial_investment) /
      backtestDataObject?.initial_investment) *
    100;
  if (profitLoss < 0) {
    statement = "poorly";
  } else if (profitLoss > 0 && profitLoss < 20) {
    statement = "okay";
  } else if (profitLoss >= 20 && profitLoss < 50) {
    statement = "well";
  } else if (profitLoss >= 50) {
    statement = "extremely well";
  }

  return (
    <div className="bg-cokewhite overflow-y-auto overflow-x-hidden">
      <Navbar />
      <div className="flex self-stretch">
        <Sidebar />
        <div className="sm:w-3/4 md:w-5/6 lg:w-7/8 p-5">
          <div className="flex flex-col pt-10">
            <h1 className="text-green font-bold text-5xl">
              {location.state.value.backtestName} Backtest Results
            </h1>
            <div className="flex p-3 mb-7 w-1/2">
              <p className="flex text-green font-normal text-3xl">
                {backtestDataObject?.backtest_name} performed {statement}{" "}
                according to AlgoQuant metrics, yielding a{" "}
                {profitLoss.toFixed(3)}%{" "}
                {profitLoss.toFixed(3) > 0 ? "profit" : "loss"}.
                {/* over the course */}
                {/* of 1,150 days. */}
              </p>
            </div>
            <div className="w-10/12 mx-auto">
              <Graph
                stockData={priceChange}
                lines={[{"data": investorPerformance, "name": "Investor Performance"}, {"data": buyHoldPerformance, "name": "Buy/Hold Performance", "color": "#0000FF"}]}
                yValues={yValues}
                selectedFilter={null}
              />
            </div>
            <div className="flex items-center pt-10">
              <h1 className="text-green font-bold sm:text-3xl md:text-4xl pt-3 pr-5">
                Analysis
              </h1>
              <Link
                to="/backtesting"
                className="bg-cokewhite hover:bg-smokewhite border-2 border-light-gray rounded-lg text-green font-medium px-4 py-3 mt-2"
              >
                View Full History
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-5 w-1/2 p-3">
              <div className="flex flex-col">
                <p className="text-green text-2xl font-semibold mb-2">
                  Backtest Name:
                </p>
                <p className="text-green text-2xl font-semibold mb-2">
                  Start date:
                </p>
                <p className="text-green text-2xl font-semibold mb-2">
                  End date:
                </p>
                <p className="text-green text-2xl font-semibold mb-2">
                  Initial investment:
                </p>
                <p className="text-green text-2xl font-semibold mb-2">
                  Final balance:
                </p>
                <p className="text-green text-2xl font-semibold mb-2">
                  Net earnings:
                </p>
                <p className="text-green text-2xl font-semibold mb-2">
                  Number of trades:
                </p>
                <p className="text-green text-2xl font-semibold mb-2">
                  Portfolio min value:
                </p>
                <p className="text-green text-2xl font-semibold mb-2">
                  Portfolio max value:
                </p>
                <p className="text-green text-2xl font-semibold mb-2">
                  Average win:
                </p>
                <p className="text-green text-2xl font-semibold mb-2">
                  Average loss:
                </p>
                <p className="text-green text-2xl font-semibold mb-2">
                  Average return:
                </p>
                <p className="text-green text-2xl font-semibold mb-2">
                  Max drawdown:
                </p>
                <p className="text-green text-2xl font-semibold mb-2">
                  Portfolio volatility:
                </p>
                <p className="text-green text-2xl font-semibold mb-2">
                  Sharpe ratio:
                </p>
              </div>
              <div className="flex flex-col w-screen">
                <p className="text-green text-2xl font-medium mb-2">
                  {backtestDataObject?.backtest_name}
                </p>
                <p className="text-green text-2xl font-medium mb-2">
                  {startDate}
                </p>
                <p className="text-green text-2xl font-medium mb-2">
                  {endDate}
                </p>
                <p className="text-green text-2xl font-medium mb-2">
                  ${backtestDataObject?.initial_investment}
                </p>
                <p className="text-green text-2xl font-medium mb-2">
                  ${backtestDataObject?.final_portfolio_value}
                </p>
                <p className="text-green text-2xl font-medium mb-2">
                  ${backtestDataObject?.net_returns}
                </p>
                <p className="text-green text-2xl font-medium mb-2">
                  {backtestDataObject?.num_trades}
                </p>
                <p className="text-green text-2xl font-medium mb-2">
                  ${backtestDataObject?.portfolio_min_value}
                </p>
                <p className="text-green text-2xl font-medium mb-2">
                  ${backtestDataObject?.portfolio_max_value}
                </p>
                <p className="text-green text-2xl font-medium mb-2">
                  {backtestDataObject?.avg_win}
                </p>
                <p className="text-green text-2xl font-medium mb-2">
                  {backtestDataObject?.avg_loss}
                </p>
                <p className="text-green text-2xl font-medium mb-2">
                  {backtestDataObject?.avg_return}
                </p>
                <p className="text-green text-2xl font-medium mb-2">
                  {backtestDataObject?.max_drawdown}
                </p>
                <p className="text-green text-2xl font-medium mb-2">
                  {backtestDataObject?.portfolio_volatility}
                </p>
                <p className="text-green text-2xl font-medium mb-2">
                  {backtestDataObject?.sharpe_ratio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BacktestingResultsPage;
