import { React, useContext } from "react";
import Navbar from "../NavBar";
import Sidebar from "../SideBar";
import {
  useAuthenticator,
} from "@aws-amplify/ui-react";

const ProfilePage = () => {

  const { user } = useAuthenticator((context) => [context.user]);

  return (
    <div className="w-full h-screen bg-dark-gray">
      <Navbar />
      <Sidebar />
      <h1 className="font-semibold text-5xl text-white text-center pt-32">
        Profile Page
      </h1>
      <p className="text-white text-center">
        {user?.attributes?.given_name +
          " " +
          user?.attributes?.family_name}
      </p>
    </div>
  );
};

export default ProfilePage;
