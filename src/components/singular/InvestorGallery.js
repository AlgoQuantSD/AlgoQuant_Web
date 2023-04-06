import React, { useState, useContext, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import InvestorDropdown from "./InvestorDropdown";
import { BsPersonLinesFill } from "react-icons/bs";
import { FaBrain } from "react-icons/fa";
import AlgoquantApiContext from "../../api/ApiContext";
import { SaveSpinner } from "../reusable/LoadSpinner";
import { ToastContext } from "../reusable/ToastContext";

const InvestorGallery = () => {
  const navigate = useNavigate();
  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  // Context to to show if deletion of the investor was sucessful or not from the home screen toast notifications
  const { showToast } = useContext(ToastContext);

  // State variable to store an array of investor objects
  const [investorList, setInvestorList] = useState([]);
  const [investorListLoading, setInvestorListLoading] = useState(true);

  // variable to determine if rerender / fetching the api is needed when deletion is sucessful
  // so we can grab new list of investors to not show the deleted one on screen anymore
  const [successfulDelete, setSuccessfulDelete] = useState(false);
  // CallBack function to get list of investors in bulk
  const getInvestorList = useCallback(() => {
    if (algoquantApi.token) {
      setInvestorListLoading(true);
      algoquantApi
        .getInvestorList()
        .then((resp) => {
          setInvestorList(resp.data["investors"]);
          setInvestorListLoading(false);
        })
        .catch((err) => {
          setInvestorListLoading(false);
          showToast(err.toString(), "error");
          console.log(err);
        });
    }
    // eslint-disable-next-line
  }, [setInvestorList, algoquantApi]);

  // if a investor is deleted through the home screen, this will trigger the investor gallery component to reload to show the investor is gone
  useEffect(() => {
    getInvestorList();
    setSuccessfulDelete(false);
    // eslint-disable-next-line
  }, [successfulDelete]);

  /* 
  Function called anytime a user selects View Investor in the dropdown. Will navigate 
  a user to the Investor page passing in the value. 
  */
  const viewInvestor = (value) => {
    navigate("/investor", { state: { value: value } });
  };

  // Function called anytime a user selects Start Backtest in the dropdown. Will navigate a user to the Backtest page passing in the value.
  const startBacktest = (value) => {
    navigate("/createbacktest", { state: { value: value } });
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
      slidesToSlide: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="mt-14 p-4">
      {investorListLoading ? (
        <SaveSpinner />
      ) : (
        <Carousel
          responsive={responsive}
          infinite={true}
          wipeable={false}
          draggable={false}
          arrows={true}
          keyBoardControl={false}
          // centerMode={true}
        >
          {investorList.map((investor, i) => (
            <div
              className={`h-full w-11/12 text-white bg-green mx-auto p-6 ${
                investor.type === "A" ? "bg-gold border-4 border-green" : ""
              }`}
              key={investor.investor_id}
            >
              {/* Name and logos */}
              <div className="flex justify-between">
                {investor.type === "A" ? (
                  <FaBrain className="text-green text-3xl" />
                ) : (
                  <BsPersonLinesFill className="text-cokewhite text-3xl" />
                )}
                <p className="font-bold text-xl">{investor.investor_name}</p>
                <InvestorDropdown
                  startJob={() => {
                    setSelectedInvestor(investor);
                    console.log(selectedInvestor);
                  }}
                  viewInvestor={() => viewInvestor(investor.investor_id)}
                  deleteInvestor={() => {
                    setSelectedInvestor(investor);
                  }}
                  startBacktest={() => {
                    startBacktest(investor);
                  }}
                  setDeleted={setSuccessfulDelete}
                  investor={investor}
                />
              </div>
              {/* Investor Image */}
              <div className="flex justify-center">
                {investor.type === "I" ? (
                  <img
                    src={investor.image_id}
                    alt="investor"
                    className="h-52 mt-6 mb-6"
                  />
                ) : (
                  <img
                    src={investor.image_id}
                    alt="AI"
                    className="h-72 mt-12"
                  />
                )}
              </div>
              {/* Indicators / Stocks */}
              {investor.type === "I" && (
                <div className="flex flex-col">
                  <div className="flex justify-between pl-16 pr-16">
                    <div className="w-1/4">
                      <p className="flex justify-left font-bold">Indicators</p>{" "}
                      {investor.indicators.map((indicator, i) => (
                        <p key={i} className="flex justify-left text-cokewhite">
                          {indicator}
                        </p>
                      ))}
                    </div>
                    <div className="w-1/4">
                      <p className="flex justify-left font-bold">Stocks</p>
                      {investor.assets_to_track.slice(0, 4).map((stock, i) => (
                        <p key={i} className="flex justify-left text-cokewhite">
                          {stock}
                        </p>
                      ))}
                      {investor.assets_to_track.length > 4 && (
                        <p className="flex justify-left text-light-gray">
                          + {investor.assets_to_track.length - 4} more
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default InvestorGallery;
