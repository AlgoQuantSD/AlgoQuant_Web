import { React } from "react";
import Searchbar from "./SearchBar";
import aqLogo from "../../assets/images/aq-logo.png";
import { Link } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { signOut } = useAuthenticator((context) => [context.user]);
  const navigate = useNavigate();

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
    // TODO: this needs to make an API request to the search endpoitn and return a list in the same format
    console.log(value);
    return ["AAPL", "GOOGL", "AMZN", "TSLA", "MSFT"];
  };

  return (
    // Big nav div
    <nav className="flex top-0 bg-dark-gray border-gray-300 shadow-sm">
      {/* div for logo */}
      <div className="flex flex-1 justify-between items-center bg-dark-gray">
        <Link to="/">
          <img src={aqLogo} className="ml-3 h-10" alt="AlgoQuant Logo" />
        </Link>
      </div>
      {/* div for search */}
      <div className="flex items-center">
        <Searchbar
          selectItem={selectItem}
          getSearchResults={getSearchResults}
        />
      </div>
      {/* div for my profile button */}
      <div className="flex-1 flex justify-end bg-dark-gray">
        <ul className="flex flex-row p-4">
          <li>
            <Link
              to="/profile"
              className="flex py-2 pr-4 pl-3 text-green rounded hover:bg-gray-100"
            >
              My Profile
            </Link>
          </li>
          <li>
            <button
              className="flex py-2 pr-4 pl-3 text-red rounded hover:bg-gray-100 "
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
