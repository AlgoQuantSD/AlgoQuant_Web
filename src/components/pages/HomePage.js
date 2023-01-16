import { React } from "react";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";

const HomePage = () => {
  const { user } = useAuthenticator((context) => [context.user]);

  return (
    <div className="w-full h-screen bg-dark-gray">
      <Navbar />
      <Sidebar />
      <h1 className="font-semibold text-5xl text-white text-center pt-32">
        HomePage{" "}
      </h1>
      <p className="text-white text-center">
        Welcome {user?.attributes?.given_name}
      </p>
    </div>
  );
};

export default HomePage;
