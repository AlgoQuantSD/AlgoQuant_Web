import React from "react";

const CustomButtonGroup = ({
  next,
  previous,
  goToSlide,
  slides,
  carouselState,
}) => {
  return (
    <div className="flex justify-between w-full">
      <button
        className="text-2xl border border-gray-400 rounded p-2"
        onClick={() => previous()}
      >
        {/* &#8592; */}
      </button>
      {slides.map((slide, index) => (
        <button
          key={index}
          className={`text-2xl border border-gray-400 rounded p-2 ${
            carouselState.currentSlide === index ? "bg-gray-400" : ""
          }`}
          onClick={() => goToSlide(index)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className="text-2xl border border-gray-400 rounded p-2"
        onClick={() => next()}
      >
        &#8594;
      </button>
    </div>
  );
};

export default CustomButtonGroup;
