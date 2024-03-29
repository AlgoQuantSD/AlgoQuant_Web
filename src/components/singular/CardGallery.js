import { React, useState } from "react";
import Card from "../singular/Card";

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
    },
    {
      name: "ADL",
      description:
        "The Accumulation/Distribution indicator (ADL) is a cumulative indicator that uses volume and price to assess whether a stock, forex or crypto currency is being accumulated or distributed. Accumulation/Distribution indicator (or ADL) is one of the top Technical Analysis Indicator.",
    },
    {
      name: "OBV",
      description:
        "On-balance volume (OBV) is a technical indicator of momentum, using volume changes to make price predictions. OBV shows crowd sentiment that can predict a bullish or bearish outcome.",
    },
    {
      name: "RSI",
      description:
        "The relative strength index (RSI) is a momentum indicator used in technical analysis. RSI measures the speed and magnitude of a security's recent price changes to evaluate overvalued or undervalued conditions in the price of that security.",
    },
    {
      name: "SO",
      description:
        "A stochastic oscillator is a popular technical indicator for generating overbought and oversold signals. It is a popular momentum indicator, first developed in the 1950s. Stochastic oscillators tend to vary around some mean price level since they rely on an asset's price history.",
    },
    {
      name: "BB",
      description:
        "Bollinger Bands (BB) is a popular technical indicator created by John Bollinger that helps determine whether prices are high or low on a relative basis. Bollinger Bands (BB) were created in the early 1980s by trader, analyst, and teacher John Bollinger. The indicator filled a need to visualize changes in volatility.",
    },
  ];

  const selectedIndicatorObject = indicators.find(
    (indicator) => indicator.name === selectedIndicator
  );

  return (
    <div className="h-400 w-600 flex flex-col">
      <Card
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
              <span className="ml-3 text-cokewhite text-xl">
                {indicator.name}
              </span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardGallery;
