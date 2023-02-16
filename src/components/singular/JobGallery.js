import React from "react";
import investorPhotos from "../../assets/images/investors/InvestorPhotos";

const JobGallery = () => {
  const jobs = [
    {
      name: "Warren Buffett",
      indicators: ["RSI", "MACD", "OBV"],
      status: "$128.34 (4.8%)",
      id: "investor",
    },
    {
      name: "Money Maker",
      indicators: ["RSI", "MACD", "OBV"],
      status: "$128.34 (4.8%)",
      id: "bot",
    },
    {
      name: "Jordan Belfort",
      indicators: ["RSI", "MACD", "OBV"],
      status: "$128.34 (4.8%)",
      id: "investor",
    },
    {
      name: "Jordan Belfort's Cat",
      indicators: ["RSI", "MACD", "OBV"],
      status: "$128.34 (4.8%)",
      id: "investor",
    },
    {
      name: "Warren Buffett's Left Nut",
      indicators: ["RSI", "MACD", "OBV"],
      status: "$128.34 (4.8%)",
      id: "investor",
    },
    {
      name: "Warren Buffett's Left Nut",
      indicators: ["RSI", "MACD", "OBV"],
      status: "$128.34 (4.8%)",
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
          <div className="flex justify-between h-12">
            <p className="text-cokewhite text-xl font-medium self-center">
              {job.name}'s Job
            </p>
            <p className="text-cokewhite text-xl font-medium self-center">
              {job.status}
            </p>
            <img
              src={investorPhotos[i % investorPhotos.length]}
              alt=""
              className="h-10 self-center"
            />
            <div></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobGallery;
