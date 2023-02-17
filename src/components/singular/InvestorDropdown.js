import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";

const InvestorDropdown = ({ startJob, viewInvestor }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex p-1 rounded-full hover:bg-smokewhite"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <BsThreeDots className="text-2xl text-cokewhite hover:text-green" />
      </button>
      {showDropdown && (
        <div className="absolute right-0 w-40 shadow-lg bg-cokewhite">
          <button
            className="block px-4 py-2 text-left w-full text-green hover:bg-smokewhite border-b border-light-gray"
            onClick={startJob}
          >
            Start Job
          </button>
          <button
            className="block px-4 py-2 text-left w-full text-green hover:bg-smokewhite border-b border-light-gray"
            onClick={viewInvestor}
          >
            View Investor
          </button>
          <button
            className="block px-4 py-2 text-left w-full text-red hover:bg-smokewhite font-bold"
            onClick={viewInvestor}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default InvestorDropdown;
