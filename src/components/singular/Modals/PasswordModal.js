import { React, useState } from "react";
import Modal from "../Modal";
import { Auth } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { SaveSpinner } from "../../reusable/LoadSpinner";

const PasswordModal = ({ setPasswordModal, passwordModal }) => {
  const { user } = useAuthenticator((context) => [context.user]);

  // The states that are solely for the password modal
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmNewPassword, setConfirmNewPassword] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  /*
  All the event handlers will be used to update the various user fields. 
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

  // Function that will handle the actual changing of the passwords
  const submitChange = async () => {
    // Ensure the passwords match
    if (confirmNewPassword?.value !== newPassword?.value) {
      setError("Passwords do not match! try again.");
    } else {
      setIsLoading(true);
      Auth.changePassword(user, oldPassword.value, newPassword.value)
        .then(() => {
          setIsLoading(false);
          setError("");
          setPasswordModal(false);
        })
        .catch((err) => {
          setIsLoading(false);
          setError("Error changing password: " + err.message);
        });
    }
  };

  /*
  Callback for whenever the modal is closed either by clicking a cancel button or the onClose 
  attributes of the Modal
  */
  const handleClose = () => {
    setError("");
    setPasswordModal(false);
  };

  return (
    <Modal isVisible={passwordModal} onClose={handleClose}>
      <div className="bg-cokewhite p-2 rounded-md border-2 border-green">
        <div className="p-6">
          <h3 className="text-3xl font-bold text-green mb-5">
            Change Password
          </h3>
          <p className="text-green font-light mb-2 text-md">
            Please enter your old password
          </p>
          <input
            className="bg-smokewhite mb-5 focus:outline-none focus:shadow-outline py-2 px-4 block w-2/3 appearance-none leading-normal shadow-md caret-white text-green"
            type="text"
            placeholder="Old Password"
            onChange={handleOldPassword}
          />
          <p className="text-green font-light mb-2 text-md">
            Please enter your new password
          </p>
          <input
            className="bg-smokewhite mb-5 focus:outline-none focus:shadow-outline py-2 px-4 block w-2/3 appearance-none leading-normal shadow-md caret-white text-green"
            type="text"
            placeholder="New Password"
            onChange={handleNewPassword}
          />
          <p className="text-green font-light mb-2 text-md">
            Confirm your new password
          </p>
          <input
            className="bg-smokewhite focus:outline-none focus:shadow-outline py-2 px-4 block w-2/3 appearance-none leading-normal shadow-md caret-white text-green"
            type="text"
            placeholder="Confirm Password"
            onChange={handleConfirmNewPassword}
          />
          <p className="flex pt-4 text-red font-semibold text-md">{error}</p>
          {isLoading ? <SaveSpinner /> : <></>}
        </div>
        <div className="p-6 flex justify-between">
          <button
            className="text-green bg-smokewhite py-2 px-6 rounded shadow-md"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="text-cokewhite bg-green hover:bg-selection-green py-2 px-4 rounded shadow-md"
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
