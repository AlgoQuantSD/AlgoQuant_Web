import React from "react";
import Carousel from "react-multi-carousel";
import { BsPersonLinesFill } from "react-icons/bs";
import investor1 from "../../assets/images/investors/investor1.png";
import InvestorDropdown from "./InvestorDropdown";

const InvestorGallery = () => {
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

  const investors = [
    {
      name: "Warren Buffett",
      indicators: ["RSI", "MACD", "OBV"],
      stocks: ["AMZN", "APPL", "GOOGL", "SPOT"],
      id: "investor",
    },
    {
      name: "Money Maker",
      indicators: ["RSI", "MACD", "OBV"],
      stocks: ["AMZN", "APPL", "GOOGL", "SPOT"],
      id: "bot",
    },
    {
      name: "Jordan Belfort",
      indicators: ["RSI", "MACD", "OBV"],
      stocks: ["AMZN", "APPL", "GOOGL", "SPOT"],
      id: "investor",
    },
    {
      name: "Jordan Belfort's Cat",
      indicators: ["RSI", "MACD", "OBV"],
      stocks: ["AMZN", "APPL", "GOOGL", "SPOT", "3 more"],
      id: "investor",
    },
    {
      name: "Warren Buffett's Left Nut",
      indicators: ["RSI", "MACD", "OBV"],
      stocks: ["AMZN", "APPL", "GOOGL", "SPOT"],
      id: "investor",
    },
    {
      name: "Warren Buffett's Left Nut",
      indicators: ["RSI", "MACD", "OBV"],
      stocks: ["AMZN", "APPL", "GOOGL", "SPOT"],
      id: "investor",
    },
  ];

  return (
    <div className="mt-14 p-4">
      <Carousel
        responsive={responsive}
        infinite={true}
        wipeable={false}
        draggable={false}
        showDots={false}
      >
        {investors.map((investor) => (
          <div
            className={`h-full w-11/12 text-white bg-faded-dark-gray mx-auto p-6 ${
              investor.id === "bot" ? " border-2 border-gold" : ""
            }`}
            key={investor.name}
          >
            {/* Name and logos */}
            <div className="flex justify-between">
              <BsPersonLinesFill className="text-green text-3xl" />
              <p className="font-bold text-xl">{investor.name}</p>
              {/* <button className="flex bg-gray p-1 rounded-full hover:bg-dark-gray">
                <BsThreeDots className="text-2xl text-light-gray" />
              </button> */}
              <InvestorDropdown
                startJob={() => console.log("Start Job clicked")}
                viewInvestor={() => console.log("View Investor clicked")}
              />
            </div>
            {/* Investor Image */}
            <div className="flex justify-center">
              <img src={investor1} alt="investor" className="h-64" />
            </div>
            {/* Indicators / Stocks */}
            <div className="flex flex-col">
              <div className="flex justify-between pl-16 pr-16">
                <div className="w-1/4">
                  <p className="flex justify-left font-bold">Indicators</p>
                  {investor.indicators.map((indicator, i) => (
                    <p key={i} className="flex justify-left text-green">
                      {indicator}
                    </p>
                  ))}
                </div>
                <div className="w-1/4">
                  <p className="flex justify-left font-bold">Stocks</p>
                  {investor.stocks.map((stock, i) => (
                    <p key={i} className="flex justify-left text-green">
                      {stock}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default InvestorGallery;
