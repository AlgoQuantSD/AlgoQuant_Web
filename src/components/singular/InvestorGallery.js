import { React, useState } from "react";
import Carousel from "react-multi-carousel";

const InvestorGallery = () => {
  // const [selectedInvestor, setSelectedInvestor] = useState([{}]);

  // const handleChange = (event) => {
  //   setSelectedIndicator(event.target.value);
  // };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
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
    },
    {
      name: "Money Maker",
      indicators: ["RSI", "MACD", "OBV"],
      stocks: ["AMZN", "APPL", "GOOGL", "SPOT"],
    },
    {
      name: "Jordan Belfort",
      indicators: ["RSI", "MACD", "OBV"],
      stocks: ["AMZN", "APPL", "GOOGL", "SPOT"],
    },
    {
      name: "Jordan Belfort's Cat",
      indicators: ["RSI", "MACD", "OBV"],
      stocks: ["AMZN", "APPL", "GOOGL", "SPOT"],
    },
    {
      name: "Warren Buffett's Left Nut",
      indicators: ["RSI", "MACD", "OBV"],
      stocks: ["AMZN", "APPL", "GOOGL", "SPOT"],
    },
  ];

  return (
    <div className="h-400 w-600 flex flex-col">
      <Carousel responsive={responsive}>
        {investors.map((investor) => (
          <div className="investor-card" key={investor.name}>
            <h3>{investor.name}</h3>
            <p>Indicators: {investor.indicators.join(", ")}</p>
            <p>Stocks: {investor.stocks.join(", ")}</p>
          </div>
        ))}
      </Carousel>
      {/* <Card
        name={selectedIndicatorObject.name}
        description={selectedIndicatorObject.description}
      />
      <div className="pt-36">
        {indicators.map((indicator) => (
          <div key={indicator.name} className="inline-flex items-center pr-4">
            <input
              type="radio"
              name="selected-indicator"
              value={indicator.name}
              checked={indicator.name === selectedIndicator}
              onChange={handleChange}
              className="rounded-full h-6 w-6 border-2 border-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <label className="inline-flex items-center cursor-pointer select-none">
              <span className="ml-3 text-dark-gray text-xl">
                {indicator.name}
              </span>
            </label>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default InvestorGallery;
