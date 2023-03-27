import { React, useContext } from "react";
import Modal from "../Modal";
import AlgoquantApiContext from "../../../api/ApiContext";
import { ToastContext } from "../../reusable/ToastContext";

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
    setDeleteInvestorModal(null);
    if (algoquantApi.token) {
      algoquantApi
        .deleteInvestor(investor?.investor_id)
        .then((resp) => {
          console.log(resp.data);
          console.log("investor deleted");
          showToast("Investor sucessfully deleted.", "success");
          setDeleted(true);
        })
        .catch((err) => {
          // TODO: Need to implement better error handling
          console.log("from handleDelete: ", err);
          showToast(err.message, "error");
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
