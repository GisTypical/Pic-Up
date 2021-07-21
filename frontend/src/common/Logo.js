import React from "react";
import { ArrowFatUp } from "phosphor-react";

const Logo = () => {
  return (
    <div className="logo flex items-center justify-center tracking-widest font-heading">
      <h1 class="font-bold z-10">
        Pic-
        <span className="text-green-500">Up</span>
      </h1>
      <ArrowFatUp
        size={30}
        className="text-green-500 z-0"
        weight="duotone"
      ></ArrowFatUp>
    </div>
  );
};

export default Logo;
