import { React, useContext, useState } from "react";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";
import CardGallery from "../singular/CardGallery";
import { useNavigate } from "react-router-dom";
import Searchbar from "../reusable/SearchBar";
import AlgoquantApiContext from "../../api/ApiContext";
import NumberInput from "../singular/NumericInput";

const CreateStandardPage = () => {
  const [investorName, setInvestorName] = useState(null);
  const [indicators, setIndicators] = useState([]);
  const [searchResults, setSearchResults] = useState(["No search yet"]);
  const navigate = useNavigate();

  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);

  const handleIndicatorChange = (event) => {
    const indicator = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setIndicators([...indicators, indicator]);
    } else {
      setIndicators(indicators.filter((i) => i !== indicator));
    }
  };

  /* 
  Function called anytime a user selects one of the items in the dropdown. Will navigate 
  a user to the search page passing in the value. 
  */
  const selectItem = (value) => {
    navigate("/search", { state: { value: value } });
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

  return (
    <div className="bg-cokewhite overflow-x-auto overflow-y-auto pb-24">
      <Navbar />
      <div className="flex self-stretch overflow-hidden">
        <Sidebar />
        <div className="sm:w-3/4 md:w-5/6 lg:w-7/8 p-5">
          <div className="flex pt-10">
            <h1 className="text-green font-bold text-5xl">
              Start from Scratch
            </h1>
          </div>
          <div className="p-3 mt-6">
            {/* Name */}
            <p className="text-green text-2xl font-semibold mb-2">
              What do you want to call your investor?
            </p>
            <input
              className="bg-smokewhite focus:outline-none focus:shadow-outline py-2 px-4 block w-1/3 font-medium text-xl appearance-none leading-normal shadow-md caret-green text-green"
              type="text"
              placeholder={"Investor Name"}
              onChange={(event) => {
                setInvestorName(event.target.value);
              }}
            />

            {/* Indicator Selection */}
            <div className="flex bg-green mt-10">
              <div className="flex w-1/2 p-24">
                <CardGallery />
              </div>
              <div className="flex flex-col w-1/2 bg-red"></div>
            </div>
          </div>

          {/* Set Conditions */}
          <div
            className="mb-6 overflow-hidden scrollable"
            onWheel={(e) => {
              var delta = e.deltaY || e.detail || e.wheelDelta;

              e.currentTarget.scrollLeft -= delta < 0 ? -30 : 30;
              e.preventDefault();
            }}
          >
            <p className="text-green text-2xl font-semibold mb-2 mt-4">
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

          {/* Stocks */}
          <div className="w-1/4">
            <Searchbar
              selectItem={selectItem}
              getSearchResults={getSearchResults}
              searchResults={searchResults}
              resetSearch={resetSearch}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStandardPage;
