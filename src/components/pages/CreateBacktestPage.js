import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Calendar, utils } from "@hassanmojab/react-modern-calendar-datepicker";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";
import AlgoquantApiContext from "../../api/ApiContext";
import { useNavigate } from "react-router-dom";
import Banner from "../reusable/Banner";
import { BacktestSpinner } from "../reusable/LoadSpinner";
import { ToastContext } from "../reusable/ToastContext";
const CreateBacktestPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);
  const { showToast } = useContext(ToastContext);

  // store error and show on banner
  const [errorMsg, setErrorMsg] = useState("");

  // State variables used to keep track of user input
  const [backtestName, setBacktestName] = useState(null);
  const [initialInvestment, setInitialInvestment] = useState(null);

  // State variables used to display error messages to the user
  const [nameError, setNameError] = useState(false);
  const [timeframeError, setTimeframeError] = useState(false);
  const [initialInvestmentError, setInitialInvestmentError] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // State variable used to display a success message to the user
  const [success, setSuccess] = useState(false);
  // Loading
  const [isLoading, setIsLoading] = useState(false);

  // State variable used to keep track of the selected date range
  const today = new Date();
  const defaultFrom = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
  };
  const defaultValue = {
    from: defaultFrom,
    to: null,
  };

  const [selectedDayRange, setSelectedDayRange] = useState(defaultValue);
  const [selectedDayRangeString, setSelectedDayRangeString] = useState("");

  // Extract date formatting logic into a separate function
  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  // Update the selectedDayRangeString state variable whenever the selectedDayRange state variable changes
  useEffect(() => {
    if (selectedDayRange && selectedDayRange.from && selectedDayRange.to) {
      // If the user has selected a start date and an end date
      const fromDate = new Date(
        selectedDayRange.from.year,
        selectedDayRange.from.month - 1,
        selectedDayRange.from.day
      );
      const toDate = new Date(
        selectedDayRange.to.year,
        selectedDayRange.to.month - 1,
        selectedDayRange.to.day
      );
      const rangeString = `${formatDate(fromDate)} - ${formatDate(toDate)}`; // Format the date range string
      // format start
      const startTimeMs = fromDate.getTime();
      const starttimeUnix = Math.floor(startTimeMs / 1000);
      setStartDate(starttimeUnix);
      // format end
      const endTimeMs = toDate.getTime();
      const endtimeUnix = Math.floor(endTimeMs / 1000);
      setEndDate(endtimeUnix);

      setSelectedDayRangeString(rangeString);
    } else if (selectedDayRange && selectedDayRange.from) {
      // If the user has only selected a start date
      const fromDate = new Date(
        selectedDayRange.from.year,
        selectedDayRange.from.month - 1,
        selectedDayRange.from.day
      );
      setSelectedDayRangeString(formatDate(fromDate));
    } else {
      setSelectedDayRangeString("");
    }
  }, [selectedDayRange]);

  // Function to handle saving the user input
  const saveChanges = () => {
    // Check if the user has entered a valid backtest name
    if (backtestName === null || backtestName.trim().length < 2) {
      setNameError(true);
      setTimeout(() => {
        setNameError(false);
      }, 3500); // Hide the error message after 3.5 seconds
      return;
    } else if (
      // Check if the user has selected a valid timeframe
      selectedDayRange === null ||
      selectedDayRange.from === null ||
      selectedDayRange.to === null
    ) {
      setTimeframeError(true);
      setTimeout(() => {
        setTimeframeError(false);
      }, 3500);
      return;
    } else if (initialInvestment === null || initialInvestment < 1) {
      // Check if the user has entered a valid initial investment
      setInitialInvestmentError(true);
      setTimeout(() => {
        setInitialInvestmentError(false);
      }, 3500);
      return;
    } else {
      // If all the user input is valid, display a success message
      if (algoquantApi.token) {
        setIsLoading(true);
        algoquantApi
          .createBacktest(
            location.state.value.investor_id,
            startDate,
            endDate,
            backtestName,
            parseInt(initialInvestment)
          )
          .then((resp) => {
            setSuccess(true);
            setIsLoading(false);
            navigate("/home");
            setSuccess(false);
            showToast(resp.data.message, "success");
          })
          .catch((err) => {
            setSuccess(false);
            setIsLoading(false);
            setErrorMsg(err.toString());
          });
      }
    }
  };

  return (
    <div className="bg-cokewhite overflow-x-auto overflow-y-auto">
      {errorMsg === "" ? (
        <></>
      ) : (
        <Banner message={errorMsg} setMessage={setErrorMsg} type="error" />
      )}
      <Navbar />
      <div className="flex self-stretch">
        <Sidebar />
        {isLoading ? (
          <div className="flex items-center justify-center w-full">
            <BacktestSpinner />
          </div>
        ) : (
          <div className="sm:w-3/4 md:w-5/6 lg:w-7/8 p-5">
            <div className="flex flex-col pt-10">
              <h1 className="text-green font-bold text-5xl">
                Start Backtest for {location.state.value.investor_name}
              </h1>
            </div>
            <div className="flex flex-col pt-3">
              {/* Backtest Name */}
              <h1 className="text-green font-medium text-4xl mt-10">
                Backtest Name
              </h1>
              <p className="text-green text-2xl font-light m-3">
                What would you like to call your backtest?
              </p>
              <input
                className="bg-smokewhite focus:outline-none focus:shadow-outline py-2 px-4 block w-1/2 font-normal text-xl appearance-none leading-normal shadow-md caret-green text-green mb-10 ml-3"
                type="text"
                placeholder={"Backtest #1"}
                onChange={(event) => {
                  setBacktestName(event.target.value);
                }}
              />
              {/* Timeframe */}
              <h1 className="text-green font-medium text-4xl">Timeframe</h1>
              <p className="text-green text-2xl font-light m-3">
                Select the period of time that you would like to test your
                investor against.
              </p>
              <div className="flex flex-col px-24 py-12 font-semibold">
                <Calendar
                  value={selectedDayRange}
                  maximumDate={utils().getToday()}
                  onChange={(value) => {
                    console.log("Selected day range:", value);
                    setSelectedDayRange(value);
                  }}
                  colorPrimary="#1F302B"
                  colorPrimaryLight="#C7C7C7"
                />
                <p className="text-green text-xl font-normal mt-3">
                  Selected Timeframe: {selectedDayRangeString}
                </p>
              </div>

              {/* Initial Investment */}
              <h1 className="text-green font-medium text-4xl">
                Initial Investment
              </h1>
              <p className="text-green text-2xl font-light m-3">
                Provide the amount that you would like to use to test your
                investor.
              </p>
              <input
                className="bg-smokewhite focus:outline-none focus:shadow-outline py-2 px-4 block w-1/2 font-normal text-xl appearance-none leading-normal shadow-md caret-green text-green mb-10 ml-3"
                type="text"
                placeholder={"$0"}
                onChange={(event) => {
                  setInitialInvestment(event.target.value);
                }}
              />
            </div>

            {/* Create Backtest Button */}
            <div className="mt-10">
              <button
                className="text-green font-medium rounded-lg bg-cokewhite hover:bg-smokewhite border-2 border-green px-4 py-2"
                onClick={() => {
                  saveChanges();
                }}
              >
                Start Backtest
              </button>
              {nameError ? (
                <p className="text-red mt-3">
                  Backtest name must be at least 2 characters long
                </p>
              ) : null}
              {timeframeError ? (
                <p className="text-red mt-3">
                  Please select a timeframe for your backtest
                </p>
              ) : null}
              {initialInvestmentError ? (
                <p className="text-red mt-3">
                  Please enter an initial investment amount
                </p>
              ) : null}
              {success ? (
                <p className="text-green mt-3">
                  Backtest successfully created!
                </p>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateBacktestPage;
