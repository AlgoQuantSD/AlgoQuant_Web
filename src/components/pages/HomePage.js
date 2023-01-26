import { React } from "react";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";
// import { useAuthenticator } from "@aws-amplify/ui-react";

const HomePage = () => {
  // const { user } = useAuthenticator((context) => [context.user]);

  return (
    <div className="flex bg-dark-gray overflow-x-scroll">
      <Navbar />
      <div className="container mx-auto flex bg-dark-gray">
        <Sidebar />
        <div className="sm:w-3/4 md:w-5/6 lg:w-7/8 bg-dark-gray pl-5">
          <div className="flex pt-24">
            <h1 className="text-green font-bold text-5xl">Home</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
