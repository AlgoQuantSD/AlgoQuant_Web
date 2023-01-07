import React from "react";
import Card from "./Card";
import { useState } from "react";

const CardGallery = () => {
  const [selectedIndicator, setSelectedIndicator] = useState("MACD");

  const handleChange = (event) => {
    setSelectedIndicator(event.target.value);
  };

  const indicators = [
    {
      name: "MACD",
      description:
        "Moving average convergence divergence (MACD, or MAC-D) is a trend-following momentum indicator that shows the relationship between two exponential moving averages (EMA's) of a security’s price. The MACD is calculated by subtracting the 26-period exponential moving average (EMA) from the 12-period EMA.",
      img: null,
      infolink: null,
    },
    {
      name: "ADL",
      description: "The ADL is a...",
      img: null,
      infolink: null,
    },
    {
      name: "OBV",
      description: "The OBV is a...",
      img: null,
      infolink: null,
    },
    {
      name: "RSI",
      description: "The RSI is a...",
      img: null,
      infolink: null,
    },
    {
      name: "SO",
      description: "The SO is a...",
      img: null,
      infolink: null,
    },
    {
      name: "BB",
      description: "The BB is a...",
      img: null,
      infolink: null,
    },
  ];

  const selectedIndicatorObject = indicators.find(
    (indicator) => indicator.name === selectedIndicator
  );

  return (
    <div className="card-gallery">
      <Card
        name={selectedIndicatorObject.name}
        img={selectedIndicatorObject.img}
        description={selectedIndicatorObject.description}
      />
      <div className="radio-buttons">
        {indicators.map((indicator) => (
          <div key={indicator.name} className="inline-flex items-center pr-4">
            <input
              type="radio"
              name="selected-indicator"
              value={indicator.name}
              checked={indicator.name === selectedIndicator}
              onChange={handleChange}
              className="w-8 h-8"
            />
            <label className="ml-4 text-xl">{indicator.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardGallery;
