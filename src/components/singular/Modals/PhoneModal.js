import { React } from "react";
import Modal from "../Modal";
import { Auth } from "aws-amplify";

const PhoneModal = ({ setPhoneModal, phoneModal, handleCode, code }) => {
  return (
    <Modal isVisible={phoneModal} onClose={() => setPhoneModal(false)}>
      <div className="bg-dark-gray p-2 rounded border border-light-gray">
        <div className="p-6">
          <h3 className="text-3xl font-bold text-light-gray mb-5">
            Verify Phone Number
          </h3>
          <p className="text-light-gray font-light mb-5 text-xl">
            Please enter the code sent to your new phone number
          </p>
          <input
            className="bg-faded-dark-gray mb-5 focus:outline-none focus:shadow-outline py-2 px-4 block w-2/3 appearance-none leading-normal shadow-md caret-white text-white"
            type="text"
            placeholder="Verification Code"
            onChange={handleCode}
          />
        </div>
        <div className="p-6 flex justify-between">
          <button
            className="text-white bg-another-gray py-2 px-6 rounded shadow-md"
            onClick={() => setPhoneModal(false)}
          >
            Cancel
          </button>
          <button
            className="text-white bg-green py-2 px-6 rounded shadow-md"
            onClick={async () => {
              var verificationCode = code.value;
              // console.log(verificationCode);
              const result = await Auth.verifyCurrentUserAttributeSubmit(
                "email",
                verificationCode
              ).then(() => {
                setPhoneModal(false);
              });
              console.log(result);
            }}
          >
            Verify
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default PhoneModal;
