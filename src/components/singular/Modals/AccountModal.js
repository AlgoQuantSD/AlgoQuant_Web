import { React, useState } from "react";
import Modal from "../Modal";

/*
Enum specifying the different options for the users account
*/
export const ModalTypes = {
  reset_alpaca: "reset_alpaca",
  reset_simulated: "reset_simulated",
  connect: "connect",
  disconnect: "disconnect"
}

/*
This modal is responsible for the different interactions with the users account. This involves resetting an alpaca and simualted account, 
connecting an alpaca account, and disconnecting an alpaca account. 
*/
const AlpacaModal = ({
  setAlpacaModal,
  alpacaModal,
  modalType
}) => {

  const [alpacaKey, setAlpacaKey] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const [error,setError] = useState("")

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
    // Check the type of modal for what action must be performed
    switch(modalType){
      case ModalTypes.connect:
        // TODO: Define request body for connect
        console.log(ModalTypes.connect)
        break
      case ModalTypes.disconnect:
        // TODO: Define request body for disconnect
        console.log(ModalTypes.disconnect)
        break
      case ModalTypes.reset:
        // TODO: Define request body for reset
        console.log(ModalTypes.reset)
        break
      case ModalTypes.reset_simulated:
        console.log(ModalTypes.reset_simulated)
        break
      default:
        console.log("Invalid type!!!!!!!")
    }
    // TODO: Make API request here
    setError("Unimplemented!")
    // This should be called on sucessful API request
    setAlpacaModal(false);
  };

  // The modal used by the user to reset their alpaca account
  if (modalType === ModalTypes.reset_alpaca) {
    return (
      <Modal isVisible={alpacaModal} onClose={() => setAlpacaModal(false)}>
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
            <p className="text-red">{error}</p>
            <p className="text-faded-dark-gray">
              NOTE: Your balance will be reset to $100,000 and all active jobs
              will be terminated.
            </p>
          </div>
          <div className="p-6 flex justify-between">
            <button
              className="text-white bg-another-gray py-2 px-6 rounded shadow-md"
              onClick={() => setAlpacaModal(false)}
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
  // The modal used by the user to connect to their Alpaca account
  } else if (modalType === ModalTypes.connect) {
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
            <p className="text-red">{error}</p>
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
  // The modal used by the user to disconnect from Alpaca or use simulated balance.
  } else if (modalType === ModalTypes.disconnect || modalType === ModalTypes.reset_simulated) {
    return (
      <Modal isVisible={alpacaModal} onClose={() => setAlpacaModal(false)}>
      <div className="bg-dark-gray p-2 rounded border border-red">
        <div className="p-6">
          <h3 className="text-3xl font-bold text-red mb-5"> {modalType === ModalTypes.disconnect ? ("Are you sure you want to reset your balance") : ("Reset your balance")}</h3>
          <p className="text-light-gray font-medium mb-5 text-xl">
            { modalType === ModalTypes.disconnect ? ("Are you sure you want to stop using Alapca?") : ("Are you sure you want to reset your balance") }
          </p>
        </div>
        <p className="text-red">{error}</p>
        <div className="p-6 flex justify-between">
          <button
            className="text-white bg-another-gray py-2 px-6 rounded shadow-md"
            onClick={() => setAlpacaModal(false)}
          >
            Cancel
          </button>
          <button
            className="text-white bg-red py-2 px-6 rounded shadow-md"
            onClick={submitRequest}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>)
  }
};

export default AlpacaModal;
