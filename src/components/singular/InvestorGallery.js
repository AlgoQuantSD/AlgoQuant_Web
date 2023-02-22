import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import InvestorDropdown from "./InvestorDropdown";
import { BsPersonLinesFill } from "react-icons/bs";
import { FaBrain } from "react-icons/fa";
import investorPhotos from "../../assets/images/investors/InvestorPhotos";
import bot1 from "../../assets/images/investors/bot1.png";

// investorList: JSON object of investor objects
const InvestorGallery = ({ investorList }) => {
  const [selectedInvestor, setSelectedInvestor] = useState(null);

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
      <Carousel
        responsive={responsive}
        infinite={true}
        wipeable={false}
        draggable={false}
        showDots={false}
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
                }}
                viewInvestor={() => console.log("View Investor clicked")}
                deleteInvestor={() => console.log("Delete Investor clicked")}
                investor={selectedInvestor}
              />
            </div>
            {/* Investor Image */}
            <div className="flex justify-center">
              {investor.type === "I" ? (
                <img
                  src={investorPhotos[i % investorPhotos.length]}
                  alt=""
                  className="h-52 mt-6 mb-6"
                />
              ) : (
                <img src={bot1} alt="bot" className="h-72 mt-12" />
              )}
            </div>
            {/* Indicators / Stocks */}
            {investor.type !== "A" && (
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
    </div>
  );
};

export default InvestorGallery;
