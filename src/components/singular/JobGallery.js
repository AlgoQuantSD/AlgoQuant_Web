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
import { SaveSpinner } from "../reusable/LoadSpinner";

const JobGallery = () => {
  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);

  // Reference to the div that holds the list of jobs shown
  const divRef = useRef();
  // State variable to hold array of job objects
  const [jobList, setJobList] = useState([]);

  // Used for pagination of the job list data
  // last evaluated key - used for the api to know if there is more data to fetch
  // lastQUery - true if last evaluated key comes back undefined, aka no more queries
  const [lekJobId, setlekJobId] = useState(null);
  const [lastQuery, setLastQuery] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  // CallBack function that fetchs for job list data in a paginiated manner
  const getjobList = useCallback(() => {
    if (algoquantApi.token) {
      setIsLoading(true);
      algoquantApi
        .getJobList("active", null, lekJobId)
        .then((resp) => {
          console.log("job endpoint");
          setlekJobId(resp.data.LEK_job_id);
          setJobList(jobList.concat(resp.data.jobs));

          if (resp.data.LEK_job_id === undefined) {
            setLastQuery(true);
          } else {
            setlekJobId(resp.data.LEK_job_id);
          }

          setIsLoading(false);
        })
        .catch((err) => {
          // TODO: Need to implement better error handling
          console.log(err.body);
        });
    }
  }, [
    algoquantApi,
    setlekJobId,
    setLastQuery,
    setJobList,
    setIsLoading,
    jobList,
    lekJobId,
  ]);

  // Function to call more data job data (if there is more) once user scrolled to the bottom of the component
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

  // Used to call the initial job list when the user switches to job tab
  useEffect(() => {
    getjobList();
    // eslint-disable-next-line
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
              <Link to="/job">
                <BsFillArrowRightCircleFill className="mt-3 ml-4 text-2xl text-cokewhite hover:text-light-gray" />
              </Link>
            </div>
          </div>
        </div>
      ))}
      {isLoading && <SaveSpinner />}
    </div>
  );
};

export default JobGallery;
