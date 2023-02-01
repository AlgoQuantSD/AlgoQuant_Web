import { React, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Searchbar = () => {
  const [showResults, setShowResults] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dummyData = ["AAPL", "GOOGL", "AMZN", "TSLA", "MSFT"];
  const searchRef = useRef(null);

  // Handles traversing and choosing dropdown options
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setSearchValue(searchResults[highlightedIndex]);
      setShowResults(false);
    }
    if (event.key === "ArrowUp" && highlightedIndex > 0) {
      event.preventDefault();
      setHighlightedIndex(highlightedIndex - 1);
    }
    if (
      event.key === "ArrowDown" &&
      highlightedIndex < searchResults.length - 1
    ) {
      event.preventDefault();
      setHighlightedIndex(highlightedIndex + 1);
    }
  };

  // Keyboard input in search box
  const handleChange = (event) => {
    event.preventDefault();
    setSearchValue(event.target.value);
    setShowResults(true);
  };

  // Handles clicking on dropdown options
  const handleClick = (value) => {
    setSearchValue(value);
    setShowResults(false);
  };

  const searchResults = dummyData.filter((d) =>
    d.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Close search upon clicking anywhere outside of the component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  return (
    <div ref={searchRef} className="relative">
      <div className="flex border border-another-gray rounded-sm">
        <input
          className="bg-dark-gray px-4 py-2 w-64 rounded-md text-white focus:outline-none"
          type="text"
          placeholder="Search for stocks"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={searchValue}
        />
        <Link to={`/search/${searchValue}`}>
          <button className="px-4 bg-dark-gray rounded-md">
            <FaSearch className="text-white" />
          </button>
        </Link>
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
              onClick={() => handleClick(result)}
              onKeyDown={(e) => handleKeyDown(result)}
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
