import { React } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import BarLoader from "react-spinners/BarLoader";
import GridLoader from "react-spinners/GridLoader";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

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

export const TableSpinner = () => {
  return (
    <div className=" flex bg-dark-gray justify-center items-center">
      <GridLoader color="hsla(112, 54%, 41%, 1)" size={20} />
    </div>
  );
};

export const GraphSpinner = () => {
  return (
    <div className=" flex bg-dark-gray justify-center items-center">
      <ClimbingBoxLoader color="hsla(112, 54%, 41%, 1)" size={15} />
    </div>
  );
};
