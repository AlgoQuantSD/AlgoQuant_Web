import { React, useState,useEffect } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { FaArrowRight } from "react-icons/fa";
import ProfileSaving from "../singular/ProfileSaving";
import { ModalTypes } from "../singular/Modals/AccountModal";

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
import AlpacaModal from "../singular/Modals/AccountModal";
import DeleteModal from "../singular/Modals/DeleteModal";

const ProfilePage = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  const alpaca = false

  // All the modal states none should be shown at first
  const [passwordModal, setPasswordModal] = useState(false);
  const [alpacaModal, setAlpacaModal] = useState(false);
  const [alpacaModalTypes,setAlpacaModalTypes] = useState("")

  const [deleteModal, setDeleteModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [phoneModal, setPhoneModal] = useState(false);

  // The attributes that will be updated by the modal
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessages, setSuccessMessages] = useState([]);
  const [saving,setSaving] = useState(false)

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

  const handleAlpacaModal = (event,type) => {
    setAlpacaModal(true)
    setAlpacaModalTypes(type)
  }

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
          setSuccessMessages(successMessages => [...successMessages,"Sucessfully changed email"]);
          setSaving(false)
        })
        .catch(() => {
          setErrorMessages(errorMessages => [...errorMessages,"There was a problem updating your email"]);  
          setSaving(false)
        });
    }
    // Update a user first name
    if (firstName !== null) {
      updateGivenName(user, firstName.value).then(()=>{
        setSuccessMessages(successMessages => [...successMessages,"You have successfully changed your first name!"]);
        setSaving(false)
      }).catch(() => {
        setErrorMessages(errorMessages => [...errorMessages,"There was a problem updating your first name"]);
        setSaving(false)
      });
    }

    // Update a user last name
    if (lastName !== null) {
      updateFamilyName(user, lastName.value).then(()=>{
        setSuccessMessages(successMessages => [...successMessages,"You have successfully changed your last name!"]);
        setSaving(false)
      }).catch(() => {
        setErrorMessages(errorMessages => [...errorMessages,"There was a problem updating your last name"]);
        setSaving(false)
      });
    }

    // Update a user phone number
    if (phone !== null) {
      updatePhone(user, phone.value).then(() => {
        setSuccessMessages(successMessages => [...successMessages,"You have successfully changed your phone number!"]);
        setSaving(false)
      }).catch(() => {
        setErrorMessages(errorMessages => [...errorMessages,"There was a problem updating your phone number"]);
        setSaving(false)
      });
    }

    // Clear the error and sucess printouts after everything has been saved
    setTimeout(() => {
      setErrorMessages([]);
      setSuccessMessages([]);
    }, 3000);
   
    // Clear the state after changes have been saved
    clearState();
  };

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
            <button className="text-white font-medium rounded-lg bg-another-gray p-3 ml-auto"
             onClick ={ (event) => {
              // Either will reset and ask the user for new API keys are just reset simualted balance
             alpaca ? handleAlpacaModal(event,ModalTypes.reset_alpaca) : (handleAlpacaModal(event,ModalTypes.reset)) 
             }}>
              Reset balance
            </button>
          </div>
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
          <ul className="grid gap-8 grid-cols-1 mt-5">
            <li className="flex">
              <p className="text-white font-semibold inline pt-2 w-1/6">
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

            <ProfileSaving saving={saving} errorMessages={errorMessages} successMessages={successMessages}/>

            <PhoneModal setPhoneModal={setPhoneModal} phoneModal={phoneModal} />
            <li>
              <ul className="grid grid-cols-1 gap-6">
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
                    onClick={
                    // If the user has not connected Alpaca then they must disconnect, otherwise they can connect
                    (event) => alpaca ? (handleAlpacaModal(event,ModalTypes.disconnect)) :  (handleAlpacaModal(event,ModalTypes.connect)) } 
                  > {
                        alpaca ? ("Disconnect from Alpaca") : ("Connect to Alpaca") 
                    }               
                  </button>
                  
                  <FaArrowRight className="inline mb-1 ml-1 text-white" />
                </li>
                <AlpacaModal
                  setAlpacaModal={setAlpacaModal}
                  alpacaModal={alpacaModal}
                  modalType={alpacaModalTypes}
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
           {/* Div for Save Changes and Signout Button*/}
            <div className = "flex">
              <button
                className="text-white font-medium rounded-lg bg-green p-4"
                onClick={ () => {
                  setSaving(true)
                  saveChanges()}}
              >
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
