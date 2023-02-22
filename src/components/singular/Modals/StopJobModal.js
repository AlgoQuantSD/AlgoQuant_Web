import { React } from "react";
import Modal from "../Modal";

const StopJobModal = ({ setStopJobModal, stopJobModal, investor }) => {
  /*
  Callback for whenever the modal is closed either by clicking a cancel button or the onClose 
  attributes of the Modal
  */
  const handleClose = () => {
    setStopJobModal(null);
  };

  // This function will implement the Stop Job function. For now it just
  // closes the modal.
  const handleStop = () => {
    setStopJobModal(null);
  };

  return (
    <Modal isVisible={stopJobModal} onClose={handleClose}>
      <div className="bg-smokewhite p-2 rounded border-4 border-red flex flex-col">
        <div className="p-6">
          <p className="text-2xl font-bold text-red mb-5">
            Are you sure you want to stop {investor && investor.name}'s Job?
          </p>
          <p className="text-lg text-another-gray mb-3">
            NOTE: All of your investor's trades will be permanently deleted
          </p>
        </div>
        <div className="p-6">
          <div className="flex justify-between w-full">
            <button
              className="text-green bg-light-gray py-2 px-6 rounded shadow-md mr-4"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="text-cokewhite bg-red py-2 px-6 rounded shadow-md"
              onClick={handleStop}
            >
              Stop Job
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default StopJobModal;
