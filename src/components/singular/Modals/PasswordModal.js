import { React, useState } from "react";
import Modal from "../Modal";
import { Auth } from "aws-amplify";

const PasswordModal = ({ setPasswordModal, passwordModal, user }) => {
  // The states that are solely for the password modal
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmNewPassword, setConfirmNewPassword] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /*
  All the event handlers will be used to update the various user fields
  */
  const handleNewPassword = (event) => {
    setNewPassword({ value: event.target.value });
  };

  const handleOldPassword = (event) => {
    setOldPassword({ value: event.target.value });
  };

  const handleConfirmNewPassword = (event) => {
    setConfirmNewPassword({ value: event.target.value });
  };

  // Utility method to clear the state of each attribute
  const clearState = () => {
    setError("");
  };

  // Function that will handle the actual changing of the passwords
  const submitChange = async () => {
    // Ensure the passwords match
    if (confirmNewPassword.value != newPassword.value) {
      setError("Passwords do not match!");
    } else if (confirmNewPassword.value == newPassword.value) {
      setSuccess("You have successfully changed your password!");
    } else {
      Auth.changePassword(user, oldPassword.value, newPassword.value)
        .then(() => {
          // Password changed
          setPasswordModal(false);
          clearState();
        })
        .catch(() => {
          // Ensure the error gets added to the list
          setError("Incorrect username or password");
        });
    }
  };

  return (
    <Modal isVisible={passwordModal} onClose={() => setPasswordModal(false)}>
      <div className="bg-dark-gray p-2 rounded border border-light-gray">
        <div className="p-6">
          <h3 className="text-3xl font-bold text-light-gray mb-5">
            Change Password
          </h3>
          <p className="text-light-gray font-light mb-2 text-md">
            Please enter your old password
          </p>
          <input
            className="bg-faded-dark-gray mb-5 focus:outline-none focus:shadow-outline py-2 px-4 block w-2/3 appearance-none leading-normal shadow-md caret-white text-white"
            type="text"
            placeholder="Old Password"
            onChange={handleOldPassword}
          />
          <p className="text-light-gray font-light mb-2 text-md">
            Please enter your new password
          </p>
          <input
            className="bg-faded-dark-gray mb-5 focus:outline-none focus:shadow-outline py-2 px-4 block w-2/3 appearance-none leading-normal shadow-md caret-white text-white"
            type="text"
            placeholder="New Password"
            onChange={handleNewPassword}
          />
          <p className="text-light-gray font-light mb-2 text-md">
            Confirm your new password
          </p>
          <input
            className="bg-faded-dark-gray focus:outline-none focus:shadow-outline py-2 px-4 block w-2/3 appearance-none leading-normal shadow-md caret-white text-white"
            type="text"
            placeholder="Confirm Password"
            onChange={handleConfirmNewPassword}
          />
          <p className="flex pt-4 text-red font-semibold text-md">{error}</p>
          <p className="flex pt-4 text-green font-semibold text-md">
            {success}
          </p>
        </div>
        <div className="p-6 flex justify-between">
          <button
            className="text-white bg-another-gray py-2 px-6 rounded shadow-md"
            onClick={() => {
              clearState();
              setPasswordModal(false);
            }}
          >
            Cancel
          </button>
          <button
            className="text-white bg-green py-2 px-6 rounded shadow-md"
            onClick={submitChange}
          >
            Change Password
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PasswordModal;
