import React, { useContext, useState } from "react";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AlgoquantApiContext from "../../api/ApiContext";
import Banner from "../reusable/Banner";
import { LoadSpinner } from "../reusable/LoadSpinner";

const AIConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);
  // store error and show on banner
  const [errorMsg, setErrorMsg] = useState("");
  // loading
  const [isLoading, setIsLoading] = useState(false);
  const handleConfirmButton = () => {
    if (algoquantApi.token) {
      setIsLoading(true);
      algoquantApi
        .createInvestor(
          null,
          null,
          location.state.value.image_id, // UPDATE NEED TO PUT IMAGE ID HERE
          location.state.value.investorName,
          parseFloat(location.state.value.lossStop) / 100, // will need to update this so we dont do this here
          null,
          parseFloat(location.state.value.profitStop) / 100, // will need to update this so we dont do this here
          "A"
        )
        .then((resp) => {
          console.log(resp.data);
          setIsLoading(false);
          navigate("/home");
        })
        .catch((err) => {
          // TODO: Need to implement better error handling
          console.log(err);
          setIsLoading(false);
          setErrorMsg("Error: Failed to create AI investor. Try again later.");
        });
    }
  };
  console.log("error:", errorMsg);
  return (
    <div className="bg-cokewhite overflow-x-auto overflow-y-auto">
      {errorMsg === "" ? (
        <></>
      ) : (
        <Banner message={errorMsg} setMessage={setErrorMsg} />
      )}
      <Navbar />
      <div className="flex self-stretch">
        <Sidebar />
        {isLoading ? (
          <div className="sm:w-3/4 md:w-5/6 lg:w-7/8 p-5">
            <LoadSpinner />
          </div>
        ) : (
          <div className="sm:w-3/4 md:w-5/6 lg:w-7/8 p-5">
            <div className="flex flex-col pt-10">
              <h1 className="text-green font-bold text-5xl">
                AI Investor Confirmation
              </h1>
              <p className="mt-3 text-another-gray text-lg font-light">
                Please review over the information and confirm that it is
                correct.
              </p>
            </div>
            <div className="grid grid-cols-2 mt-5 w-1/3">
              <div className="flex flex-col">
                <p className="text-green text-2xl font-semibold mb-5">
                  Investor Name:
                </p>
                <p className="text-green text-2xl font-semibold mb-5">
                  Profit Stop:
                </p>
                <p className="text-green text-2xl font-semibold mb-5">
                  Loss Stop:
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-green text-2xl font-medium mb-5">
                  {location.state.value.investorName}
                </p>
                <p className="text-green text-2xl font-medium mb-2">
                  {location.state.value.profitStop === null
                    ? "N/A"
                    : `${location.state.value.profitStop}%`}
                </p>
                <p className="text-green text-2xl font-medium mb-2">
                  {location.state.value.lossStop === null
                    ? "N/A"
                    : `${location.state.value.lossStop}%`}
                </p>
              </div>
            </div>

            {/* Create Investor Button */}
            <div className="mt-10">
              <button
                className="text-cokewhite font-medium rounded-lg bg-green px-4 py-2"
                onClick={handleConfirmButton}
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIConfirmationPage;
