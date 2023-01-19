import React from "react";
import Modal from "../Modal";

const AlpacaModal = ({ setAlpacaModal, alpacaModal }) => {
  return (
    <Modal isVisible={alpacaModal} onClose={() => setAlpacaModal(false)}>
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
  );
};

export default AlpacaModal;
