import { React, useContext, useState } from "react";
import Modal from "../Modal";
import AlgoquantApiContext from "../../../api/ApiContext";
import { ToastContext } from "../../reusable/ToastContext";
import { SaveSpinner } from "../../reusable/LoadSpinner";

const DeleteInvestorModal = ({
  setDeleteInvestorModal,
  deleteInvestorModal,
  investor,
  setDeleted,
}) => {
  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);
  // Context to to show if deletion of the investor was sucessful or not from the home screen toast notifications
  const { showToast } = useContext(ToastContext);
  const [isLoading, setIsLoading] = useState(null);
  /*
  Callback for whenever the modal is closed either by clicking a cancel button or the onClose 
  attributes of the Modal
  */
  const handleClose = () => {
    setDeleteInvestorModal(null);
  };

  // This function will implement the delete Investor function. For now it just
  // closes the modal.
  const handleDelete = () => {
    if (algoquantApi.token) {
      setIsLoading(true);
      algoquantApi
        .deleteInvestor(investor?.investor_id)
        .then((resp) => {
          setIsLoading(false);
          showToast("Investor sucessfully deleted.", "success");
          setDeleted(true);
          setDeleteInvestorModal(null);
        })
        .catch((err) => {
          setDeleted(false);
          setIsLoading(false);
          setDeleteInvestorModal(null);
          showToast(err.toString(), "error");
        });
    }
  };

  return (
    <Modal isVisible={deleteInvestorModal} onClose={handleClose}>
      <div className="bg-smokewhite p-2 rounded border-4 border-red flex flex-col">
        <div className="p-6">
          <p className="text-2xl font-bold text-red mb-5">
            Are you sure you want to delete{" "}
            {investor && investor?.investor_name}?
          </p>
          <p className="text-lg text-another-gray mb-3">
            NOTE: All of your investors jobs must be stopped before deleting
          </p>
          {isLoading ? <SaveSpinner /> : <></>}
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
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteInvestorModal;
