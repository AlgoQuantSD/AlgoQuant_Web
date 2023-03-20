import { Auth } from "aws-amplify";
import { React, useState } from "react";
import Modal from "../Modal";
import { useAuthenticator } from "@aws-amplify/ui-react";

const DeleteModal = ({ setDeleteModal, deleteModal }) => {
  const { user } = useAuthenticator((context) => [context.user]);

  const [password, setPassword] = useState(null);

  const [error, setError] = useState("");

  const handlePassword = (event) => {
    setPassword({ value: event.target.value });
  };

  const confirmDelete = async () => {
    // Attempt to signin using the provided username and password
    Auth.signIn(user?.attributes?.email, password.value)
      // On sucessful sign in , the user can be deleted
      .then(() => {
        Auth.deleteUser()
          .then(() => {
            Auth.signOut();
          })
          .catch((err) => {
            setError("Error occured while deleting user: " + err.message);
          });
      })
      .catch((err) => {
        setError("Error occured while deleting user: " + err.message);
      });
  };

  /*
  Callback for whenever the modal is closed either by clicking a cancel button or the onClose 
  attributes of the Modal
  */
  const handleClose = () => {
    setError("");
    setDeleteModal(false);
  };

  return (
    <Modal isVisible={deleteModal} onClose={handleClose}>
      <div className="bg-cokewhite p-2 rounded border-2 border-red">
        <div className="p-6">
          <h3 className="text-3xl font-bold text-red mb-5">Delete Account</h3>
          <p className="text-green font-medium mb-5 text-xl">
            Are you sure you want to delete your account?
          </p>
          <p className="text-green font-light mb-5">
            Please enter your password to confirm.
          </p>
          <input
            className="bg-smokewhite mb-5 focus:outline-none focus:shadow-outline py-2 px-4 block w-2/3 appearance-none leading-normal shadow-md caret-white text-white"
            type="text"
            placeholder="Password"
            onChange={handlePassword}
          />
          <p className="text-faded-dark-gray">
            NOTE: You will not be able to recover your account upon deletion.
          </p>
          <p className="text-red">{error}</p>
        </div>
        <div className="p-6 flex justify-between">
          <button
            className="text-green bg-smokewhite py-2 px-4 rounded shadow-md"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="text-white bg-red py-2 px-4 rounded shadow-md"
            onClick={confirmDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
