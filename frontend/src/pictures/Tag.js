import React from "react";

const Tag = ({ tag, onClick }) => {
  return (
    <p
      className="grid place-items-center text-center bg-green-500 py-1 px-4 rounded-full text-gray-800 font-bold ring-green-400 transition-all cursor-pointer"
      onClick={onClick}
    >
      <span className="text-sm">{tag}</span>
    </p>
  );
};

export default Tag;
