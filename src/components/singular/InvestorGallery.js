import React from "react";
import Carousel from "react-multi-carousel";
import InvestorDropdown from "./InvestorDropdown";
import { BsPersonLinesFill } from "react-icons/bs";
import { FaBrain } from "react-icons/fa";
import investorPhotos from "../../assets/images/investors/InvestorPhotos";
import bot1 from "../../assets/images/investors/bot1.png";

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
      stocks: [
        "AMZN",
        "APPL",
        "GOOGL",
        "SPOT",
        "WHAT",
        "WOWZ",
        "YEAH",
        "BALL",
        "DEEP",
        "YUMM",
        "FUKK",
      ],
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
      stocks: ["AMZN", "APPL", "GOOGL", "+ 3 more"],
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
        {investors.map((investor, i) => (
          <div
            className={`h-full w-11/12 text-white bg-green mx-auto p-6 ${
              investor.id === "bot" ? "bg-gold border-4 border-green" : ""
            }`}
            key={investor.name}
          >
            {/* Name and logos */}
            <div className="flex justify-between">
              {investor.id === "bot" ? (
                <FaBrain className="text-green text-3xl" />
              ) : (
                <BsPersonLinesFill className="text-cokewhite text-3xl" />
              )}
              <p className="font-bold text-xl">{investor.name}</p>
              <InvestorDropdown
                startJob={() => console.log("Start Job clicked")}
                viewInvestor={() => console.log("View Investor clicked")}
              />
            </div>
            {/* Investor Image */}
            <div className="flex justify-center">
              {investor.id === "investor" ? (
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
            {investor.id !== "bot" && (
              <div className="flex flex-col">
                <div className="flex justify-between pl-16 pr-16">
                  <div className="w-1/4">
                    <p className="flex justify-left font-bold">Indicators</p>
                    {investor.indicators.map((indicator, i) => (
                      <p key={i} className="flex justify-left text-cokewhite">
                        {indicator}
                      </p>
                    ))}
                  </div>
                  <div className="w-1/4">
                    <p className="flex justify-left font-bold">Stocks</p>
                    {investor.stocks.slice(0, 4).map((stock, i) => (
                      <p key={i} className="flex justify-left text-cokewhite">
                        {stock}
                      </p>
                    ))}
                    {investor.stocks.length > 4 && (
                      <p className="flex justify-left text-green">
                        + {investor.stocks.length - 4} more
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
