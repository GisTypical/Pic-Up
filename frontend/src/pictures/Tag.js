import React from "react";

const digits = /\d/;

const Tag = ({ tag, onClick }) => {
  return (
    <p
      className="grid place-items-center text-center py-1 px-4 rounded-full bg-green-500 text-gray-800 font-bold ring-green-400 hover:ring-2 transition-all cursor-pointer"
      // No cambiar el search si es un indicador de tags
      onClick={() => {
        if (!digits.test(tag)) onClick();
      }}
    >
      <span className="text-sm truncate">{tag}</span>
    </p>
  );
};

export default Tag;
