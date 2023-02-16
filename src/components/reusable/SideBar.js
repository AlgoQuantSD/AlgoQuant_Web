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
    <div className="flex-none w-50 bg-cokewhite h-screen pl-5 pr-5 shadow">
      <ul className="list-none mt-20">
        <li>
          <p className="text-green font-light">PAGES</p>
        </li>
        <li>
          <Link
            to="/home"
            className="flex mt-3 pt-3 pb-3 pr-3 bg-cokewhite hover:bg-smokewhite"
          >
            <FaHome className="text-2xl inline mr-3 mb-1 ml-2 text-green" />
            <p className="text-l inline text-green">Home</p>
          </Link>
        </li>
        <li>
          <Link
            to="/createInvestor"
            className="flex mt-3 pt-3 pb-3 pr-3 bg-cokewhite hover:bg-smokewhite"
          >
            <FaBrain className="text-2xl inline mr-3 mb-1 ml-2 text-green" />
            <p className="text-l inline text-green">Create Investor</p>
          </Link>
        </li>
        <li>
          <Link
            to="/backtesting"
            className="flex mt-3 pt-3 pb-3 pr-3 bg-cokewhite hover:bg-smokewhite"
          >
            <FaClipboardList className="text-2xl inline mr-3 mb-1 ml-2 text-green" />
            <p className="text-l inline text-green">Back Testing</p>
          </Link>
        </li>
        <li>
          <Link
            to="/history"
            className="flex mt-3 pt-3 pb-3 pr-3 bg-cokewhite hover:bg-smokewhite"
          >
            <FaMoneyBill className="text-2xl inline mr-3 mb-1 ml-2 text-green" />
            <p className="text-l inline text-green">Transaction History</p>
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className="flex mt-3 pt-3 pb-3 pr-3 bg-cokewhite hover:bg-smokewhite"
          >
            <FaCog className="text-2xl inline mr-3 mb-1 ml-2 text-green" />
            <p className="text-l inline text-green">My Profile</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
