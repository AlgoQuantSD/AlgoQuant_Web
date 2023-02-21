import React, { useEffect, useState, useRef } from "react";
import JobModal from "./Modals/JobModal";
import { BsThreeDots } from "react-icons/bs";

const InvestorDropdown = ({ viewInvestor, deleteInvestor, investor }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [jobModal, setJobModal] = useState(null);

  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        // Close the dropdown and hide the current modal
        setShowDropdown(false);
        setJobModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  return (
    <div className="relative" ref={searchRef}>
      <button
        className="flex p-1 rounded-full hover:bg-smokewhite"
        onClick={() => setShowDropdown(true)}
      >
        <BsThreeDots className="text-2xl text-cokewhite hover:text-green" />
      </button>
      {jobModal === true && (
        <JobModal setJobModal={setJobModal} investor={investor} />
      )}
      {showDropdown && (
        <div className="absolute right-0 w-40 shadow-lg bg-cokewhite">
          <button
            className="block px-4 py-2 text-left w-full text-green hover:bg-smokewhite border-b border-light-gray"
            onClick={() => {
              setShowDropdown(false);
              setJobModal(true);
            }}
          >
            Start Job
          </button>
          <button
            className="block px-4 py-2 text-left w-full text-green hover:bg-smokewhite border-b border-light-gray"
            onClick={() => {
              viewInvestor();
              setShowDropdown(false);
              setJobModal(false);
            }}
          >
            View Investor
          </button>

          <button
            className="block px-4 py-2 text-left w-full text-red hover:bg-smokewhite font-bold"
            onClick={() => {
              deleteInvestor();
              setShowDropdown(false);
              setJobModal(false);
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default InvestorDropdown;
