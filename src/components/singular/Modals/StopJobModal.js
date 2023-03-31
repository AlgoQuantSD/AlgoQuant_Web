import { React, useContext, useState } from "react";
import Modal from "../Modal";
import { useNavigate } from "react-router-dom";
import AlgoquantApiContext from "../../../api/ApiContext";

const StopJobModal = ({ setStopJobModal, stopJobModal, jobObj }) => {
  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  /*
  Callback for whenever the modal is closed either by clicking a cancel button or the onClose 
  attributes of the Modal
  */
  const handleClose = () => {
    setErrorMsg("");
    setStopJobModal(null);
  };

  // This function will implement the Stop Job function. For now it just
  // closes the modal.
  const handleStop = () => {
    if (algoquantApi.token) {
      algoquantApi
        .stopJob(jobObj.job_id)
        .then((resp) => {
          console.log(resp.data);
          navigate("/home");
          setStopJobModal(null);
        })
        .catch((err) => {
          console.log(err);
          setErrorMsg("Failed to stop job. Try again later.");
        });
    }
  };

  return (
    <Modal isVisible={stopJobModal} onClose={handleClose}>
      <div className="bg-smokewhite p-2 rounded border-4 border-red flex flex-col">
        <div className="p-6">
          <p className="text-2xl font-bold text-red mb-5">
            Are you sure you want to stop {jobObj && jobObj.name}'s Job?
          </p>
          <p className="text-lg text-another-gray mb-3">
            NOTE: All the assets tracked by this job will be sold
          </p>
          <p className="text-red">{errorMsg}</p>
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
