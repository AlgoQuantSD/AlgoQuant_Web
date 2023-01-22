import { React,useState } from "react";
import Modal from "../Modal";
import { Auth } from "aws-amplify";

const EmailModal = ({ setEmailModal, emailModal}) => {

  // Keep track of the user provided verification code
  const [verificationCode, setVerificationCode] = useState(null);

  // Used to display error messages on the modal
  const [error,setError] = useState("")

  const handleCode = (event) => {
    setVerificationCode(event.target.value);
  };

  // Used when the user attempts to submit their verification code 
  const submitCode = async () => {
    try {
    await Auth.verifyCurrentUserAttributeSubmit('email', verificationCode).then(() => {
        setEmailModal(false)
    })
  } catch (error) {
    setError("Invalid verification code")
  }   
  };

  return (
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
          <p className="text-red font-light mb-5 text-xl">
            {error}
          </p>
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
            onClick={submitCode}
          >
            Verify
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default EmailModal;
