import React from "react";
import { FaSearch } from "react-icons/fa";

const Searchbar = () => {
  return (
    <div className="relative flex">
      <input
        className="bg-another-gray py-2 px-7 text-white font-medium focus:outline-none"
        type="text"
        placeholder="Search for stocks"
      />
      <button className="absolute right-0 py-2 px-4">
        <FaSearch className="text-xl inline text-light-gray" />
      </button>
    </div>
  );
};

export default Searchbar;
