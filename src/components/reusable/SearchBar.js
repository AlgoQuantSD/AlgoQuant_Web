import { React, useState, useEffect, useRef, useCallback } from "react";
import { FaSearch } from "react-icons/fa";

/*
Reusable search component that takes a call back function defining what should be done when a search is done. Additionally,
this takes in a callback function that will get new search results based on what has been entered
*/
const Searchbar = ({
  selectItem,
  getSearchResults,
  searchResults,
  resetSearch,
}) => {
  // This flag controls rather the drop down will show
  const [showResults, setShowResults] = useState(false);

  // The current search value entered
  const [searchValue, setSearchValue] = useState("");

  // Which item in the drop down the user has selected
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const searchRef = useRef(null);

  // Handles traversing and choosing dropdown options
  const handleKey = (event) => {
    if (event.key === "Enter") {
      handleSelect(searchResults[highlightedIndex]);
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

    // If an index has been highlighted, should navigate on enter
    if (highlightedIndex >= 0) {
      handleSelect(searchResults[highlightedIndex]);
    } else {
      // Ensure page is not re-rendered
      event.preventDefault();
      // When a user hits enter new search results should be added to the list
      getSearchResults(event.target.value);
      setShowResults(true);
    }
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
      <div className="flex border border-another-gray rounded-sm">
        <button className="px-4 bg-dark-gray rounded-md">
          <FaSearch className="text-white" />
        </button>
        <input
          className="bg-dark-gray px-4 py-2 w-64 rounded-md text-white focus:outline-none"
          type="text"
          placeholder="Search for stocks"
          onChange={handleTextChange}
          onKeyDown={handleKey}
          value={searchValue}
        />
      </div>
      {showResults && searchValue.length > 0 && (
        <div className="absolute bg-darker-gray rounded-sm shadow-lg text-white w-full">
          {searchResults.map((result, index) => (
            <p
              className={`px-4 py-2 hover:bg-another-gray cursor-pointer ${
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
