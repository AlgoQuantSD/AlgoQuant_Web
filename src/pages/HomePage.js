import React from "react";
import Navbar from "./NavBar";
import Sidebar from "./SideBar";

const HomePage = () => {
  return (
    <div className="w-gull h-screen bg-dark-gray">
      <Navbar />
      <Sidebar />
      <h1 className="font-semibold text-5xl text-white text-center pt-32">
        HomePage
      </h1>
      {/* <button className="self-center pt-2 px-4 py-2 bg-green text-white rounded items-center justify-center">
        Create an Investor
      </button> */}
    </div>
  );
};

export default HomePage;
