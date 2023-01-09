import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="absolute bg-dark-gray w-64 h-screen left-7 shadow-md pr-7">
      <ul className="list-none p-0 mt-28">
        <li>
          <p className="text-light-gray font-light">PAGES</p>
        </li>
        <li className="py-2 mt-4 pt-6 bg-darker-gray">
          <Link
            to="/home"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
          >
            Home
          </Link>
        </li>
        <li className="py-2 mt-4 pt-6 bg-darker-gray">
          <Link
            to="/createInvestor"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
          >
            Create Investor
          </Link>
        </li>
        <li className="py-2 mt-4 pt-6 bg-darker-gray">
          <Link
            to="/backtesting"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
          >
            Back Testing
          </Link>
        </li>
        <li className="py-2 mt-4 pt-6 bg-darker-gray">
          <Link
            to="/history"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
          >
            Transaction History
          </Link>
        </li>
        <li className="py-2 mt-4 pt-6 bg-darker-gray">
          <Link
            to="/profile"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
          >
            My Profile
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
