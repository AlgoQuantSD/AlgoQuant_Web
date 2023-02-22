import { React } from "react";
import Modal from "../Modal";

const JobModal = ({ setJobModal, investor }) => {
  /*
  Callback for whenever the modal is closed either by clicking a cancel button or the onClose 
  attributes of the Modal
  */
  const handleClose = () => {
    setJobModal(null);
  };

  return (
    <Modal isVisible={!!setJobModal} onClose={handleClose}>
      <div className="fixed inset-0 bg-smokewhite p-2 rounded border-4 border-green flex flex-col justify-center">
        <div className="p-6">
          <h3 className="text-2xl font-bold text-green mb-5">
            Start Job for {investor && investor.name}
          </h3>
          <p className="text-xl text-green font-semibold mb-3">
            Put your investor to work
          </p>
          <p className="text-md text-another-gray">
            Give your job a name and how much money you want to invest
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-green text-sm text-left">Job Name</p>
          <input
            className="bg-light-gray mb-5 focus:outline-none focus:shadow-outline py-2 px-4 block w-2/3 appearance-none leading-normal shadow-lg caret-green text-green"
            type="text"
            placeholder="Job 1"
          />
          <p className="text-green text-sm text-left">Initial Investment</p>
          <input
            className="bg-light-gray mb-5 focus:outline-none focus:shadow-outline py-2 px-4 block w-2/3 appearance-none leading-normal shadow-lg caret-green text-green"
            type="text"
            placeholder="$100"
          />
        </div>
        <div className="p-6 flex justify-between">
          <button
            className="text-white bg-another-gray py-2 px-6 rounded shadow-md"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button className="text-white bg-green py-2 px-6 rounded shadow-md">
            Start Job
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default JobModal;
