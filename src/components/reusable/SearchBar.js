import {
  React,
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import { FaSearch } from "react-icons/fa";
import AlgoquantApiContext from "../../api/ApiContext";
import { useNavigate } from "react-router-dom";

/*
Reusable search component that takes a call back function defining what should be done when a search is done. Additionally,
this takes in a callback function that will get new search results based on what has been entered
*/
const Searchbar = () => {
  // This flag controls rather the drop down will show
  const [showResults, setShowResults] = useState(false);

  // The current search value entered
  const [searchValue, setSearchValue] = useState("");

  // Which item in the drop down the user has selected
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);

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
      setIsLoading(true);
      algoquantApi
        .searchStock(value)
        .then((resp) => {
          setIsLoading(false);
          setSearchResults(resp.data["stock-tickers"]);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    }
    return searchResults;
  };

  const resetSearch = useCallback(() => {
    setSearchResults([]);
  }, [setSearchResults]);

  // Handles traversing and choosing dropdown options
  const handleKey = (event) => {
    if (event.key === "Enter") {
      if (highlightedIndex >= 0) {
        handleSelect(searchResults[highlightedIndex]);
      }
    }
    // Action for when a user hits the up arrow, will decrease the highlighted index
    if (event.key === "ArrowUp" && highlightedIndex > 0) {
      // Ensure page is not re-rendered
      event.preventDefault();
      setHighlightedIndex(highlightedIndex - 1);
    }
    // Action for when a user hits the down arrow, will increase the highlighted index
    if (
      event.key === "ArrowDown" &&
      highlightedIndex < searchResults.length - 1
    ) {
      // Ensure page is not re-rendered
      event.preventDefault();
      setHighlightedIndex(highlightedIndex + 1);
    }
  };

  // Keyboard input in search box
  const handleTextChange = (event) => {
    closeDropdown();
    setSearchValue(event.target.value);

    // Ensure page is not re-rendered
    event.preventDefault();
    // When a user hits enter new search results should be added to the list
    getSearchResults(event.target.value);
    setShowResults(true);
  };

  // Handles selecting an item from the dropdown
  const handleSelect = (item) => {
    // Call the select item callback and close the dropdown
    selectItem(item);
    closeDropdown();
  };

  /* 
  Called anytime the drop down needs to be closed
  Will hid the results, restore highlighted index, and set the search string to empty
  Will clear the last search results to an empty array
  */
  const closeDropdown = useCallback(() => {
    setShowResults(false);
    setHighlightedIndex(-1);
    setSearchValue("");
    resetSearch();
  }, [setShowResults, setHighlightedIndex, setSearchValue, resetSearch]);

  // Close search upon clicking anywhere outside of the component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        // Close the dropdown
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeDropdown, searchRef]);

  return (
    <div ref={searchRef} className="relative">
      <div className="flex border border-green rounded-sm">
        <button className="px-4 bg-cokewhite rounded-md">
          <FaSearch className="text-green" />
        </button>
        <input
          className="bg-cokewhite px-4 py-2 w-64 rounded-md text-green focus:outline-none"
          type="text"
          placeholder="Search for stocks"
          onChange={handleTextChange}
          onKeyDown={handleKey}
          value={searchValue}
        />
      </div>
      {isLoading ? (
        <div className="absolute bg-smokewhite rounded-sm shadow-lg text-green w-full">
          <p
            className={`px-4 py-2 hover:bg-light-gray 
                 "bg-another-gray border-l border-light-gray"
        `}
          >
            Searching...
          </p>
        </div>
      ) : (
        <></>
      )}
      {showResults && searchValue.length > 0 && (
        <div className="absolute bg-smokewhite rounded-sm shadow-lg text-green w-full">
          {searchResults.map((result, index) => (
            <p
              className={`px-4 py-2 hover:bg-light-gray cursor-pointer ${
                highlightedIndex === index
                  ? "bg-another-gray border-l border-light-gray"
                  : ""
              }`}
              key={result}
              onClick={() => handleSelect(result)}
              onKeyDown={() => handleKey(result)}
              tabIndex="0"
            >
              {result}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
