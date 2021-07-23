import React from "react";

const Card = ({ children }) => {
  return (
    <div className="px-10 py-8 w-1/2 bg-gray-800 rounded-2xl space-y-7">
      {children}
    </div>
  );
};

export default Card;
