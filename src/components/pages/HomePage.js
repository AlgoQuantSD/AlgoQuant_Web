import { React, useContext, useEffect } from "react";
import Navbar from "../NavBar";
import Sidebar from "../SideBar";
import { UserContext } from "../../constants/UserContext";

const HomePage = () => {

  return (
    <div className="w-full h-screen bg-dark-gray">
      <Navbar />
      <Sidebar />
      <h1 className="font-semibold text-5xl text-white text-center pt-32">
        HomePage
      </h1>
      <p className="text-white text-center">
      </p>
    </div>
  );
};

export default HomePage;
