import React, { useState } from "react";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { BsInfoCircleFill } from "react-icons/bs";

const options = [
  {
    value: "macd",
    label: "MACD",
    tooltip: "Moving Average Convergence Divergence",
  },
  { value: "adl", label: "ADL", tooltip: "Accumulation/Distribution Line" },
  { value: "obv", label: "OBV", tooltip: "On-Balance Volume" },
  { value: "rsi", label: "RSI", tooltip: "Relative Strength Index" },
  { value: "so", label: "SO", tooltip: "Stochastic Oscillator" },
  { value: "bb", label: "BB", tooltip: "Bollinger Bands" },
];

const IndicatorSelect = ({ onOptionsSelect }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionSelect = (option) => {
    setSelectedOptions((prevSelectedOptions) => {
      const isOptionSelected = prevSelectedOptions.includes(option);
      let updatedSelectedOptions = [...prevSelectedOptions];
      if (isOptionSelected) {
        updatedSelectedOptions = updatedSelectedOptions.filter(
          (selectedOption) => selectedOption !== option
        );
      } else {
        updatedSelectedOptions.push(option);
      }
      onOptionsSelect(updatedSelectedOptions);
      return updatedSelectedOptions;
    });
  };

  return (
    <div className="p-1">
      <ul>
        {options.map(({ value, label, tooltip }) => (
          <li key={value} className="text-green text-lg font-bold m-3">
            <div className="flex items-center">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  className="form-checkbox text-green-500 mr-2 h-6 w-6"
                  type="checkbox"
                  value={value}
                  checked={selectedOptions.includes(value)}
                  onChange={() => handleOptionSelect(value)}
                />
                <span className="pr-2">{label}</span>
              </label>
              <BsInfoCircleFill
                className="text-green text-lg my-anchor-element"
                data-tooltip-id={`tooltip-${value}`}
                data-tooltip-content={tooltip}
              />
              <Tooltip
                id={`tooltip-${value}`}
                place="right"
                anchorSelect=".my-anchor-element"
                multiline={true}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndicatorSelect;
