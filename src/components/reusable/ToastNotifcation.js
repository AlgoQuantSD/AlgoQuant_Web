import React, { useEffect } from "react";
import { FaRegSadCry } from "react-icons/fa";
import { BiHappyHeartEyes } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { GiDoctorFace } from "react-icons/gi";

function ToastNotification({ isOpen, type, message, icon, handleClose }) {
  const getbackgroundColor = () => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-purple-500";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <div className="mr-2">
            <BiHappyHeartEyes />
          </div>
        );
      case "error":
        return (
          <div className="mr-2">
            <FaRegSadCry />
          </div>
        );
      default:
        return (
          <div className="mr-2">
            <GiDoctorFace />
          </div>
        );
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
      } fixed bottom-0 right-0 mb-4 mr-4 z-50 px-4 py-3 rounded-md text-white border border-solid border-opacity-60 border-current ${getbackgroundColor()} shadow-md`}
      role="alert"
    >
      <div className="flex items-center">
        {getIcon()}
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
