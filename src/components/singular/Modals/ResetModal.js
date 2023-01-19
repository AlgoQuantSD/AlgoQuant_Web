import React from "react";
import Modal from "../Modal";

const ResetModal = ({ setResetModal, resetModal }) => {
  return (
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
            NOTE: Your balance will be reset to $100,000 and all active jobs
            will be terminated.
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
  );
};

export default ResetModal;
