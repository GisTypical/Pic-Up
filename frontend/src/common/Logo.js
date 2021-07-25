import React from "react";
import { ArrowFatUp } from "phosphor-react";
import { useHistory } from "react-router-dom";

const Logo = () => {
  const history = useHistory();
  return (
    <figure
      className="logo flex items-center tracking-widest cursor-pointer"
      onClick={() => {
        history.push("/home");
      }}
    >
      <h1 class="font-heading font-bold">
        Pic-
        <span className="text-green-500">Up</span>
      </h1>
      <ArrowFatUp
        size={30}
        className="text-green-500"
        weight="duotone"
      ></ArrowFatUp>
    </figure>
  );
};

export default Logo;
