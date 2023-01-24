import { React } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { FaArrowRight } from "react-icons/fa";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";

const ProfilePage = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const { signOut } = useAuthenticator((context) => [context.user]);

  return (
    // Main Div Container 
    <div className="bg-dark-gray  overflow-x-scroll">
      <Navbar />  
      {/* Main Div for the side bar and all the page content */}
      <div className="flex self-stretch">
      <Sidebar />
      {/* Div for all the profile content */}
      <div className="w-full h-full p-5 ">
          <div className="flex ml-3 mt-24">
            <h1 className="text-green font-bold text-5xl mr-5">My Account</h1>
            <button className="text-white font-medium rounded-lg bg-another-gray p-3 ml-auto">
              Reset balance
            </button>
          </div>
        {/* Profile "Picture" ,Name, and Buying Power */}
        <div className="m-10">
          <div className="rounded-full w-32 h-32 bg-faded-dark-gray flex justify-center items-center mx-auto">
            <p
              className="text-white text-center font-light text-6xl flex"
              data-testid="user-initials"
            >
              {user?.attributes?.given_name?.charAt(0)}
              {user?.attributes?.family_name?.charAt(0)}
            </p>
          </div>
            <p
              className="text-center text-white font-thin text-md"
              data-testid="user-name"
            >
              {user?.attributes?.given_name +
                " " +
                user?.attributes?.family_name}
            </p>
            <p className="text-2xl font-light text-center text-white mt-3">
              Buying Power
            </p>
            <p
              className="text-2xl font-bold text-center text-white"
              data-testid="total-balance"
            >
              $57,901.34
            </p>
        </div>
          <ul className="grid gap-8 grid-cols-1 mt-10">
            <li className="flex">
              <p className="text-white font-semibold inline pt-2 w-1/6">
                First name
              </p>
              <input
                className="bg-faded-dark-gray focus:outline-none focus:shadow-outline ml-20 py-2 px-4 block w-1/3 appearance-none leading-normal shadow-md caret-white text-white"
                type="text"
                placeholder={user?.attributes?.given_name}
              />
            </li>
            <li className="flex">
              <p className="text-white font-semibold inline py-2 w-1/6">
                Last name
              </p>
              <input
                className="bg-faded-dark-gray focus:outline-none focus:shadow-outline ml-20 py-2 px-4 block w-1/3 appearance-none leading-normal shadow-md caret-white text-white"
                type="text"
                placeholder={user?.attributes?.family_name}
              />
            </li>
            <li className="flex">
              <p className="text-white font-semibold inline py-2 w-1/6">
                Email Address
              </p>
              <input
                className="bg-faded-dark-gray focus:outline-none focus:shadow-outline ml-20 py-2 px-4 block w-1/3 appearance-none leading-normal shadow-md caret-white text-white"
                type="text"
                placeholder={user?.attributes?.email}
              />
            </li>
            <li className="flex">
              <p className="text-white font-semibold inline py-2 w-1/6">
                Phone Number
              </p>
              <input
                className="bg-faded-dark-gray focus:outline-none focus:shadow-outline ml-20 py-2 px-4 block w-1/3 appearance-none leading-normal shadow-md caret-white text-white"
                type="text"
                placeholder={user?.attributes?.phone_number}
              />
            </li>
            <li>
              <ul className="grid grid-cols-1 gap-6 mt-5">
                <li>
                  <button className="text-white font-semibold underline">
                    Change password
                  </button>
                  <FaArrowRight className="inline mb-1 ml-1 text-white" />
                </li>
                <li>
                  <button className="text-white font-semibold underline">
                    Update Alpaca Key
                  </button>
                  <FaArrowRight className="inline mb-1 ml-1 text-white" />
                </li>
                <li>
                  <button className="text-red font-semibold underline">
                    Delete account
                  </button>
                  <FaArrowRight className="inline mb-1 ml-1 text-red" />
                </li>
              </ul>
            </li>
           {/* Div for Save Changes and Signout Button*/}
            <div className = "flex">
              <button className="text-white font-medium rounded-lg bg-green p-4">
                Save changes
              </button>
              <button
                className="text-white font-medium rounded-lg bg-red ml-auto p-4"
                onClick={signOut}
              >
                Sign out
              </button>
              </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
