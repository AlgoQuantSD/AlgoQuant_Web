import React, { useState } from "react";

const options = [
  { value: "macd", label: "MACD" },
  { value: "adl", label: "ADL" },
  { value: "obv", label: "OBV" },
  { value: "rsi", label: "RSI" },
  { value: "so", label: "SO" },
  { value: "bb", label: "BB" },
];

const IndicatorSelect = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionSelect = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
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
      {selectedOptions.length > 0 && (
        <p className="mt-2">
          Selected indicators: {selectedOptions.join(" - ")}
        </p>
      )}
    </div>
  );
};

export default IndicatorSelect;
