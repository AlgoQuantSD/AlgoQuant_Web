import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

function ToastNotification({ isOpen, type, message, icon, handleClose }) {
  const getIconClass = () => {
    switch (type) {
      case "success":
        return "text-green-500";
      case "warning":
        return "text-yellow-500";
      case "error":
        return "text-red-500";
      default:
        return "text-purple-500";
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        handleClose();
      }, 3500);
    }
    // eslint-disable-next-line
  }, [isOpen]);

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } fixed bottom-0 right-0 mb-4 mr-4 z-50 px-4 py-3 rounded-md ${getIconClass()} border border-solid border-opacity-60 border-current bg-white shadow-md`}
      role="alert"
    >
      <div className="flex items-center">
        {icon && <div className="mr-2">{icon}</div>}
        <div className="flex-grow">{message}</div>
        <div className="ml-2">
          <button onClick={handleClose}>
            <AiOutlineClose className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ToastNotification;
