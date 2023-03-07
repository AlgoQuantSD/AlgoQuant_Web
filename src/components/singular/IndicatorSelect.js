import React, { useState } from "react";

const options = [
  { value: "macd", label: "MACD" },
  { value: "adl", label: "ADL" },
  { value: "obv", label: "OBV" },
  { value: "rsi", label: "RSI" },
  { value: "so", label: "SO" },
  { value: "bb", label: "BB" },
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
    <div className="p-3">
      <ul>
        {options.map(({ value, label }) => (
          <li key={value} className="pl-6 text-green text-lg font-bold m-4">
            <label className="inline-flex items-center cursor-pointer">
              <input
                className="form-checkbox text-green-500 mr-2 h-6 w-6"
                type="checkbox"
                value={value}
                checked={selectedOptions.includes(value)}
                onChange={() => handleOptionSelect(value)}
              />
              {label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndicatorSelect;
