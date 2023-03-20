import React, { useState } from "react";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";
import { useNavigate } from "react-router-dom";

const CreateAIPage = () => {
  const navigate = useNavigate();
  const [investorName, setInvestorName] = useState(null);
  const [showError, setShowError] = useState(false);
  const [profitStop, setProfitStop] = useState(null);
  const [lossStop, setLossStop] = useState(null);

  /*
  Function called when the user attempts to save changes. Will check all the user values and 
  attempt to update them.
  */
  const saveChanges = () => {
    if (investorName === null || investorName.trim().length < 2) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3500); // hide the error message after 3.5 seconds
      return;
    } else {
      let value = {
        investorName: investorName,
        profitStop: profitStop,
        lossStop: lossStop,
      };
      createInvestor(value);
    }
  };

  // Function called anytime a user hits Create Investor with all of the fields correctly inputted
  // This will send all the input data to the backend to create a new investor
  const createInvestor = (value) => {
    navigate("/aiconfirmation", { state: { value: value } });
  };

  return (
    <div className="bg-cokewhite overflow-x-auto overflow-y-auto">
      <Navbar />
      <div className="flex self-stretch">
        <Sidebar />
        <div className="sm:w-3/4 md:w-5/6 lg:w-7/8 p-5">
          <div className="flex pt-10">
            <h1 className="text-gold font-bold text-5xl">Create AI Investor</h1>
          </div>
          <div className="flex w-full">
            {/* Name */}
            <div className="flex flex-col w-1/2">
              <div className="p-3 mt-6">
                <p className="text-green text-2xl font-semibold mb-2">
                  What do you want to call your investor?
                </p>
                <input
                  className="bg-smokewhite focus:outline-none focus:shadow-outline py-2 px-4 block font-medium text-xl appearance-none leading-normal shadow-md caret-green text-green"
                  type="text"
                  placeholder={"Investor Name"}
                  onChange={(event) => {
                    setInvestorName(event.target.value);
                  }}
                />
              </div>

              {/* Set Conditions */}
              <div className="mb-6 p-3 flex flex-col ">
                <p className="text-green text-2xl font-semibold mb-2">
                  Set Conditions
                </p>

                {/* Profit Stop */}
                <div className="flex">
                  <div className="flex flex-col p-4 w-5/12">
                    <p className="text-green text-xl font-medium">
                      Profit Stop
                    </p>
                    <p className="text-another-gray text-md font-light">
                      The percentage gain at which you want the strategy to end
                    </p>
                  </div>
                  <div className="flex items-center w-3/4">
                    <input
                      className="outline-none focus:outline-none text-center w-20 bg-smokewhite font-semibold text-md cursor-default flex items-center text-green outline-none"
                      type="number"
                      placeholder={null}
                      onChange={(event) => {
                        setProfitStop(event.target.value);
                      }}
                    />
                  </div>
                </div>

                {/* Loss Stop */}
                <div className="flex">
                  <div className="flex flex-col p-4 w-5/12">
                    <p className="text-red text-xl font-medium">Loss Stop</p>
                    <p className="text-another-gray text-md font-light">
                      The percentage loss at which you want the strategy to end
                    </p>
                  </div>
                  <div className="flex items-center w-3/4">
                    <input
                      className="outline-none focus:outline-none text-center w-20 bg-smokewhite font-semibold text-md cursor-default flex items-center text-green outline-none"
                      type="number"
                      placeholder={null}
                      onChange={(event) => {
                        setLossStop(event.target.value);
                      }}
                    />
                  </div>
                </div>

                {/* Create Investor Button */}
                <div className="p-3 mt-10">
                  <button
                    className="text-cokewhite font-medium rounded-lg bg-green px-4 py-2"
                    onClick={() => {
                      saveChanges();
                    }}
                  >
                    Create Investor
                  </button>
                  {showError ? (
                    <p className="text-red mt-3">
                      Please fill out all fields before creating an investor
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="flex flex-col w-1/2 h-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAIPage;
