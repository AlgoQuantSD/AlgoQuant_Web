import { React, useState } from "react";
import Modal from "../Modal";

const AlpacaModal = ({
  setAlpacaModal,
  alpacaModal,
  setResetModal,
  resetModal,
}) => {
  const [alpacaKey, setAlpacaKey] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const handleAlpacaKey = (event) => {
    setAlpacaKey({ value: event.target.value });
  };

  const handleSecretKey = (event) => {
    setSecretKey({ value: event.target.value });
  };

  // This method will be called when submit is entered. This will send an API request to the reset-balance endpoint
  // TODO: Hook up with API
  const submitRequest = async () => {
    // Demonstrating that the keys are being handled appropriately
    console.log(alpacaKey);
    console.log(secretKey);
    setAlpacaModal(false);
  };

  if (resetModal) {
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
            <p className="text-light-gray font-medium mb-5 text-xl">
              Please enter Alpaca API Key
            </p>
            <input
              className="bg-faded-dark-gray mb-5 focus:outline-none focus:shadow-outline py-2 px-4 block w-2/3 appearance-none leading-normal shadow-md caret-white text-white"
              type="text"
              placeholder="Alpaca Key"
              onChange={handleAlpacaKey}
            />
            <p className="text-light-gray font-medium mb-5 text-xl">
              Please enter Alpaca Secret Key
            </p>
            <input
              className="bg-faded-dark-gray mb-5 focus:outline-none focus:shadow-outline py-2 px-4 block w-2/3 appearance-none leading-normal shadow-md caret-white text-white"
              type="text"
              placeholder="Secret Key"
              onChange={handleSecretKey}
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
            <button
              className="text-white bg-green py-2 px-6 rounded shadow-md"
              onClick={submitRequest}
            >
              Continue
            </button>
          </div>
        </div>
      </Modal>
    );
  } else if (alpacaModal) {
    return (
      <Modal isVisible={alpacaModal} onClose={() => setAlpacaModal(false)}>
        <div className="bg-dark-gray p-2 rounded border border-light-gray">
          <div className="p-6">
            <h3 className="text-3xl font-bold text-light-gray mb-5">
              Connect to PaperTrade
            </h3>
            <p className="text-light-gray font-medium mb-5 text-xl">
              Please enter Alpaca API Key
            </p>
            <input
              className="bg-faded-dark-gray mb-5 focus:outline-none focus:shadow-outline py-2 px-4 block w-2/3 appearance-none leading-normal shadow-md caret-white text-white"
              type="text"
              placeholder="Alpaca Key"
              onChange={handleAlpacaKey}
            />
            <p className="text-light-gray font-medium mb-5 text-xl">
              Please enter Alpaca Secret Key
            </p>
            <input
              className="bg-faded-dark-gray mb-5 focus:outline-none focus:shadow-outline py-2 px-4 block w-2/3 appearance-none leading-normal shadow-md caret-white text-white"
              type="text"
              placeholder="Secret Key"
              onChange={handleSecretKey}
            />
            <p className="text-faded-dark-gray">
              NOTE: Updating the Alpaca Key will reset your paper trading
            </p>
          </div>
          <div className="p-6 flex justify-between">
            <button
              className="text-white bg-another-gray py-2 px-6 rounded shadow-md"
              onClick={() => {
                setAlpacaModal(false);
              }}
            >
              Cancel
            </button>
            <button
              className="text-white bg-green py-2 px-6 rounded shadow-md"
              onClick={submitRequest}
            >
              Continue
            </button>
          </div>
        </div>
      </Modal>
    );
  }
};

export default AlpacaModal;
