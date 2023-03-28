import React, { useState } from "react";
import { AiFillAlert, AiOutlineClose } from "react-icons/ai";
const Banner = ({ message }) => {
  const [showBanner, setShowBanner] = useState(true);
  return (
    <div className="bg-red-500">
      {showBanner ? (
        <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex w-0 flex-1 items-center">
              <span className="flex rounded-lg bg-indigo-800 p-2">
                <AiFillAlert
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              </span>
              <p className="ml-3 truncate font-medium text-white">
                <span className="hidden md:inline">{message}</span>
              </p>
            </div>
            <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
              <button
                type="button"
                onClick={() => setShowBanner(false)}
                className="-mr-1 flex rounded-md p-2 hover:bg-faded-dark-gray focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
              >
                <span className="sr-only">Dismiss</span>
                <AiOutlineClose
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Banner;
