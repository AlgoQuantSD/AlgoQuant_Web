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
    <div className="flex-none w-50 bg-dark-gray h-screen pl-5 pr-5 mt-10">
      <ul className="list-none mt-20">
        <li>
          <p className="text-light-gray font-light">PAGES</p>
        </li>
        <li>
          <Link to="/home" className="flex mt-3 pt-3 pb-3 pr-3 bg-darker-gray">
            <FaHome className="text-2xl inline mr-3 mb-1 ml-2 text-light-gray" />
            <p className="text-l inline text-light-gray">Home</p>
          </Link>
        </li>
        <li>
          <Link
            to="/createInvestor"
            className="flex mt-3 pt-3 pb-3 pr-3 bg-darker-gray"
          >
            <FaBrain className="text-2xl inline mr-3 mb-1 ml-2 text-light-gray" />
            <p className="text-l inline text-light-gray">Create Investor</p>
          </Link>
        </li>
        <li>
          <Link
            to="/backtesting"
            className="flex mt-3 pt-3 pb-3 pr-3 bg-darker-gray"
          >
            <FaClipboardList className="text-2xl inline mr-3 mb-1 ml-2 text-light-gray" />
            <p className="text-l inline text-light-gray">Back Testing</p>
          </Link>
        </li>
        <li>
          <Link to="/history" className="flex mt-3 pt-3 pb-3 pr-3 bg-darker-gray">
            <FaMoneyBill className="text-2xl inline mr-3 mb-1 ml-2 text-light-gray" />
            <p className="text-l inline text-light-gray">Transaction History</p>
          </Link>
        </li>
        <li>
          <Link to="/profile" className="flex mt-3 pt-3 pb-3 pr-3 bg-darker-gray">
            <FaCog className="text-2xl inline mr-3 mb-1 ml-2 text-light-gray" />
            <p className="text-l inline text-light-gray">My Profile</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
