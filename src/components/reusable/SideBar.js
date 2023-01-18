import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaBrain,
  FaClipboardList,
  FaMoneyBill,
  FaCog,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="absolute bg-dark-gray w-64 h-screen pl-5 shadow-md pr-5">
      <ul className="list-none p-0 mt-28">
        <li>
          <p className="text-light-gray font-light">PAGES</p>
        </li>
        <li>
          <Link to="/home" className="block py-3 mt-4 pt-3 bg-darker-gray">
            <FaHome className="text-2xl inline mr-3 mb-1 ml-2 text-light-gray" />
            <p className="text-l inline text-light-gray">Home</p>
          </Link>
        </li>
        <li>
          <Link
            to="/createInvestor"
            className="block py-3 mt-4 pt-3 bg-darker-gray"
          >
            <FaBrain className="text-2xl inline mr-3 mb-1 ml-2 text-light-gray" />
            <p className="text-l inline text-light-gray">Create Investor</p>
          </Link>
        </li>
        <li>
          <Link
            to="/backtesting"
            className="block py-3 mt-4 pt-3 bg-darker-gray"
          >
            <FaClipboardList className="text-2xl inline mr-3 mb-1 ml-2 text-light-gray" />
            <p className="text-l inline text-light-gray">Back Testing</p>
          </Link>
        </li>
        <li>
          <Link to="/history" className="block py-3 mt-4 pt-3 bg-darker-gray">
            <FaMoneyBill className="text-2xl inline mr-3 mb-1 ml-2 text-light-gray" />
            <p className="text-l inline text-light-gray">Transaction History</p>
          </Link>
        </li>
        <li>
          <Link to="/profile" className="block py-3 mt-4 pt-3 bg-darker-gray">
            <FaCog className="text-2xl inline mr-3 mb-1 ml-2 text-light-gray" />
            <p className="text-l inline text-light-gray">My Profile</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
