import { React, useState, useEffect, useRef, useCallback } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

/*
Reusable search component that takes a call back function defining what should be done when a search is done. Additionally,
this takes in a callback function that will get new search results based on what has been entered
*/
const StockSelect = ({
  getSearchResults,
  searchResults,
  resetSearch,
  onOptionsSelect,
  isLoading,
}) => {
  // This flag controls rather the drop down will show
  const [showResults, setShowResults] = useState(false);

  // The current search value entered
  const [searchValue, setSearchValue] = useState("");

  // Which item in the drop down the user has selected
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  // The selected items from the drop down
  const [selectedItems, setSelectedItems] = useState([]);

  const searchRef = useRef(null);

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

  function generateUniqueId() {
    const alphabet =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for (let i = 0; i < 8; i++) {
      id += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    return id;
  }

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
    if (!selectedItems.includes(item)) {
      setSelectedItems((prevSelectedItems) => {
        const updatedSelectedItems = [...prevSelectedItems, item];
        onOptionsSelect(updatedSelectedItems);
        return updatedSelectedItems;
      });
    }
  };

  /* 
  Called anytime the drop down needs to be closed
  Will hid the results, restore highlighted index, and set the search string to empty
  Will clear the last search results to an empty array
  */
  const closeDropdown = useCallback(() => {
    setShowResults(false);
    setSearchValue("");
    setHighlightedIndex(-1);
    resetSearch([]);
  }, [resetSearch]);

  // Reset search results and search value
  const handleReset = useCallback(() => {
    setSelectedItems([]);
    setSearchValue("");
    setHighlightedIndex(-1);
    resetSearch([]);
    onOptionsSelect([]);
  }, [resetSearch, onOptionsSelect]);

  const handleRemove = (selectedTicker) => {
    const updatedTickers = selectedItems.filter(
      (ticker) => ticker !== selectedTicker
    );
    setSelectedItems(updatedTickers);
    onOptionsSelect(updatedTickers);
  };

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
    <div ref={searchRef}>
      <div className="flex border border-green rounded-sm">
        <button className="px-4 bg-cokewhite rounded-l-md">
          <FaSearch className="text-green" />
        </button>
        <input
          className="bg-cokewhite px-4 py-2 rounded-md w-full text-green focus:outline-none"
          type="text"
          placeholder="Search for stocks"
          onChange={handleTextChange}
          onKeyDown={handleKey}
          value={searchValue}
        />
        <div className="flex flex-grow justify-end">
          <button
            className="flex bg-cokewhite px-4 py-2 text-green font-bold"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>

      {/* conditionally render selected item text */}
      {selectedItems.length > 0 && (
        <div className="flex flex-wrap py-2">
          {selectedItems.map((item) => (
            <div
              key={generateUniqueId()}
              className="bg-cokewhite m-1 p-2 rounded-lg flex items-center justify-between"
            >
              <p className="text-green mr-2">{item}</p>
              <button onClick={() => handleRemove(item)}>
                <FaTimes className="text-red" />
              </button>
            </div>
          ))}
        </div>
      )}
      {showResults &&
        searchValue.length > 0 &&
        // only render dropdown if an item hasn't been selected
        !selectedItems.includes(searchValue) && (
          <div className="absolute bg-smokewhite rounded-sm shadow-lg text-green w-1/4 z-50">
            {searchResults.slice(0, 7).map((result, index) => (
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
      {isLoading ? (
        <div className="absolute bg-smokewhite rounded-sm shadow-lg text-green w-1/4 z-50">
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
    </div>
  );
};

export default StockSelect;
