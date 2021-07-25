import React from "react";

const CardForm = ({ children, onSubmit }) => {
  return (
    <form
      className="px-10 py-8 w-96 rounded-2xl space-y-5 flex flex-col bg-gray-800"
      onSubmit={onSubmit}
      autoComplete="off"
    >
      {children}
    </form>
  );
};

export default CardForm;
