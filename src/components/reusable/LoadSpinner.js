import { React } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

export const LoadSpinner = () => {
  return (
    <div className=" flex h-screen bg-dark-gray justify-center items-center">
      <PropagateLoader color="hsl(130, 43%, 46%)" size={30} />
    </div>
  );
};

export const SaveSpinner = () => {
    return (
      <div className=" flex bg-dark-gray justify-center items-center">
        <PropagateLoader color="hsl(130, 43%, 46%)" size={30} />
      </div>
    );
  };

