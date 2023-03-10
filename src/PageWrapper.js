import React from "react";
import Navbar from "./reusable/NavBar";
import Sidebar from "/reusable/SideBar";

const PageWrapper = () => {
  return (
    <div className="bg-cokewhite overflow-x-auto overflow-y-auto">
      <Navbar />
      <div className="flex self-stretch">
        <Sidebar />
        <div className="sm:w-3/4 md:w-5/6 lg:w-7/8 p-5"></div>
      </div>
    </div>
  );
};

export default PageWrapper;
