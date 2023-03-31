import React, { useState, useContext, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";
import investorPhotos from "../../assets/images/investors/InvestorPhotos";
import bot from "../../assets/images/investors/bot1.png";
import JobModal from "../singular/Modals/JobModal";
import DeleteInvestorModal from "../singular/Modals/DeleteInvestorModal";
import AlgoquantApiContext from "../../api/ApiContext";
import JobGallery from "../singular/JobGallery";
import { tabFilters } from "../utils/hometabFilterEnum";
import { LoadSpinner } from "../reusable/LoadSpinner";
import Banner from "../reusable/Banner";

const InvestorViewPage = () => {
  const navigate = useNavigate();

  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);
  const location = useLocation();
  const [jobModal, setJobModal] = useState(null);
  const [deleteInvestorModal, setDeleteInvestorModal] = useState(null);

  // State variable to hold investor object returned from get-investor endpoint
  const [investor, setInvestor] = useState(null);

  // used to keep track of what jobs to pull either active or past jobs, uses the tabFilter enum
  const [buttonStatus, setButtonStatus] = useState(tabFilters.JOB);
  // loading
  const [isLoading, setIsLoading] = useState(true);

  const [bannerMsg, setBannerMsg] = useState("");

  // used to trigger banner/toast if the delete was successful or not
  const [successfulDelete, setSuccessfulDelete] = useState(null);
  // used to signify if the investors's job was created/started properly.
  const [successfulStartJob, setSuccessfulStartJob] = useState(null);

  // Function called anytime a user selects Start Backtest in the dropdown. Will navigate a user to the Backtest page passing in the value.
  const startBacktest = (value) => {
    navigate("/createbacktest", { state: { value: value } });
  };

  // CallBack function that fetchs for job list data in a paginiated manner
  const getInvestor = useCallback(() => {
    if (algoquantApi.token) {
      setIsLoading(true);
      algoquantApi
        .getInvestor(location.state.value)
        .then((resp) => {
          setIsLoading(false);
          console.log(resp.data);
          setInvestor(resp.data);
        })
        .catch((err) => {
          setIsLoading(false);
          setBannerMsg(err.toString());
        });
    }
  }, [algoquantApi, location, setInvestor]);

  // if button is clicked switch between active or past jobs
  const handleTradeButton = () => {
    console.log("pressed");
    buttonStatus === tabFilters.JOB
      ? setButtonStatus(tabFilters.HISTORY)
      : setButtonStatus(tabFilters.JOB);
  };

  useEffect(() => {
    console.log("investorview useeffect");
    getInvestor();
  }, [getInvestor]);

  useEffect(() => {
    // when rendered successfulDelet/successfulStartJobe is set to null, if it is set to falae or true go back to homepage to display confirmation or error
    if (successfulDelete !== null || successfulStartJob != null) {
      navigate("/home");
    }
    // eslint-disable-next-line
  }, [successfulDelete, successfulStartJob]);

  return (
    <div className="bg-cokewhite overflow-x-auto overflow-y-auto">
      {bannerMsg === "" ? (
        <></>
      ) : (
        <Banner message={bannerMsg} setMessage={setBannerMsg} type="error" />
      )}
      <Navbar />
      <div className="flex self-stretch">
        <Sidebar />
        <div className="sm:w-3/4 md:w-5/6 lg:w-7/8 p-5">
          {isLoading ? (
            <LoadSpinner />
          ) : (
            <div className="sm:w-3/4 md:w-5/6 lg:w-7/8 p-5">
              <JobModal
                setJobModal={setJobModal}
                jobModal={jobModal}
                investor={investor}
                setSuccessfulStartJob={setSuccessfulStartJob}
              />
              <DeleteInvestorModal
                setDeleteInvestorModal={setDeleteInvestorModal}
                deleteInvestorModal={deleteInvestorModal}
                investor={investor}
                setDeleted={setSuccessfulDelete}
              />
              <div className="flex pt-10 justify-between">
                <div className="">
                  <h1 className="text-green font-bold text-5xl mb-10">
                    {investor?.investor_name} Investor
                  </h1>
                </div>

                <div className="">
                  <button
                    className="items-center text-white font-medium rounded-lg bg-red px-4 py-3"
                    onClick={() => {
                      setDeleteInvestorModal(true);
                    }}
                  >
                    Delete Investor
                  </button>
                </div>
              </div>

              <button
                className="items-center text-white font-medium rounded-lg bg-green px-4 py-3 hover:bg-selection-green"
                onClick={() => {
                  setJobModal(true);
                }}
              >
                Create New Job
              </button>
              <button
                className="px-4 py-3 text-green font-medium hover:bg-smokewhite rounded-lg border-2 border-green ml-4"
                onClick={() => {
                  startBacktest(investor);
                }}
              >
                Start a Backtest
              </button>

              <div className="flex h-2/5">
                <div className="flex justify-center w-1/2">
                  {investor?.type === "I" ? (
                    // Find out how to receive the photo associated with the selected investor
                    <img
                      src={investorPhotos[10 % investorPhotos.length]}
                      alt=""
                      className="h-80 mt-6 mb-6"
                    />
                  ) : (
                    <img src={bot} alt="bot" className="h-72 mt-12" />
                  )}
                </div>
                <div className="flex justify-center">
                  <div className="block max-w-sm w-full md:max-w-md lg:max-w-lg   rounded-lg bg-green text-center shadow-lg dark:bg-neutral-700">
                    <div className="border-b-2 border-white py-3 px-6 dark:border-neutral-600 dark:text-neutral-50">
                      <p className="text-green text-3xl text-white font-semibold">
                        Investor Configuration
                      </p>
                    </div>
                    <div className="p-4">
                      <table className="table-auto md:table-fixed w-full">
                        <tbody>
                          <tr>
                            <td className="px-4 py-2 text-xl text-white font-semibold">
                              Profit Stop:
                            </td>
                            <td className="px-4 py-2 text-lg text-white">
                              {(
                                parseFloat(investor?.profit_stop) * 100
                              ).toFixed(2)}
                              %
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-xl text-white font-semibold">
                              Loss Stop:
                            </td>
                            <td className="px-4 py-2 text-lg text-white">
                              {(parseFloat(investor?.loss_stop) * 100).toFixed(
                                2
                              )}
                              %
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-xl font-semibold text-white">
                              Stock Ticker:
                            </td>
                            <td className="px-4 py-2 text-lg text-white">
                              {investor?.assets_to_track.map(
                                (ticker, index) => (
                                  <span key={index}>
                                    {index > 0 && ", "}
                                    {ticker}
                                  </span>
                                )
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-xl font-semibold text-white">
                              Indicators:
                            </td>
                            <td className="px-4 py-2 text-lg text-white">
                              {investor?.indicators.map((indicator, index) => (
                                <span key={index}>
                                  {index > 0 && ", "}
                                  {indicator}
                                </span>
                              ))}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-xl font-semibold text-white pb-10">
                              Type:
                            </td>
                            <td className="px-4 py-2 text-lg text-white pb">
                              {investor?.type === "I"
                                ? "Algorithmic"
                                : "Artifical Intelligence"}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-xl font-semibold text-white pb-10">
                              Frequency:
                            </td>
                            <td className="px-4 py-2 text-lg text-white pb">
                              {investor?.frequency}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 mx-auto w-full">
                <div className="flex justify-between items-center pt-8">
                  <h1 className="text-green font-bold text-3xl ">
                    {investor?.investor_name}'s Recent Jobs
                  </h1>
                  <button
                    className="bg-cokewhite hover:bg-smokewhite items-center text-green font-medium rounded-lg border-2 border-green px-4 py-3 mt-3"
                    onClick={handleTradeButton}
                  >
                    {buttonStatus === tabFilters.JOB
                      ? "View past jobs"
                      : "View active jobs"}
                  </button>
                </div>
                <JobGallery
                  type={buttonStatus}
                  investorID={location.state.value}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestorViewPage;
