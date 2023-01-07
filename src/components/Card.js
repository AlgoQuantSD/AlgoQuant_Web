import React from "react";

const Card = ({ name, description, img, infolink, selected, onChange }) => {
  return (
    <div className="h-full w-96">
      <div className="text-9xl text-dark-gray font-black">{name}</div>
      <div>
        <div className="text-2xl font-medium">{description}</div>
        <div className="">{img}</div>
      </div>
    </div>
  );
};

export default Card;
