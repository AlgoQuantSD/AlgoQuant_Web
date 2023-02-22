import React, {
  useRef,
  useCallback,
  useContext,
  useState,
  useEffect,
} from "react";
import { Link } from "react-router-dom";
import investorPhotos from "../../assets/images/investors/InvestorPhotos";
import {
  BsFillArrowRightCircleFill,
  BsCaretDownFill,
  BsFillCaretUpFill,
} from "react-icons/bs";
import AlgoquantApiContext from "../../api/ApiContext";

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
    {
      name: "Warren Buffett1",
      indicators: ["RSI", "MACD", "OBV"],
      recentPrice: "128.34",
      percentChanged: "4.8",
      open: "50",
      id: "investor",
    },
    {
      name: "Money Maker1",
      indicators: ["RSI", "MACD", "OBV"],
      recentPrice: "128.34",
      percentChanged: "4.8",
      open: "50",
      id: "bot",
    },
    {
      name: "Jordan Belfort1",
      indicators: ["RSI", "MACD", "OBV"],
      recentPrice: "128.34",
      percentChanged: "4.8",
      open: "50",
      id: "investor",
    },
    {
      name: "Jordan Belfort's Cat1",
      indicators: ["RSI", "MACD", "OBV"],
      recentPrice: "128.34",
      percentChanged: "4.8",
      open: "50",
      id: "investor",
    },
    {
      name: "Warren Buffett's Left Nut1",
      indicators: ["RSI", "MACD", "OBV"],
      recentPrice: "128.34",
      percentChanged: "4.8",
      open: "130",
      id: "investor",
    },
    {
      name: "Warren Buffett's Blow1",
      indicators: ["RSI", "MACD", "OBV"],
      recentPrice: "128.34",
      percentChanged: "4.8",
      open: "50",
      id: "investor",
    },
  ];
  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);
  const divRef = useRef();
  const [jobList, setJobList] = useState([]);
  const [lekJobId, setlekJobId] = useState(null);
  const [lastQuery, setLastQuery] = useState(false);

  const getjobList = useCallback(() => {
    if (algoquantApi.token) {
      algoquantApi
        .getJobList("active", null, lekJobId)
        .then((resp) => {
          console.log(resp.data);
          setlekJobId(resp.data.LEK_job_id);
          setJobList(jobList.concat(resp.data.jobs));

          if (resp.data.LEK_job_id === undefined) {
            setLastQuery(true);
          } else {
            setlekJobId(resp.data.LEK_job_id);
          }
        })
        .catch((err) => {
          // TODO: Need to implement better error handling
          console.log(err.body);
        });
    }
  }, [algoquantApi, jobList, lekJobId]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight === scrollHeight) {
      console.log("Scrolled to the bottom!");
      if (!lastQuery) {
        getjobList();
      }
      // call your function to load more items here
    }
  };

  useEffect(() => {
    getjobList();
  }, [algoquantApi]);

  return (
    <div
      ref={divRef}
      onScroll={handleScroll}
      className="mt-14 p-4 h-96 overflow-auto"
    >
      {jobList.map((job, i) => (
        <div
          className="w-11/12 text-white bg-green mx-auto mb-5 p-4"
          key={job.job_id}
        >
          <div className="flex justify-between">
            <div className="flex w-1/3">
              <p className="text-cokewhite text-xl font-medium self-center">
                {job.name}'s Job
              </p>
            </div>

            <div className="flex w-1/3 justify-center py-2">
              <p className="text-cokewhite text-xl font-medium self-center">
                {job.percentage_change >= 0 ? "+" : "-"} $
                {Math.abs(job.percentage_change).toFixed(2)} (
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
              <Link to="/jobview">
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
