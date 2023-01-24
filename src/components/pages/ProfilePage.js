import { React, useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { FaArrowRight } from "react-icons/fa";

import {
  updateEmail,
  updateGivenName,
  updateFamilyName,
  updatePhone,
} from "../authentication/AuthUtils";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";
import EmailModal from "../singular/Modals/EmailModal";
import PhoneModal from "../singular/Modals/PhoneModal";
import PasswordModal from "../singular/Modals/PasswordModal";
import AlpacaModal from "../singular/Modals/AlpacaModal";
import DeleteModal from "../singular/Modals/DeleteModal";

const ProfilePage = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  // All the modal states none should be shown at first
  const [passwordModal, setPasswordModal] = useState(false);
  const [alpacaModal, setAlpacaModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [resetModal, setResetModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [phoneModal, setPhoneModal] = useState(false);

  // The attributes that will be updated by the modal
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);

  // Utility method to clear the state of each attribute
  const clearState = () => {
    setFirstName(null);
    setLastName(null);
    setPhone(null);
    setEmail(null);
  };

  /*
  All the event handlers will be used to update the various user fields
  */
  const handleFirstName = (event) => {
    setFirstName({ value: event.target.value });
  };

  const handleLastName = (event) => {
    setLastName({ value: event.target.value });
  };

  const handleEmail = (event) => {
    setEmail({ value: event.target.value });
  };

  const handlePhone = (event) => {
    setPhone({ value: event.target.value });
  };

  /*
  Function called when the user attempts to save changes. Will check all the user values and 
  attempt to update them.
  */
  const saveChanges = async () => {
    // Update a user email
    if (email !== null) {
      updateEmail(user, email.value)
        .then(() => {
          setEmailModal(true);
        })
        .catch((error) => {
          // TODO: Instead of logging this should display the error
          console.log("ERROR");
        });
    }

    // Update a user first name
    if (firstName !== null) {
      updateGivenName(user, firstName.value).catch((error) => {
        // TODO: Instead of logging this should display the error
        console.log("ERROR");
      });
    }

    // Update a user last name
    if (lastName !== null) {
      updateFamilyName(user, lastName.value).catch((error) => {
        // TODO: Instead of logging this should display the error
        console.log("ERROR");
      });
    }

    // Update a user phone number
    if (phone !== null) {
      updatePhone(user, phone.value).catch((error) => {
        // TODO: Instead of logging this should display the error
        console.log("ERROR");
      });
    }
    // Clear the state after changes have been saved
    clearState();
  };

  return (
    <div className="bg-dark-gray overflow-y">
      <Navbar />
      <div className="container mx-auto flex overflow-y bg-dark-gray">
        <Sidebar />
        <div className="sm:w-3/4 md:w-5/6 lg:w-7/8 bg-dark-gray overflow-y pl-5">
          <div className="flex">
            <h1 className="text-green font-bold sm:text-3xl md:text-5xl pt-24">
              My Profile
            </h1>
            <button
              className="text-white font-medium rounded-lg bg-another-gray px-6 mt-24 ml-auto"
              onClick={() => setResetModal(true)}
            >
              Reset balance
            </button>
          </div>
          <AlpacaModal setResetModal={setResetModal} resetModal={resetModal} />
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
          <ul className="grid gap-8 grid-cols-1 mt-10 mb-10">
            <li className="flex">
              <p className="text-white font-semibold inline py-2 w-1/6">
                First name
              </p>
              <input
                className="bg-faded-dark-gray focus:outline-none focus:shadow-outline ml-20 py-2 px-4 block w-1/3 appearance-none leading-normal shadow-md caret-white text-white"
                type="text"
                placeholder={user?.attributes?.given_name}
                onChange={handleFirstName}
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
                onChange={handleLastName}
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
                onChange={handleEmail}
              />
            </li>
            <EmailModal setEmailModal={setEmailModal} emailModal={emailModal} />
            <li className="flex">
              <p className="text-white font-semibold inline py-2 w-1/6">
                Phone Number
              </p>
              <input
                className="bg-faded-dark-gray focus:outline-none focus:shadow-outline ml-20 py-2 px-4 block w-1/3 appearance-none leading-normal shadow-md caret-white text-white"
                type="text"
                placeholder={user?.attributes?.phone_number}
                onChange={handlePhone}
              />
            </li>
            <PhoneModal setPhoneModal={setPhoneModal} phoneModal={phoneModal} />
            <li>
              <ul className="grid grid-cols-1 gap-6 mt-5">
                <li>
                  <button
                    className="text-white font-semibold underline"
                    onClick={() => setPasswordModal(true)}
                  >
                    Change password
                  </button>
                  <FaArrowRight className="inline mb-1 ml-1 text-white" />
                </li>
                <PasswordModal
                  setPasswordModal={setPasswordModal}
                  passwordModal={passwordModal}
                  user={user}
                />
                <li>
                  <button
                    className="text-white font-semibold underline"
                    onClick={() => setAlpacaModal(true)}
                  >
                    Connect to PaperTrade
                  </button>
                  <FaArrowRight className="inline mb-1 ml-1 text-white" />
                </li>
                <AlpacaModal
                  setAlpacaModal={setAlpacaModal}
                  alpacaModal={alpacaModal}
                />
                <li>
                  <button
                    className="text-red font-semibold underline"
                    onClick={() => setDeleteModal(true)}
                  >
                    Delete account
                  </button>
                  <FaArrowRight className="inline mb-1 ml-1 text-red" />
                </li>
                <DeleteModal
                  setDeleteModal={setDeleteModal}
                  deleteModal={deleteModal}
                  user={user}
                />
              </ul>
            </li>

            <li>
              <button
                className="text-white font-medium rounded-lg bg-green py-2 px-6"
                onClick={saveChanges}
              >
                Save changes
              </button>
              <button
                className="text-white font-medium rounded-lg bg-red py-2 px-6 float-right"
                onClick={signOut}
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
