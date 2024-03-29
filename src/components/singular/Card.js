import React from "react";

const Card = ({ name, description }) => {
  return (
    <div className="h-96 w-96">
      <div className="h-64">
        <div className="text-9xl text-cokewhite font-black mb-3">{name}</div>
        <div className="text-2xl text-cokewhite font-medium">{description}</div>
      </div>
    </div>
  );
};

export default Card;
