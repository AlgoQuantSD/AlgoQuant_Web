import React from "react";
import Modal from "../Modal";

const DeleteModal = ({ setDeleteModal, deleteModal }) => {
  return (
    <Modal isVisible={deleteModal} onClose={() => setDeleteModal(false)}>
      <div className="bg-dark-gray p-2 rounded border border-red">
        <div className="p-6">
          <h3 className="text-3xl font-bold text-red mb-5">Delete Account</h3>
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
            NOTE: You will not be able to recover your account upon deletion.
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
  );
};

export default DeleteModal;
