import { useState } from "react";

const NumberInput = ({ value, onChange, step = 1, min = 0, max = 100 }) => {
  const [inputValue, setInputValue] = useState(value);

  const decrement = () => {
    const newValue = Math.floor((inputValue - step) / step) * step;
    setInputValue(Math.max(newValue, min));
  };

  const increment = () => {
    const newValue = Math.floor((inputValue + step) / step) * step;
    setInputValue(Math.min(newValue, max));
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex custom-number-input h-10 w-32">
      <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
        <button
          type="button"
          data-action="decrement"
          onClick={decrement}
          className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
        >
          <span className="m-auto text-2xl font-thin">−</span>
        </button>
        <input
          type="number"
          id="custom-input-number"
          className="outline-none focus:outline-none text-center w-full bg-cokewhite font-semibold text-md cursor-default flex items-center text-green outline-none"
          name="custom-input-number"
          value={inputValue}
          onChange={handleInputChange}
          min={min}
          max={max}
          step={step}
          readOnly
        />
        <button
          type="button"
          data-action="increment"
          onClick={increment}
          className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
        >
          <span className="m-auto text-2xl font-thin">+</span>
        </button>
      </div>
    </div>
  );
};

export default NumberInput;
