import React, { useContext, useState } from "react";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AlgoquantApiContext from "../../api/ApiContext";
import Banner from "../reusable/Banner";
import { LoadSpinner } from "../reusable/LoadSpinner";
const InvestorConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);
  console.log(location.state.value);
  const handleConfirmButton = () => {
    if (algoquantApi.token) {
      setIsLoading(true);
      algoquantApi
        .createInvestor(
          location.state.value.stocks,
          location.state.value.indicators,
          2, // UPDATE NEED TO PUT IMAGE ID HERE
          location.state.value.investorName,
          parseFloat(location.state.value.lossStop) / 100, // will need to update this so we dont do this here
          location.state.value.tradeFrequency,
          parseFloat(location.state.value.profitStop) / 100, // will need to update this so we dont do this here
          "I"
        )
        .then((resp) => {
          console.log(resp.data);
          navigate("/home");
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          setErrorMsg("Failed to create investor. Please try again later.");
        });
    }
  };
  return (
    <div className="bg-cokewhite overflow-x-auto overflow-y-auto">
      {errorMsg === "" ? (
        <></>
      ) : (
        <Banner message={errorMsg} setMessage={setErrorMsg} />
      )}
      <Navbar />
      <div className="flex self-stretch">
        <Sidebar />
        {isLoading ? (
          <div className="sm:w-3/4 md:w-5/6 lg:w-7/8 p-5">
            <LoadSpinner />{" "}
          </div>
        ) : (
          <div className="sm:w-3/4 md:w-5/6 lg:w-7/8 p-5">
            <div className="flex flex-col pt-10">
              <h1 className="text-green font-bold text-5xl">
                Investor Confirmation
              </h1>
              <p className="mt-3 text-another-gray text-lg font-light">
                Please review over the information and confirm that it is
                correct.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-5 w-1/2">
              <div className="flex flex-col">
                <p className="text-green text-2xl font-semibold mb-2">
                  Investor Name:
                </p>
                <p className="text-green text-2xl font-semibold mb-2">
                  Trade Frequency:
                </p>
                <p className="text-green text-2xl font-semibold mb-2">
                  Profit Stop:
                </p>
                <p className="text-green text-2xl font-semibold mb-2">
                  Loss Stop:
                </p>
                <p className="text-green text-2xl font-semibold mb-2">
                  Selected Indicators:
                </p>
                <p className="text-green text-2xl font-semibold mb-2">
                  Stock Tickers:
                </p>
              </div>
              <div className="flex flex-col w-screen">
                <p className="text-green text-2xl font-medium mb-2">
                  {location.state.value.investorName}
                </p>
                <p className="text-green text-2xl font-medium mb-2">
                  {location.state.value.tradeFrequency === "minutes"
                    ? "High Frequency Day Trader - 30 minutes"
                    : location.state.value.tradeFrequency === "hour"
                    ? "Low Frequency Day Trader - 1 hour"
                    : location.state.value.tradeFrequency === "hours"
                    ? "High Frequency Swing Trader - 4 hours"
                    : location.state.value.tradeFrequency === "day"
                    ? "Low Frequency Swing Trader - 1 day"
                    : location.state.value.tradeFrequency === "week"
                    ? "High Frequency Long Trader - 1 week"
                    : location.state.value.tradeFrequency === "month"
                    ? "Low Frequency Long Trader - 1 month"
                    : ""}
                </p>
                <p className="text-green text-2xl font-medium mb-2">
                  {location.state.value.profitStop === null
                    ? "N/A"
                    : `${location.state.value.profitStop}%`}
                </p>
                <p className="text-green text-2xl font-medium mb-2">
                  {location.state.value.lossStop === null
                    ? "N/A"
                    : `${location.state.value.lossStop}%`}
                </p>
                <p className="text-green text-2xl font-medium mb-2">
                  {location.state.value.indicators
                    .map((indicator) => indicator.toUpperCase())
                    .join(", ")}
                </p>
                <p className="text-green text-2xl font-medium mb-2">
                  {location.state.value.stocks.join(", ")}
                </p>
              </div>
              {/* Create Investor Button */}
              <div className="mt-10">
                <button
                  className="text-cokewhite font-medium rounded-lg bg-green px-4 py-2"
                  onClick={handleConfirmButton}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestorConfirmationPage;
