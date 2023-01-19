import { React } from "react";
import Modal from "../Modal";

const PasswordModal = ({ setPasswordModal, passwordModal }) => {
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
          />
          <p className="text-light-gray font-light mb-2 text-md">
            Please enter your new password
          </p>
          <input
            className="bg-faded-dark-gray mb-5 focus:outline-none focus:shadow-outline py-2 px-4 block w-2/3 appearance-none leading-normal shadow-md caret-white text-white"
            type="text"
            placeholder="New Password"
          />
          <p className="text-light-gray font-light mb-2 text-md">
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
  );
};

export default PasswordModal;
