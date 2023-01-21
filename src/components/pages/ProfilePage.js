import { React, useState, useEffect } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import { FaArrowRight } from "react-icons/fa";

import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";
import EmailModal from "../singular/Modals/EmailModal";
import PhoneModal from "../singular/Modals/PhoneModal";
import PasswordModal from "../singular/Modals/PasswordModal";
import AlpacaModal from "../singular/Modals/AlpacaModal";
import DeleteModal from "../singular/Modals/DeleteModal";
import ResetModal from "../singular/Modals/ResetModal";

const ProfilePage = () => {
  // const { user } = useAuthenticator((context) => [context.user]);

  const { signOut } = useAuthenticator((context) => [context.user]);

  const [passwordModal, setPasswordModal] = useState(false);
  const [alpacaModal, setAlpacaModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [resetModal, setResetModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [phoneModal, setPhoneModal] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [code, setCode] = useState("");
  const [user, setUser] = useState({});

  const [emailVerified, setEmailVerified] = useState(false);

  const getUser = async () => {
    const user = await Auth.currentAuthenticatedUser();
    setUser(user);
    console.log(user);
  };

  useEffect(() => {
    getUser();
  }, []);

  const verifyEmail = async () => {
    try {
      await Auth.verifyCurrentUserAttribute("email");
      setEmailVerified(true);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("EMAIL: " + user.attributes?.email);

  const saveChanges = async (event) => {
    event.preventDefault();

    // // Update the user's first name and last name attributes
    // try {
    //   const user = await Auth.currentAuthenticatedUser();
    //   console.log(firstName);
    //   console.log(lastName);
    //   await Auth.updateUserAttributes(user, {
    //     // name: firstName + " " + lastName,
    //     given_name: firstName,
    //     family_name: lastName,
    //   });
    //   // setFirstName(firstName);
    //   // setLastName(lastName);
    // } catch (error) {
    //   console.log(error);
    // }

    if (email !== "") {
      verifyEmail();
      console.log("Email not empty");
      console.log(email);
      try {
        const user = await Auth.currentAuthenticatedUser();
        await Auth.updateUserAttributes(user, {
          email: email,
        });
        setEmailVerified(false);
      } catch (error) {
        console.log(error);
      }

      setEmailModal(true);
      setEmail(event.target.value);

      console.log("capturing email and phone");

      const result = await Auth.updateUserAttributes(user, {
        email: email,
      });

      // console.log(result);
    }

    if (phone !== "") {
      console.log("Phone not empty");

      setPhoneModal(true);
      setPhone(event.target.value);

      const result = await Auth.updateUserAttributes(result, {
        phone: phone,
      });

      console.log(result);
    }
  };

  const handleFirstName = (event) => {
    console.log(event.target.value);
    setFirstName({ value: event.target.value });
  };

  const handleLastName = (event) => {
    console.log(event.target.value);
    setLastName({ value: event.target.value });
  };

  const handleEmail = (event) => {
    console.log(event.target.value);
    setEmail({ value: event.target.value });
  };

  const handlePhone = (event) => {
    console.log(event.target.value);
    setPhone({ value: event.target.value });
  };

  const handleCode = (event) => {
    console.log(event.target.value);
    setCode({ value: event.target.value });
  };

  return (
    <div className="w-full h-screen bg-dark-gray overflow-hidden .md:bg-clip-padding">
      <Navbar />
      <Sidebar />
      <div className="flex justify-center items-center">
        <div className="w-8/12">
          <div className="ml-3 flex">
            <h1 className="text-green font-bold text-5xl pt-24">My Account</h1>
            <button
              className="text-white font-medium rounded-lg bg-another-gray px-6 mt-24 ml-auto"
              onClick={() => setResetModal(true)}
            >
              Reset balance
            </button>
          </div>
          <ResetModal setResetModal={setResetModal} resetModal={resetModal} />
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
