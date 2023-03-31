import { React, useState, useContext } from "react";
import Modal from "../Modal";
import AlgoquantApiContext from "../../../api/ApiContext";
import { ToastContext } from "../../reusable/ToastContext";
const JobModal = ({ setJobModal, jobModal, investor }) => {
  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);
  // Context to to show if deletion of the investor was sucessful or not from the home screen toast notifications
  const { showToast } = useContext(ToastContext);
  /*
  Callback for whenever the modal is closed either by clicking a cancel button or the onClose 
  attributes of the Modal
  */
  const handleClose = () => {
    setJobModal(null);
  };

  // State variables used to keep track and hold the values a user enters into the input box
  const [jobName, setJobName] = useState(null);
  const [initInvestment, setInitInvestment] = useState(null);

  // Function to update the jobName variable with what the user enters when input is changed/used
  const handleJobNameInput = (event) => {
    setJobName(event.target.value);
  };

  // Function to update the initInvestment variable with what the user enters when input is changed/used
  const handleInitInvestmentInput = (event) => {
    setInitInvestment(event.target.value);
  };

  // Function to start a job based on investor and input from user, attached to a button and close modal
  const handleSubmitStartJob = () => {
    if (algoquantApi.token) {
      algoquantApi
        .createJob(parseInt(initInvestment), investor?.investor_id, jobName)
        .then((resp) => {
          console.log(resp.data);
          showToast(jobName + " job has successfully started", "success");
        })
        .catch((err) => {
          showToast(jobName + " job has failed to start", "error");
          console.log("Create-Job:", err);
        });
    }
    setJobModal(null);
  };

  return (
    <Modal isVisible={jobModal} onClose={handleClose}>
      <div className="flex justify-center">
        <div className="bg-smokewhite p-2 rounded border-2 border-green">
          <div className="p-6 flex items-center justify-between">
            <h3 className="text-2xl font-bold text-green">
              Start Job for {investor && investor.investor_name} Investor
            </h3>
            <button
              className="text-white bg-green px-2 shadow-md"
              onClick={handleClose}
            >
              X
            </button>
          </div>
          <div className="flex flex-col px-6">
            <p className="text-xl text-green font-semibold mb-3">
              Put your investor to work
            </p>
            <p className="text-md text-another-gray">
              Give your job a name and how much money you want to invest
            </p>
          </div>

          <div className="flex flex-col px-6 pt-3">
            <p className="text-green text-sm text-left">Job Name</p>
            <input
              className="bg-light-gray mb-5 focus:outline-none focus:shadow-outline py-2 px-4 block w-full appearance-none leading-normal shadow-lg caret-green text-green"
              type="text"
              placeholder="Job 1"
              value={jobName}
              onChange={handleJobNameInput}
            />
            <p className="text-green text-sm text-left">Initial Investment</p>
            <input
              className="bg-light-gray mb-5 focus:outline-none focus:shadow-outline py-2 px-4 block w-full appearance-none leading-normal shadow-lg caret-green text-green"
              type="number"
              placeholder="100"
              value={initInvestment}
              onChange={handleInitInvestmentInput}
            />
          </div>
          <div className="p-6 flex justify-end">
            <button
              className="text-white bg-green py-2 px-6 rounded shadow-md"
              onClick={handleSubmitStartJob}
            >
              Start Job
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default JobModal;
