import { React } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import BarLoader from "react-spinners/BarLoader";

export const LoadSpinner = () => {
  return (
    <div className=" flex h-screen bg-dark-gray justify-center items-center">
      <PropagateLoader color="hsla(112, 54%, 41%, 1)" size={20} />
    </div>
  );
};

export const SaveSpinner = () => {
  return (
    <div className=" flex bg-dark-gray justify-center items-center">
      <BarLoader color="hsla(112, 54%, 41%, 1)" size={15} />
    </div>
  );
};
