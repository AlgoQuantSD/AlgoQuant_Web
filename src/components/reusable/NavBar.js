import { React, useContext, useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Link, useNavigate } from "react-router-dom";
import aqLogo from "../../assets/images/aq-logo.png";
import Searchbar from "./SearchBar";
import AlgoquantApiContext from "../../api/ApiContext";

const Navbar = () => {
  const [searchResults, setSearchResults] = useState(["No search yet"]);
  const { signOut } = useAuthenticator((context) => [context.user]);
  const navigate = useNavigate();
  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);

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
    // Big nav div
    <nav className="flex top-0 bg-cokewhite border-gray-300 shadow-sm">
      {/* div for logo */}
      <div className="flex flex-1 items-center bg-cokewhite">
        <Link to="/">
          <img src={aqLogo} className="ml-3 h-10" alt="AlgoQuant Logo" />
        </Link>
      </div>
      {/* div for search */}
      <div className="flex items-center">
        <Searchbar
          selectItem={selectItem}
          getSearchResults={getSearchResults}
          searchResults={searchResults}
          resetSearch={resetSearch}
        />
      </div>
      {/* div for my profile button */}
      <div className="flex-1 flex justify-end bg-cokewhite">
        <ul className="flex flex-row p-4">
          <li>
            <Link
              to="/profile"
              className="flex mx-auto py-2 px-5 text-cokewhite rounded-full bg-green hover:bg-gray-100"
            >
              My Profile
            </Link>
          </li>
          <li>
            <button
              className="flex mx-auto py-2 px-5 text-red rounded"
              onClick={signOut}
            >
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
