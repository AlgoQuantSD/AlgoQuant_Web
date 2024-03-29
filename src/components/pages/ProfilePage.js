import { React, useCallback, useContext, useEffect, useState } from "react";
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
import PasswordModal from "../singular/Modals/PasswordModal";
import AccountModal from "../singular/Modals/AccountModal";
import DeleteModal from "../singular/Modals/DeleteModal";
import AlgoquantApiContext from "../../api/ApiContext";
import { LoadSpinner } from "../reusable/LoadSpinner";
import Banner from "../reusable/Banner";

// Uitlity fuction used to format numbers
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const ProfilePage = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  // All the modal states for managing the display of hte Modals
  const [passwordModal, setPasswordModal] = useState(false);
  const [accountModal, setAccountModal] = useState({
    visible: false,
    type: null,
  });
  const [deleteModal, setDeleteModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);

  // The attributes will be updated by the user
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);

  // State used to manage the process of saving saving chagnes
  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessages, setSuccessMessages] = useState([]);
  const [saving, setSaving] = useState(false);

  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);
  const [balance, setBalance] = useState();
  const [alpacaConnection, setAlpacaConnection] = useState(false);

  // State variable used to track when loading screen should be shown
  const [isLoading, setIsLoading] = useState(true);
  // store error and show on banner
  const [bannerMsg, setBannerMsg] = useState("");
  const [bannerType, setBannerType] = useState();

  const [successfulBalanceReset, setSuccessfulBalanceReset] = useState(null);
  // Utility method to clear the state of each attribute, used after changes are saved
  const clearState = () => {
    setFirstName(null);
    setLastName(null);
    setPhone(null);
    setEmail(null);
  };

  /*
  Handler for all the account modals. The AccountModal encapsulates all operations related to the users account which are
  resetting balance (simulated + alpaca) , connecting alpaca, and disconnecting alpaca. 
  */
  const handleAccountModals = (type) => {
    // If its already visible then set it to not visible otherwise set it visible
    if (accountModal.visible) {
      setAccountModal({ visible: false, type: null });
    } else {
      setAccountModal({ visible: true, type: type });
    }
  };

  // eslint-disable-next-line
  const getUser = useCallback(() => {
    if (algoquantApi.token) {
      algoquantApi
        .getUser()
        .then((resp) => {
          setBalance(resp.data.buying_power);
          setAlpacaConnection(resp.data.alpaca);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          setBannerMsg(
            "Erorr: Failed to get profile information. Please try again later."
          );
          setBannerType("error");
        });
    }
  });

  // When the page is loaded the user object must be fetched
  // runs the getUser axios request to receive user information from the database
  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, [algoquantApi]);

  useEffect(() => {
    if (successfulBalanceReset) {
      getUser();
      setSuccessfulBalanceReset(false);
      setBannerType("success");
    }
    // eslint-disable-next-line
  }, [successfulBalanceReset]);

  /*
  Function called when the user attempts to save changes. Will check all the user values and 
  attempt to update them.
  */
  const saveChanges = async () => {
    // Update a user email
    if (email !== null) {
      updateEmail(user, email)
        .then(() => {
          setEmailModal(true);
          setSuccessMessages((successMessages) => [
            ...successMessages,
            "Sucessfully changed email",
          ]);
          setSaving(false);
        })
        .catch((err) => {
          setErrorMessages((errorMessages) => [
            ...errorMessages,
            "There was a problem updating your email: " + err.msg,
          ]);
          setSaving(false);
        });
    }
    // Update a user first name
    if (firstName !== null) {
      updateGivenName(user, firstName)
        .then(() => {
          setSuccessMessages((successMessages) => [
            ...successMessages,
            "You have successfully changed your first name!",
          ]);
          setSaving(false);
        })
        .catch((err) => {
          setErrorMessages((errorMessages) => [
            ...errorMessages,
            "There was a problem updating your first name: " + err.message,
          ]);
          setSaving(false);
        });
    }

    // Update a user last name
    if (lastName !== null) {
      updateFamilyName(user, lastName)
        .then(() => {
          setSuccessMessages((successMessages) => [
            ...successMessages,
            "You have successfully changed your last name!",
          ]);
          setSaving(false);
        })
        .catch((err) => {
          setErrorMessages((errorMessages) => [
            ...errorMessages,
            "There was a problem updating your last name: " + err.message,
          ]);
          setSaving(false);
        });
    }

    // Update a user phone number
    if (phone !== null) {
      updatePhone(user, phone)
        .then(() => {
          setSuccessMessages((successMessages) => [
            ...successMessages,
            "You have successfully changed your phone number!",
          ]);
          setSaving(false);
        })
        .catch((err) => {
          setErrorMessages((errorMessages) => [
            ...errorMessages,
            "There was a problem updating your phone number: " + err.message,
          ]);
          setSaving(false);
        });
    }

    // Clear the error and sucess printouts after everything has been saved
    setTimeout(() => {
      setErrorMessages([]);
      setSuccessMessages([]);
      // This ensures that the application does not get stuck in a saving state
      setSaving(false);
    }, 3000);
    // Clear the state after changes have been saved
    clearState();
  };

  return (
    // Main Div Container
    <div className="bg-cokewhite overflow-x-auto overflow-y-auto">
      {bannerMsg === "" ? (
        <></>
      ) : (
        <Banner
          message={bannerMsg}
          setMessage={setBannerMsg}
          type={bannerType}
        />
      )}
      <Navbar />
      {/* Main Div for the side bar and all the page content */}
      <div className="flex self-stretch">
        <Sidebar />

        {/* Div for all the profile content */}
        <div className="w-full h-full p-5 ">
          {/* All the Modals used by this page */}
          <AccountModal
            handleAccountModals={handleAccountModals}
            accountModal={accountModal}
            setMessage={setBannerMsg}
            setSuccessfulBalanceReset={setSuccessfulBalanceReset}
          />
          <EmailModal setEmailModal={setEmailModal} emailModal={emailModal} />
          <PasswordModal
            setPasswordModal={setPasswordModal}
            passwordModal={passwordModal}
          />
          <DeleteModal
            setDeleteModal={setDeleteModal}
            deleteModal={deleteModal}
          />

          <div className="flex ml-3 mt-10">
            <h1 className="text-green font-bold sm:text-3xl lg:text-5xl mr-5">
              My Account
            </h1>
            <button
              className="text-green font-medium border-2 border-light-gray hover:bg-smokewhite rounded-lg p-3 ml-auto"
              onClick={() => {
                // Either will reset and ask the user for new API keys are just reset simualted balance
                alpacaConnection
                  ? handleAccountModals(ModalTypes.reset_alpaca)
                  : handleAccountModals(ModalTypes.reset_simulated);
              }}
            >
              Reset balance
            </button>
          </div>
          {/* The rest of the page relies on data from API, dont show until ready */}
          {isLoading ? (
            <LoadSpinner />
          ) : (
            <>
              <div className="m-10">
                <div className="rounded-full w-32 h-32 bg-smokewhite flex justify-center items-center mx-auto">
                  <p
                    className="text- text-center font-light text-6xl flex"
                    data-testid="user-initials"
                  >
                    {user?.attributes?.given_name?.charAt(0)}
                    {user?.attributes?.family_name?.charAt(0)}
                  </p>
                </div>
                <p
                  className="text-center text-green font-thin text-md"
                  data-testid="user-name"
                >
                  {user?.attributes?.given_name +
                    " " +
                    user?.attributes?.family_name}
                </p>
                <p className="text-2xl font-light text-center text-green mt-3">
                  {alpacaConnection
                    ? "Alpaca Verified Buying Power"
                    : "Simulated Buying Power"}
                </p>
                <p
                  className="text-2xl font-bold text-center text-green"
                  data-testid="total-balance"
                >
                  {formatter.format(balance)}
                </p>
              </div>
              <ul className="grid gap-8 grid-cols-1 mt-5">
                <li className="flex">
                  <p className="text-green font-semibold inline pt-2 w-1/6">
                    First name
                  </p>
                  <input
                    className="bg-smokewhite focus:outline-none focus:shadow-outline ml-20 py-2 px-4 block w-1/3 appearance-none leading-normal shadow-md caret-green text-green"
                    type="text"
                    placeholder={user?.attributes?.given_name}
                    onChange={(event) => {
                      setFirstName(event.target.value);
                    }}
                  />
                </li>
                <li className="flex">
                  <p className="text-green font-semibold inline py-2 w-1/6">
                    Last name
                  </p>
                  <input
                    className="bg-smokewhite focus:outline-none focus:shadow-outline ml-20 py-2 px-4 block w-1/3 appearance-none leading-normal shadow-md caret-green text-green"
                    type="text"
                    placeholder={user?.attributes?.family_name}
                    onChange={(event) => {
                      setLastName(event.target.value);
                    }}
                  />
                </li>
                <li className="flex">
                  <p className="text-green font-semibold inline py-2 w-1/6">
                    Email Address
                  </p>
                  <input
                    className="bg-smokewhite focus:outline-none focus:shadow-outline ml-20 py-2 px-4 block w-1/3 appearance-none leading-normal shadow-md caret-green text-green"
                    type="text"
                    placeholder={user?.attributes?.email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </li>
                <li className="flex">
                  <p className="text-green font-semibold inline py-2 w-1/6">
                    Phone Number
                  </p>
                  <input
                    className="bg-smokewhite focus:outline-none focus:shadow-outline ml-20 py-2 px-4 block w-1/3 appearance-none leading-normal shadow-md caret-green text-green"
                    type="text"
                    placeholder={user?.attributes?.phone_number}
                    onChange={(event) => {
                      setPhone(event.target.value);
                    }}
                  />
                </li>
                <ProfileSaving
                  saving={saving}
                  errorMessages={errorMessages}
                  successMessages={successMessages}
                />
                <li>
                  <ul className="grid grid-cols-1 gap-6">
                    <li>
                      <button
                        className="text-green font-semibold underline"
                        onClick={() => setPasswordModal(true)}
                      >
                        Change password
                      </button>
                      <FaArrowRight className="inline mb-1 ml-1 text-green" />
                    </li>
                    <li>
                      <button
                        className="text-green font-semibold underline"
                        onClick={
                          // If the user has not connected Alpaca then they must disconnect, otherwise they can connect
                          () =>
                            alpacaConnection
                              ? handleAccountModals(ModalTypes.disconnect)
                              : handleAccountModals(ModalTypes.connect)
                        }
                      >
                        {alpacaConnection
                          ? "Disconnect from Alpaca"
                          : "Connect to Alpaca"}
                      </button>
                      <FaArrowRight className="inline mb-1 ml-1 text-green" />
                    </li>
                    <li>
                      <button
                        className="text-red font-semibold underline"
                        onClick={() => setDeleteModal(true)}
                      >
                        Delete account
                      </button>
                      <FaArrowRight className="inline mb-1 ml-1 text-red" />
                    </li>
                  </ul>
                </li>
                {/* Div for Save Changes and Signout Button*/}
                <div className="flex justify-between items-center">
                  <button
                    className="text-cokewhite font-medium rounded-lg bg-green hover:bg-selection-green px-4 py-3"
                    onClick={() => {
                      setSaving(true);
                      saveChanges();
                    }}
                  >
                    Save changes
                  </button>
                  <button
                    className="text-cokewhite font-medium rounded-lg bg-red ml-auto px-4 py-3"
                    onClick={signOut}
                  >
                    Sign out
                  </button>
                </div>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
