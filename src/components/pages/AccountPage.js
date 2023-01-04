import { React, useContext } from "react";
import Navbar from "../NavBar";
import Sidebar from "../SideBar";
import { UserContext } from "../../constants/UserContext";

const AccountPage = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);

  return (
    <div className="w-full h-screen bg-dark-gray">
      <Navbar />
      <Sidebar />
      <h1 className="font-semibold text-5xl text-white text-center pt-32">
        Account Page
      </h1>
      <p className="text-white text-center">
        {userInfo?.attributes?.given_name +
          " " +
          userInfo?.attributes?.family_name}
      </p>
    </div>
  );
};

export default AccountPage;
