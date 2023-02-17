import { React } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import BarLoader from "react-spinners/BarLoader";
import GridLoader from "react-spinners/GridLoader";

export const LoadSpinner = () => {
  return (
    <div className=" flex h-screen bg-cokewhite justify-center items-center">
      <PropagateLoader color="hsla(162, 22%, 15%, 1)" size={20} />
    </div>
  );
};

export const SaveSpinner = () => {
  return (
    <div className=" flex bg-cokewhite justify-center items-center">
      <BarLoader color="hsla(162, 22%, 15%, 1)" size={15} />
    </div>
  );
};

export const TableSpinner = () => {
  return (
    <div className=" flex bg-cokewhite justify-center items-center">
      <GridLoader color="hsla(162, 22%, 15%, 1)" size={20} />
    </div>
  );
};
