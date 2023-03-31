import { React, useState, useContext } from "react";
import Modal from "../Modal";
import AlgoquantApiContext from "../../../api/ApiContext";
import { SaveSpinner } from "../../reusable/LoadSpinner";

/*
The different types of Modals that will be displayed
*/
export const ModalTypes = {
  reset_alpaca: "reset_alpaca",
  reset_simulated: "reset_simulated",
  connect: "connect",
  disconnect: "disconnect",
};

/*
This modal is responsible for the different interactions with the users account. This involves resetting an alpaca and simualted account, 
connecting an alpaca account, and disconnecting an alpaca account. 
*/
const AccountModal = ({
  handleAccountModals,
  accountModal,
  setMessage,
  setSuccessfulBalanceReset,
}) => {
  const algoquantApi = useContext(AlgoquantApiContext);

  // Keep track of the input for the alpaca key and secret key
  const [alpacaKey, setAlpacaKey] = useState("");
  const [secretKey, setSecretKey] = useState("");

  // Used to dispaly error messages for the modals
  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const modalType = accountModal.type;

  /*
  Handlers for the two Alpaca keys
  */
  const handleAlpacaKey = (event) => {
    setAlpacaKey(event.target.value);
  };

  const handleSecretKey = (event) => {
    setSecretKey(event.target.value);
  };

  /*
  Callback for whenever the modals are closed either by clicking a cancel button or the onClose 
  attributes of the Modal
  */
  const handleClose = () => {
    setError("");
    handleAccountModals();
  };

  /*
  Submit a request to the reset-balance endpoint. This method will handle the 4 different cases of connect, disconnect, 
  reset_alpaca, and reset_simualted. 
  */
  const submitRequest = async () => {
    // request body is empty by default
    var requestBody = {};

    // Connecting and resetting balance requires alpaca keys
    if (
      modalType === ModalTypes.connect ||
      modalType === ModalTypes.reset_alpaca
    ) {
      requestBody = {
        alpaca_key: alpacaKey,
        alpaca_secret_key: secretKey,
      };
    }

    // Create the API request
    if (algoquantApi.token) {
      setIsLoading(true);
      algoquantApi
        .resetBalance(requestBody)
        .then((resp) => {
          setIsLoading(false);
          setMessage(resp.data.message);
          handleAccountModals();
          setSuccessfulBalanceReset(true);
          console.log(resp);
        })
        .catch((err) => {
          setIsLoading(false);
          setSuccessfulBalanceReset(false);
          setError("Keys provided are invalid. try again.");
          console.log(err);
        });
    }
  };

  /*
  There are 4 different variations of Modals depending on the user input. This switch statement will handle
  each case and render the appropriate Modal.
  */
  switch (modalType) {
    case ModalTypes.reset_alpaca:
      return (
        <Modal isVisible={accountModal.visible} onClose={handleClose}>
          <div className="bg-smokewhite p-2 rounded border border-light-gray">
            <div className="p-6">
              <h3 className="text-3xl font-bold text-light-gray mb-5">
                Reset Balance
              </h3>
              <p className="text-light-gray font-medium mb-5 text-xl">
                Resetting Balance requires new Alpaca Keys
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
                NOTE: Your active jobs will be terminated.
              </p>
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
                className="text-white bg-green py-2 px-6 rounded shadow-md"
                onClick={() => {
                  submitRequest();
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal>
      );

    case ModalTypes.connect:
      return (
        <Modal isVisible={accountModal.visible} onClose={handleClose}>
          <div className="bg-cokewhite p-2 rounded border-2 border-green">
            <div className="p-6">
              <h3 className="text-3xl font-bold text-green mb-5">
                Please provide your Alpaca Keys
              </h3>
              <p className="text-green font-medium mb-5 text-xl">
                Please enter Alpaca API Key
              </p>
              <input
                className="bg-smokewhite mb-5 focus:outline-none focus:shadow-outline py-2 px-4 block w-2/3 appearance-none leading-normal shadow-md caret-white text-white"
                type="text"
                placeholder="Alpaca Key"
                onChange={handleAlpacaKey}
              />
              <p className="text-green font-medium mb-5 text-xl">
                Please enter Alpaca Secret Key
              </p>
              <input
                className="bg-smokewhite mb-5 focus:outline-none focus:shadow-outline py-2 px-4 block w-2/3 appearance-none leading-normal shadow-md caret-white text-white"
                type="text"
                placeholder="Secret Key"
                onChange={handleSecretKey}
              />
              <p className="text-red">{error}</p>
              <p className="text-faded-dark-gray">
                NOTE: Connecting to Alpaca will terminate any progress with your
                simulated account
              </p>
              {isLoading ? <SaveSpinner /> : <></>}
            </div>
            <div className="p-6 flex justify-between">
              <button
                className="text-green bg-smokewhite py-2 px-4 rounded shadow-md"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="text-white bg-green hover:bg-selection-green py-2 px-4 rounded shadow-md"
                onClick={() => {
                  submitRequest();
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </Modal>
      );

    // The reset_simulated an disconnect modals are identical with just a different title
    case ModalTypes.reset_simulated:
    case ModalTypes.disconnect:
      return (
        <Modal isVisible={accountModal.visible} onClose={handleClose}>
          <div className="bg-cokewhite p-2 rounded border-2 border-another-gray">
            <div className="p-6">
              <h3 className="text-3xl font-bold text-another-gray mb-5">
                {" "}
                {modalType === ModalTypes.disconnect
                  ? "Disconnect Alpaca"
                  : "Reset Balance"}
              </h3>
              <p className="text-green font-medium mb-5 text-xl">
                {modalType === ModalTypes.disconnect
                  ? "Are you sure you want to disconnect from Alpaca? Doing this will terminate all jobs and reset account to a simulated balance of $100,000."
                  : "Are you sure you want to reset your balance? Doing this will terminate all jobs and reset account to $100,000."}
              </p>
            </div>
            <p className="text-red">{error}</p>
            {isLoading ? <SaveSpinner /> : <></>}
            <div className="p-6 flex justify-between">
              <button
                className="text-green bg-smokewhite py-2 px-4 rounded shadow-md"
                onClick={handleClose}
                data-testid="submit-button"
              >
                Cancel
              </button>
              <button
                className="text-green bg-light-gray hover:bg-another-gray hover:text-smokewhite py-2 px-4 rounded shadow-md"
                onClick={submitRequest}
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal>
      );
    default:
  }
};

export default AccountModal;
