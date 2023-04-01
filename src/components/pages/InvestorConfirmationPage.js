import React, { useContext, useState, useEffect } from "react";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AlgoquantApiContext from "../../api/ApiContext";
import Banner from "../reusable/Banner";
import { LoadSpinner } from "../reusable/LoadSpinner";
import { ToastContext } from "../reusable/ToastContext";

const InvestorConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageID, setImageID] = useState("");

  // Randomly select an image from the S3 bucket
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * 3) + 1;
    const id =
      "https://algoquant-resources.s3.amazonaws.com/InvestorImages/" +
      location.state.value.tradeFrequency +
      "/" +
      randomIndex +
      ".png";
    setImageID(id);
  }, [location.state.value.tradeFrequency]);

  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);
  const { showToast } = useContext(ToastContext);

  const handleConfirmButton = () => {
    if (algoquantApi.token) {
      setIsLoading(true);
      algoquantApi
        .createInvestor(
          location.state.value.stocks,
          location.state.value.indicators,
          imageID, // UPDATE NEED TO PUT IMAGE ID HERE
          location.state.value.investorName,
          parseFloat(location.state.value.lossStop) / 100, // will need to update this so we dont do this here
          location.state.value.tradeFrequency,
          parseFloat(location.state.value.profitStop) / 100, // will need to update this so we dont do this here
          "I"
        )
        .then((resp) => {
          console.log(resp.data);
          navigate("/home");
          showToast(resp.data.message, "success");
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          setErrorMsg(err.toString());
        });
    }
  };

  return (
    <div className="bg-cokewhite overflow-x-auto overflow-y-auto">
      {errorMsg === "" ? (
        <></>
      ) : (
        <Banner message={errorMsg} setMessage={setErrorMsg} type="error" />
      )}
      <Navbar />
      <div className="flex self-stretch">
        <Sidebar />
        {isLoading ? (
          <div className="sm:w-3/4 md:w-5/6 lg:w-7/8 p-5">
            <LoadSpinner />
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
            <img src={imageID} alt="investor" className="h-72 mt-12 mx-auto" />
            <div className="grid grid-cols-2 gap-8 mt-5 w-screen">
              <div className="flex flex-col">
                <div className="flex flex-row items-start mb-2">
                  <p className="text-green text-2xl font-semibold mr-4">
                    Investor Name:
                  </p>
                  <p className="text-green text-2xl font-medium">
                    {location.state.value.investorName}
                  </p>
                </div>
                <div className="flex flex-row items-start mb-2">
                  <p className="text-green text-2xl font-semibold mr-4">
                    Trade Frequency:
                  </p>
                  <p className="text-green text-2xl font-medium">
                    {location.state.value.tradeFrequency === "30_min"
                      ? "High Frequency Day Trader (30 minutes)"
                      : location.state.value.tradeFrequency === "1_hr"
                      ? "Low Frequency Day Trader (1 hour)"
                      : location.state.value.tradeFrequency === "4_hr"
                      ? "High Frequency Swing Trader (4 hours)"
                      : location.state.value.tradeFrequency === "1_day"
                      ? "Low Frequency Swing Trader (1 day)"
                      : location.state.value.tradeFrequency === "1_wk"
                      ? "High Frequency Long Trader (1 week)"
                      : location.state.value.tradeFrequency === "1_mo"
                      ? "Low Frequency Long Trader (1 month)"
                      : ""}
                  </p>
                </div>
                <div className="flex flex-row items-start mb-2">
                  <p className="text-green text-2xl font-semibold mr-4">
                    Profit Stop:
                  </p>
                  <p className="text-green text-2xl font-medium">
                    {location.state.value.profitStop === null
                      ? "N/A"
                      : `${location.state.value.profitStop}%`}
                  </p>
                </div>
                <div className="flex flex-row items-start mb-2">
                  <p className="text-green text-2xl font-semibold mr-4">
                    Loss Stop:
                  </p>
                  <p className="text-green text-2xl font-medium">
                    {location.state.value.lossStop === null
                      ? "N/A"
                      : `${location.state.value.lossStop}%`}
                  </p>
                </div>
                <div className="flex flex-row items-start mb-2">
                  <p className="text-green text-2xl font-semibold mr-4">
                    Selected Indicators:
                  </p>
                  <p className="text-green text-2xl font-medium">
                    {location.state.value.indicators
                      .map((indicator) => indicator.toUpperCase())
                      .join(", ")}
                  </p>
                </div>
                <div className="flex flex-row items-start mb-2">
                  <p className="text-green text-2xl font-semibold mr-4">
                    Stock Tickers:
                  </p>
                  <p className="text-green text-2xl font-medium">
                    {location.state.value.stocks.join(", ")}
                  </p>
                </div>
              </div>
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
        )}
      </div>
    </div>
  );
};

export default InvestorConfirmationPage;
