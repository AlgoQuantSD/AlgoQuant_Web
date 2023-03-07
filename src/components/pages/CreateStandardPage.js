import { React, useContext, useState } from "react";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";
import StockSelect from "../singular/StockSelect";
import AlgoquantApiContext from "../../api/ApiContext";
import IndicatorSelect from "../singular/IndicatorSelect";
import { useNavigate } from "react-router-dom";

const CreateStandardPage = () => {
  const [investorName, setInvestorName] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [tradeFrequency, setTradeFrequency] = useState("Select");
  const [profitStop, setProfitStop] = useState(50);
  const [lossStop, setLossStop] = useState(50);
  const [selectedIndicators, setSelectedIndicators] = useState([]);
  const [selectedStocks, setSelectedStocks] = useState([]);
  const navigate = useNavigate();

  const [showError, setShowError] = useState(false);
  const [showStopError, setShowStopError] = useState(false);

  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);

  const handleIndicatorSelect = (selectedOptions) => {
    setSelectedIndicators(selectedOptions);
  };

  const handleStockSelect = (stocks) => {
    setSelectedStocks(stocks);
  };

  /*
  Function called when the user attempts to save changes. Will check all the user values and 
  attempt to update them.
  */
  const saveChanges = () => {
    if (
      investorName === null ||
      investorName === "" ||
      tradeFrequency === "Select" ||
      selectedIndicators.length === 0 ||
      profitStop === 0 ||
      lossStop === 0 ||
      selectedStocks.length === 0
    ) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3500); // hide the error message after 3.5 seconds
      return;
    } else if (profitStop > 100 || lossStop > 100) {
      setShowStopError(true);
      setTimeout(() => {
        setShowStopError(false);
      }, 3500);
      return;
    } else {
      let value = {
        investorName: investorName,
        tradeFrequency: tradeFrequency,
        profitStop: profitStop,
        lossStop: lossStop,
        indicators: selectedIndicators,
        stocks: selectedStocks,
      };
      createInvestor(value);
    }
  };

  /*
  Function called anytime a user hits search using the searchbar. This will make an API 
  call to get a list of search results that max the search value. The searchbar will then use 
  these results in creating the dropdown
  */
  const getSearchResults = (value) => {
    if (algoquantApi.token) {
      algoquantApi
        .searchStock(value)
        .then((resp) => {
          setSearchResults(resp.data["stock-tickers"]);
        })
        .catch((err) => {
          // TODO: Need to implement better error handling
          console.log(err);
        });
    }
    return searchResults;
  };

  const resetSearch = () => {
    setSearchResults([]);
  };

  // Function called anytime a user hits Create Investor with all of the fields correctly inputted
  // This will send all the input data to the backend to create a new investor
  const createInvestor = (value) => {
    navigate("/confirmation", { state: { value: value } });
  };

  return (
    <div className="bg-cokewhite overflow-x-auto overflow-y-auto">
      <Navbar />
      <div className="flex self-stretch">
        <Sidebar />
        <div className="sm:w-3/4 md:w-5/6 lg:w-7/8 p-5">
          <div className="flex pt-10">
            <h1 className="text-green font-bold text-5xl">
              Start from Scratch
            </h1>
          </div>

          <div className="flex mt-6">
            {/* Name */}
            <div className="flex flex-col w-1/2 p-3">
              <p className="text-green text-2xl font-semibold mb-2">
                What do you want to call your investor?
              </p>
              <input
                className="bg-smokewhite focus:outline-none focus:shadow-outline py-2 px-4 block w-1/2 font-medium text-xl appearance-none leading-normal shadow-md caret-green text-green"
                type="text"
                placeholder={"Investor Name"}
                onChange={(event) => {
                  setInvestorName(event.target.value);
                }}
              />
            </div>

            {/* Trade Frequency */}
            <div className="flex flex-col p-3 w-3/12">
              <p className="text-green text-2xl font-semibold mb-2">
                Trade Frequency
              </p>
              <p className="text-another-gray text-md font-light mb-2">
                Choose a trader type that best fits your trading style
              </p>
              <select
                id="underline_select"
                className="block py-2.5 px-0 w-full text-lg text-gray-500 bg-cokewhite border-0 border-b-2 border-green appearance-none"
                style={{ outline: "none" }}
                onChange={(event) => {
                  setTradeFrequency(event.target.value);
                }}
                defaultValue="Select"
              >
                <option value="Select">Select</option>
                <option value="minutes">
                  High Frequency Day Trader - 30 minutes
                </option>
                <option value="hour">Low Frequency Day Trader - 1 hour</option>
                <option value="hours">
                  High Frequency Swing Trader - 4 hours
                </option>
                <option value="day">Low Frequency Swing Trader - 1 day</option>
                <option value="week">
                  High Frequency Long Trader - 1 week
                </option>
                <option value="month">
                  Low Frequency Long Trader - 1 month
                </option>
              </select>
            </div>
          </div>

          <div className="flex w-full p-3 mt-6 items-center">
            {/* Indicator Selection */}
            <div className="flex flex-col w-1/2">
              <p className="text-2xl font-semibold text-green">
                Pick your indicators
              </p>
              <IndicatorSelect onOptionsSelect={handleIndicatorSelect} />
            </div>

            {/* Set Conditions */}
            <div className="mb-6 p-3 flex flex-col w-1/2">
              <p className="text-green text-2xl font-semibold mb-2">
                Set Conditions
              </p>
              {/* Profit Stop */}
              <div className="flex">
                <div className="flex flex-col p-4 w-5/12">
                  <p className="text-green text-xl font-medium">Profit Stop</p>
                  <p className="text-another-gray text-md font-light">
                    The percentage gain at which you want the strategy to end
                  </p>
                </div>
                <div className="flex items-center w-3/4">
                  <input
                    className="outline-none focus:outline-none text-center w-20 bg-smokewhite font-semibold text-md cursor-default flex items-center text-green outline-none"
                    type="number"
                    placeholder={50}
                    onChange={(event) => {
                      setProfitStop(event.target.value);
                    }}
                  />
                </div>
              </div>
              {/* Loss Stop */}
              <div className="flex">
                <div className="flex flex-col p-4 w-5/12">
                  <p className="text-red text-xl font-medium">Loss Stop</p>
                  <p className="text-another-gray text-md font-light">
                    The percentage loss at which you want the strategy to end
                  </p>
                </div>
                <div className="flex items-center w-3/4">
                  <input
                    className="outline-none focus:outline-none text-center w-20 bg-smokewhite font-semibold text-md cursor-default flex items-center text-green outline-none"
                    type="number"
                    placeholder={50}
                    onChange={(event) => {
                      setLossStop(event.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Stocks */}
          <div className="flex flex-col w-4/12 p-3">
            <p className="text-green text-2xl font-semibold mb-2">
              Select stocks to invest
            </p>
            <StockSelect
              getSearchResults={getSearchResults}
              searchResults={searchResults}
              resetSearch={resetSearch}
              onOptionsSelect={handleStockSelect}
            />
          </div>

          {/* Create Investor Button */}
          <div className="p-3 mt-10">
            <button
              className="text-cokewhite font-medium rounded-lg bg-green px-4 py-2"
              onClick={() => {
                saveChanges();
              }}
            >
              Create Investor
            </button>
            {showError ? (
              <p className="text-red mt-3">
                Please fill out all fields before creating an investor
              </p>
            ) : null}
            {showStopError ? (
              <p className="text-red mt-3">
                Profit / Loss Stop must be a percentage between 0 and 100
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStandardPage;
