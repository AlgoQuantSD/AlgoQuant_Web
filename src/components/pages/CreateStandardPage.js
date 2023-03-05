import { React, useContext, useState } from "react";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";
import StockSelect from "../singular/StockSelect";
import AlgoquantApiContext from "../../api/ApiContext";
import NumberInput from "../singular/NumberInput";
import IndicatorSelect from "../singular/IndicatorSelect";

const CreateStandardPage = () => {
  const [investorName, setInvestorName] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [profitStop, setProfitStop] = useState(null);
  const [lossStop, setLossStop] = useState(null);
  const [tradeFrequency, setTradeFrequency] = useState("");

  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);

  /*
  Function called when the user attempts to save changes. Will check all the user values and 
  attempt to update them.
  */
  const saveChanges = () => {
    console.log("Changes Saved!");
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

  const selectItem = (item) => {
    console.log(item);
  };

  const resetSearch = () => {
    setSearchResults([]);
  };

  return (
    <div className="bg-cokewhite overflow-x-auto overflow-y-auto pb-6">
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
                Choose an investment rate
              </p>
              <select
                id="underline_select"
                class="block py-2.5 px-0 w-full text-lg text-gray-500 bg-cokewhite border-0 border-b-2 border-green appearance-none"
                style={{ outline: "none" }}
              >
                <option selected>Select</option>
                <option value="minutes">30 minutes</option>
                <option value="hour">1 hour</option>
                <option value="hours">4 hours</option>
                <option value="day">1 day</option>
                <option value="week">1 week</option>
                <option value="month">1 month</option>
              </select>
            </div>
          </div>

          <div className="flex w-full p-3 mt-6 items-center">
            {/* Indicator Selection */}
            <div className="flex flex-col w-1/2">
              <p className="text-2xl font-semibold text-green">
                Pick your indicators
              </p>
              <IndicatorSelect />
            </div>

            {/* Set Conditions */}
            <div className="mb-6 p-3 flex flex-col w-1/2">
              <p className="text-green text-2xl font-semibold mb-2">
                Set Conditions
              </p>
              <div className="flex">
                <div className="flex flex-col p-4 w-5/12">
                  <p className="text-green text-xl font-medium">Profit Stop</p>
                  <p className="text-another-gray text-md font-light">
                    The price gain at which you want the strategy to end
                  </p>
                </div>
                <div className="flex items-center w-3/4">
                  <NumberInput />
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col p-4 w-5/12">
                  <p className="text-red text-xl font-medium">Loss Stop</p>
                  <p className="text-another-gray text-md font-light">
                    The price loss at which you want the strategy to end
                  </p>
                </div>
                <div className="flex items-center w-3/4">
                  <NumberInput />
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
              selectItem={selectItem}
              getSearchResults={getSearchResults}
              searchResults={searchResults}
              resetSearch={resetSearch}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStandardPage;
