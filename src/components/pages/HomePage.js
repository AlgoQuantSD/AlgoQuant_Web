import { React, useContext, useEffect } from "react";
import Navbar from "../NavBar";
import Sidebar from "../SideBar";
import { UserContext } from "../../constants/UserContext";

const HomePage = () => {
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    console.log("User info updated");
  }, [userInfo]);

  return (
    <div className="w-full h-screen bg-dark-gray">
      <Navbar />
      <Sidebar />
      <h1 className="font-semibold text-5xl text-white text-center pt-32">
        HomePage
      </h1>
      <p className="text-white text-center">
        {JSON.stringify(userInfo?.attributes?.given_name)}
      </p>
    </div>
  );
};

export default HomePage;
