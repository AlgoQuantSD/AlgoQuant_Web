import { React, useState } from "react";

const LoadSpinner = () => {
  return (
    <div className="w-full h-screen bg-dark-gray overflow-hidden .md:bg-clip-padding">
      <div className="flex justify-center items-center bg-dark-gray">
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default LoadSpinner;
