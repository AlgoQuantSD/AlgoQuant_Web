import React, {
  useRef,
  useCallback,
  useContext,
  useState,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  BsFillArrowRightCircleFill,
  BsCaretDownFill,
  BsFillCaretUpFill,
} from "react-icons/bs";
import AlgoquantApiContext from "../../api/ApiContext";
import { SaveSpinner } from "../reusable/LoadSpinner";
import { tabFilters } from "../utils/hometabFilterEnum";
import { ToastContext } from "../reusable/ToastContext";

const JobGallery = ({ type, investorID }) => {
  const navigate = useNavigate();
  // Context to to show if deletion of the investor was sucessful or not from the home screen toast notifications
  const { showToast } = useContext(ToastContext);

  /*
  Function called anytime a user selects View Job in the Job Gallery. Will navigate
  a user to the Job page passing in the value.
  */
  const viewJob = (value, type) => {
    navigate("/job", { state: { value: value, type: type } });
  };
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

  const NoDataString =
    type === tabFilters.JOB || type === null
      ? "Currently there are no active jobs..."
      : "Currently there are no past jobs...";
  // CallBack function that fetchs for job list data in a paginiated manner
  const getjobList = useCallback(() => {
    if (algoquantApi.token) {
      setIsLoading(true);
      algoquantApi
        .getJobList(type, investorID, lekJobId)
        .then((resp) => {
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
          showToast(err.toString(), "error");
          setIsLoading(false);
          console.log(err);
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
    type,
    investorID,
    showToast,
  ]);

  // Function to call more data job data (if there is more) once user scrolled to the bottom of the component
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight === scrollHeight) {
      if (!lastQuery) {
        getjobList();
      }
    }
  };

  // Used to call the initial job list when the user switches to job tab
  useEffect(() => {
    if (jobList.length === 0 && lekJobId === null && !lastQuery) {
      getjobList();
    }
    // eslint-disable-next-line
  }, [algoquantApi, jobList, lekJobId, lastQuery]);

  // useeffect to clear out previous data
  useEffect(() => {
    setJobList([]);
    setlekJobId(null);
    setLastQuery(false);
    // eslint-disable-next-line
  }, [type]);
  return (
    <div
      ref={divRef}
      onScroll={handleScroll}
      className="mt-4 p-4 h-96 overflow-auto"
    >
      {jobList.length === 0 && !isLoading ? (
        <p className="text-center font-medium text-green">{NoDataString}</p>
      ) : (
        jobList.map((job, i) => (
          <div
            className={`w-11/12 text-white mx-auto mb-5 p-4 ${
              job.status === "stopping" ? "bg-red" : "bg-green"
            }`}
            key={job.job_id}
          >
            <div className="flex justify-between">
              <div className="flex w-1/3">
                <p className="text-cokewhite text-xl font-medium self-center">
                  {job.name}
                </p>
              </div>

              <div className="flex w-1/3 justify-center py-2">
                <p className="text-cokewhite text-xl font-medium self-center">
                  ${Math.abs(job.total_job_val).toFixed(2)} (
                  {job.percentage_change}%)
                </p>
                {job.percentage_change >= 0 ? (
                  <BsFillCaretUpFill className="ml-2 self-center text-md text-bright-green" />
                ) : (
                  <BsCaretDownFill className="ml-2 self-center text-md text-red" />
                )}
              </div>

              <div className="flex w-1/3 justify-end items-center ">
                <img
                  src={job.image_id}
                  alt=""
                  className="h-10 self-center w-8"
                />
                {job.status !== "stopping" && (
                  <button
                    onClick={() => {
                      viewJob(job.job_id, type);
                    }}
                  >
                    <BsFillArrowRightCircleFill className="mt-3 ml-4 text-2xl text-cokewhite hover:text-light-gray" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      )}
      {isLoading && <SaveSpinner />}
    </div>
  );
};

export default JobGallery;
