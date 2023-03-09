import React, { useEffect, useState, useRef } from "react";
import JobModal from "./Modals/JobModal";
import DeleteInvestorModal from "./Modals/DeleteInvestorModal";
import { BsThreeDots } from "react-icons/bs";

const InvestorDropdown = ({
  startJob,
  viewInvestor,
  deleteInvestor,
  investor,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedModal, setSelectedModal] = useState(null);

  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        // Close the dropdown and hide the current modal
        setShowDropdown(false);
        setSelectedModal(null);
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
        onClick={(e) => {
          e.stopPropagation();
          setShowDropdown(true);
        }}
      >
        <BsThreeDots className="text-2xl text-cokewhite hover:text-green" />
      </button>
      {selectedModal === "job" && (
        <JobModal
          setJobModal={setSelectedModal}
          jobModal={!!setSelectedModal}
          investor={investor}
        />
      )}
      {selectedModal === "delete" && (
        <DeleteInvestorModal
          setDeleteInvestorModal={setSelectedModal}
          deleteInvestorModal={!!setSelectedModal}
          investor={investor}
        />
      )}
      {showDropdown && (
        <div className="absolute right-0 w-40 shadow-lg bg-cokewhite">
          <button
            className="block px-4 py-2 text-left w-full text-green hover:bg-smokewhite border-b border-light-gray"
            onClick={() => {
              startJob();
              setShowDropdown(false);
              setSelectedModal("job");
            }}
          >
            Start Job
          </button>
          <button
            className="block px-4 py-2 text-left w-full text-green hover:bg-smokewhite border-b border-light-gray"
            onClick={() => {
              viewInvestor(investor);
              setShowDropdown(false);
              setSelectedModal(null);
            }}
          >
            View Investor
          </button>
          <button className="block px-4 py-2 text-left w-full text-green hover:bg-smokewhite border-b border-light-gray">
            Start a Backtest
          </button>
          <button
            className="block px-4 py-2 text-left w-full text-red hover:bg-smokewhite font-bold"
            onClick={() => {
              deleteInvestor();
              setShowDropdown(false);
              setSelectedModal("delete");
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
