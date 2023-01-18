import React from "react";

const Modal = ({ isOpen, toggleModal, children }) => {
  return (
    <div>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            {children}
            <button onClick={toggleModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
