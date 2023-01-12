import { React, useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";
import { FaArrowRight } from "react-icons/fa";

const ProfilePage = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const [showModal, setShowModal] = useState(false);

  const handleNameChange = (event) => {
    // setName(event.target.value);
  };

  const handlePasswordChange = () => {
    setShowModal(true);
  };

  return (
    <div className="w-full h-screen bg-dark-gray">
      <Navbar />
      <Sidebar />
      <div className="flex justify-center items-center">
        <div className="w-7/12">
          <div className="ml-3 flex">
            <h1 className="text-green font-bold text-5xl pt-24">My Account</h1>
            <button className="text-white font-medium rounded-lg bg-another-gray px-6 mt-24 ml-auto">
              Reset Balance
            </button>
          </div>
          <div className="my-6 rounded-full w-32 h-32 bg-faded-dark-gray flex justify-center items-center inset-0">
            <p className="text-white text-center font-light text-6xl flex">
              {user?.attributes?.given_name?.charAt(0)}
              {user?.attributes?.family_name?.charAt(0)}
            </p>
          </div>
          <ul className="grid gap-8 grid-cols-2 mt-6">
            <li>
              <p className="text-white font-semibold">First name</p>
            </li>
            <li>
              <input
                className="bg-faded-dark-gray focus:outline-none focus:shadow-outline py-2 px-4 block w-full appearance-none leading-normal shadow-md caret-white text-white"
                type="text"
                placeholder={user?.attributes?.given_name}
                onChange={handleNameChange}
              />
            </li>
            <li>
              <p className="text-white font-semibold">Last name</p>
            </li>
            <li>
              <input
                className="bg-faded-dark-gray focus:outline-none focus:shadow-outline py-2 px-4 block w-full appearance-none leading-normal shadow-md caret-white text-white"
                type="text"
                placeholder={user?.attributes?.family_name}
                onChange={handleNameChange}
              />
            </li>
            <li>
              <p className="text-white font-semibold">Email Address</p>
            </li>
            <li>
              <input
                className="bg-faded-dark-gray focus:outline-none focus:shadow-outline py-2 px-4 block w-full appearance-none leading-normal shadow-md caret-white text-white"
                type="text"
                placeholder={user?.attributes?.email}
                onChange={handleNameChange}
              />
            </li>
            <li>
              <p className="text-white font-semibold">Phone Number</p>
            </li>
            <li>
              <input
                className="bg-faded-dark-gray focus:outline-none focus:shadow-outline py-2 px-4 block w-full appearance-none leading-normal shadow-md caret-white text-white"
                type="text"
                placeholder={user?.attributes?.phone_number}
                onChange={handleNameChange}
              />
            </li>
            <div className="grid grid-cols-1 gap-6 mt-7">
              <li>
                <button
                  className="text-white font-semibold underline"
                  onClick={handlePasswordChange}
                >
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
                  Delete Account
                </button>
                <FaArrowRight className="inline mb-1 ml-1 text-red" />
              </li>
            </div>
          </ul>
          <button className="text-white font-medium rounded-lg bg-green py-2 px-6 mt-24 ml-auto">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
