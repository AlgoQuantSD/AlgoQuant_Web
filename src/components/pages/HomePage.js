import { React, useContext, useState, useEffect } from "react";
import Navbar from "../NavBar";
import Sidebar from "../SideBar";
import { UserContext } from "../../constants/UserContext";

const HomePage = () => {
  const { userInfo } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  // Reload the component when the user info is fetched
  useEffect(() => {
    console.log("User info updated");
    setLoading(false);
  }, [userInfo]);

  if (loading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  return (
    <div className="w-gull h-screen bg-dark-gray">
      <Navbar />
      <Sidebar />
      <h1 className="font-semibold text-5xl text-white text-center pt-32">
        HomePage
      </h1>
      <p className="text-white text-center">
        {userInfo?.attributes?.given_name +
          " " +
          userInfo?.attributes?.family_name}
      </p>
    </div>
  );
};

export default HomePage;
