import React from "react";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";
import { useLocation } from "react-router-dom";

const SearchResultsPage = () => {
  const location = useLocation();

  return (
    <div className="bg-dark-gray overflow-x-auto overflow-y-auto">
      <Navbar />
      <div className="flex self-stretch">
        <Sidebar />
        <div className="sm:w-3/4 md:w-5/6 lg:w-7/8 pl-5">
          <div className="flex pt-24">
            <h1 className="text-green font-bold text-5xl">
              {location.state.value}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
