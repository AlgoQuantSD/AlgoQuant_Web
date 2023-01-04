import React, { useState } from 'react';

function CardGallery(props) {
  const { cards } = props;
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handlePreviousClick = () => {
    setCurrentCardIndex((currentCardIndex + cards.length - 1) % cards.length);
  };

  const handleNextClick = () => {
    setCurrentCardIndex((currentCardIndex + 1) % cards.length);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-64 h-64 rounded-full bg-gray-400 overflow-hidden">
        {cards[currentCardIndex]}
      </div>
      <div className="mt-4 flex">
        <button
          onClick={handlePreviousClick}
          className="px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
        >
          Previous
        </button>
        <button
          onClick={handleNextClick}
          className="px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 ml-4"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CardGallery;
