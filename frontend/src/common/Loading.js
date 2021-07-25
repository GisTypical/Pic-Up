import { Spinner } from "phosphor-react";
import React from "react";

const Loading = () => {
  return (
    <div className="grid place-items-center h-full">
      <Spinner
        size={38}
        weight="duotone"
        className="text-green-500 animate-spin"
      />
    </div>
  );
};

export default Loading;
