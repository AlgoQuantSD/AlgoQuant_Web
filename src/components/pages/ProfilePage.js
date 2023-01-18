import { React, useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { FaArrowRight } from "react-icons/fa";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";
import Modal from "../reusable/Modal";
import { Auth, Hub } from "aws-amplify";

const ProfilePage = () => {
  // const { user } = useAuthenticator((context) => [context.user]);

  const { signOut } = useAuthenticator((context) => [context.user]);

  const [passwordModal, setPasswordModal] = useState(false);
  const [alpacaModal, setAlpacaModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [resetModal, setResetModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [user, setUser] = useState({});

  // getUser();

  console.log("EMAIL: " + user.attributes?.email);

  const saveChanges = async () => {
    console.log("Changes saved");
    console.log(firstName);
    console.log(lastName);

    if (email !== "") {
      console.log("Email not empty");
      // console.log(email);
      setEmailModal(true);
      const result = await Auth.updateUserAttributes(user, {
        email: email.value,
        // family_name: "Lastname",
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
                  <button
                    className="text-white font-semibold underline"
                    onClick={() => setPasswordModal(true)}
                  >
                    Change password
                  </button>
                  <FaArrowRight className="inline mb-1 ml-1 text-white" />
                </li>
                <li>
                  <button
                    className="text-white font-semibold underline"
                    onClick={() => setAlpacaModal(true)}
                  >
                    Connect to PaperTrade
                  </button>
                  <FaArrowRight className="inline mb-1 ml-1 text-white" />
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

            <Modal isVisible={emailModal} onClose={() => setEmailModal(false)}>
              <div className="bg-dark-gray p-2 rounded border border-light-gray">
                <div className="p-6">
                  <h3 className="text-3xl font-bold text-light-gray mb-5">
                    Verify Email Address
                  </h3>
                  <p className="text-light-gray font-light mb-5 text-xl">
                    Please enter the code sent to your new email address
                  </p>
                  <input
                    className="bg-faded-dark-gray mb-5 focus:outline-none focus:shadow-outline py-2 px-4 block w-2/3 appearance-none leading-normal shadow-md caret-white text-white"
                    type="text"
                    placeholder="Verification Code"
                    onChange={handleCode}
                  />
                </div>
                <div className="p-6 flex justify-between">
                  <button
                    className="text-white bg-another-gray py-2 px-6 rounded shadow-md"
                    onClick={() => setEmailModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-white bg-green py-2 px-6 rounded shadow-md"
                    onClick={async () => {
                      var verificationCode = code.value;
                      // console.log(verificationCode);
                      const result =
                        await Auth.verifyCurrentUserAttributeSubmit(
                          "email",
                          verificationCode
                        ).then(() => {
                          setEmailModal(false);
                        });
                      console.log(result);
                    }}
                  >
                    Verify
                  </button>
                </div>
              </div>
            </Modal>

            <Modal
              isVisible={passwordModal}
              onClose={() => setPasswordModal(false)}
            >
              <div className="bg-dark-gray p-2 rounded border border-light-gray">
                <div className="p-6">
                  <h3 className="text-3xl font-bold text-light-gray mb-5">
                    Change Password
                  </h3>
                  <p className="text-light-gray font-medium mb-5 text-xl">
                    Please enter your old password
                  </p>
                  <input
                    className="bg-faded-dark-gray mb-5 focus:outline-none focus:shadow-outline py-2 px-4 block w-2/3 appearance-none leading-normal shadow-md caret-white text-white"
                    type="text"
                    placeholder="Old Password"
                  />
                  <p className="text-light-gray font-medium mb-5 text-xl">
                    Please enter your new password
                  </p>
                  <input
                    className="bg-faded-dark-gray mb-5 focus:outline-none focus:shadow-outline py-2 px-4 block w-2/3 appearance-none leading-normal shadow-md caret-white text-white"
                    type="text"
                    placeholder="New Password"
                  />
                  <p className="text-light-gray font-medium mb-5 text-xl">
                    Confirm your new password
                  </p>
                  <input
                    className="bg-faded-dark-gray mb-5 focus:outline-none focus:shadow-outline py-2 px-4 block w-2/3 appearance-none leading-normal shadow-md caret-white text-white"
                    type="text"
                    placeholder="Confirm Password"
                  />
                </div>
                <div className="p-6 flex justify-between">
                  <button
                    className="text-white bg-another-gray py-2 px-6 rounded shadow-md"
                    onClick={() => setPasswordModal(false)}
                  >
                    Cancel
                  </button>
                  <button className="text-white bg-green py-2 px-6 rounded shadow-md">
                    Save Changes
                  </button>
                </div>
              </div>
            </Modal>

            <Modal
              isVisible={alpacaModal}
              onClose={() => setAlpacaModal(false)}
            >
              <div className="bg-dark-gray p-2 rounded border border-light-gray">
                <div className="p-6">
                  <h3 className="text-3xl font-bold text-light-gray mb-5">
                    Connect to PaperTrade
                  </h3>
                  <p className="text-light-gray font-medium mb-5 text-xl">
                    Please enter your Alpaca Key
                  </p>
                  <input
                    className="bg-faded-dark-gray mb-5 focus:outline-none focus:shadow-outline py-2 px-4 block w-2/3 appearance-none leading-normal shadow-md caret-white text-white"
                    type="text"
                    placeholder="Alpaca Key"
                  />
                  <p className="text-faded-dark-gray">
                    NOTE: Updating the Alpaca Key will reset your paper trading
                  </p>
                </div>
                <div className="p-6 flex justify-between">
                  <button
                    className="text-white bg-another-gray py-2 px-6 rounded shadow-md"
                    onClick={() => setAlpacaModal(false)}
                  >
                    Cancel
                  </button>
                  <button className="text-white bg-green py-2 px-6 rounded shadow-md">
                    Continue
                  </button>
                </div>
              </div>
            </Modal>

            <Modal
              isVisible={deleteModal}
              onClose={() => setDeleteModal(false)}
            >
              <div className="bg-dark-gray p-2 rounded border border-red">
                <div className="p-6">
                  <h3 className="text-3xl font-bold text-red mb-5">
                    Delete Account
                  </h3>
                  <p className="text-light-gray font-medium mb-5 text-xl">
                    Are you sure you want to delete your account?
                  </p>
                  <p className="text-light-gray font-light mb-5">
                    Please enter your password to confirm.
                  </p>
                  <input
                    className="bg-faded-dark-gray mb-5 focus:outline-none focus:shadow-outline py-2 px-4 block w-2/3 appearance-none leading-normal shadow-md caret-white text-white"
                    type="text"
                    placeholder="Password"
                  />
                  <p className="text-faded-dark-gray">
                    NOTE: You will not be able to recover your account upon
                    deletion.
                  </p>
                </div>
                <div className="p-6 flex justify-between">
                  <button
                    className="text-white bg-another-gray py-2 px-6 rounded shadow-md"
                    onClick={() => setDeleteModal(false)}
                  >
                    Cancel
                  </button>
                  <button className="text-white bg-red py-2 px-6 rounded shadow-md">
                    Delete
                  </button>
                </div>
              </div>
            </Modal>

            <Modal isVisible={resetModal} onClose={() => setResetModal(false)}>
              <div className="bg-dark-gray p-2 rounded border border-light-gray">
                <div className="p-6">
                  <h3 className="text-3xl font-bold text-light-gray mb-5">
                    Reset Balance
                  </h3>
                  <p className="text-light-gray font-medium mb-5 text-xl">
                    Are you sure you want to reset your balance?
                  </p>
                  <p className="text-light-gray font-light mb-5">
                    Please enter your Alpaca Key to confirm.
                  </p>
                  <input
                    className="bg-faded-dark-gray mb-5 focus:outline-none focus:shadow-outline py-2 px-4 block w-2/3 appearance-none leading-normal shadow-md caret-white text-white"
                    type="text"
                    placeholder="Alpaca Key"
                  />
                  <p className="text-faded-dark-gray">
                    NOTE: Your balance will be reset to $100,000 and all active
                    jobs will be terminated.
                  </p>
                </div>
                <div className="p-6 flex justify-between">
                  <button
                    className="text-white bg-another-gray py-2 px-6 rounded shadow-md"
                    onClick={() => setResetModal(false)}
                  >
                    Cancel
                  </button>
                  <button className="text-white bg-green py-2 px-6 rounded shadow-md">
                    Continue
                  </button>
                </div>
              </div>
            </Modal>

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
