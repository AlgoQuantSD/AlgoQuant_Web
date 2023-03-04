import { useState } from "react";

const NumberInput = () => {
  const [value, setValue] = useState(50);

  const decrement = () => {
    setValue(Math.floor((value - 5) / 5) * 5);
  };

  const increment = () => {
    setValue(Math.floor((value + 5) / 5) * 5);
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
          className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700 outline-none"
          name="custom-input-number"
          value={value}
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
