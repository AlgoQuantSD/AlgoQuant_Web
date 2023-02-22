import React from "react";
import { Link } from "react-router-dom";
import investorPhotos from "../../assets/images/investors/InvestorPhotos";
import {
  BsFillArrowRightCircleFill,
  BsCaretDownFill,
  BsFillCaretUpFill,
} from "react-icons/bs";

const JobGallery = () => {
  const jobs = [
    {
      name: "Warren Buffett",
      indicators: ["RSI", "MACD", "OBV"],
      recentPrice: "128.34",
      percentChanged: "4.8",
      open: "50",
      id: "investor",
    },
    {
      name: "Money Maker",
      indicators: ["RSI", "MACD", "OBV"],
      recentPrice: "128.34",
      percentChanged: "4.8",
      open: "50",
      id: "bot",
    },
    {
      name: "Jordan Belfort",
      indicators: ["RSI", "MACD", "OBV"],
      recentPrice: "128.34",
      percentChanged: "4.8",
      open: "50",
      id: "investor",
    },
    {
      name: "Jordan Belfort's Cat",
      indicators: ["RSI", "MACD", "OBV"],
      recentPrice: "128.34",
      percentChanged: "4.8",
      open: "50",
      id: "investor",
    },
    {
      name: "Warren Buffett's Left Nut",
      indicators: ["RSI", "MACD", "OBV"],
      recentPrice: "128.34",
      percentChanged: "4.8",
      open: "130",
      id: "investor",
    },
    {
      name: "Warren Buffett's Blow",
      indicators: ["RSI", "MACD", "OBV"],
      recentPrice: "128.34",
      percentChanged: "4.8",
      open: "50",
      id: "investor",
    },
  ];

  return (
    <div className="mt-14 p-4">
      {jobs.map((job, i) => (
        <div
          className="w-11/12 text-white bg-green mx-auto mb-5 p-4"
          key={job.name}
        >
          <div className="flex justify-between">
            <div className="flex w-1/3">
              <p className="text-cokewhite text-xl font-medium self-center">
                {job.name}'s Job
              </p>
            </div>

            <div className="flex w-1/3 justify-center py-2">
              <p className="text-cokewhite text-xl font-medium self-center">
                {job.recentPrice - job.open >= 0 ? "+" : "-"} $
                {Math.abs(job.recentPrice - job.open).toFixed(2)} (
                {job.percentChanged}%)
              </p>
              {job.recentPrice - job.open >= 0 ? (
                <BsFillCaretUpFill className="ml-2 self-center text-md text-bright-green" />
              ) : (
                <BsCaretDownFill className="ml-2 self-center text-md text-red" />
              )}
            </div>

            <div className="flex w-1/3 justify-center">
              <img
                src={investorPhotos[i % investorPhotos.length]}
                alt=""
                className="h-10 self-center w-8"
              />
              <Link to="/job">
                <BsFillArrowRightCircleFill className="mt-3 ml-4 text-2xl text-cokewhite hover:text-light-gray" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobGallery;
