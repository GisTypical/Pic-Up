import React, { useState } from "react";
import Logo from "../common/Logo";
import Menu from "./Menu";

const Navbar = ({ user }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="grid grid-flow-col py-4 px-24 items-center">
      <Logo></Logo>
      <input
        className="rounded-lg border-transparent bg-gray-700 focus:ring-green-500 focus:border-green-500"
        type="search"
        name="search"
        id="search"
        placeholder="Busca alguna imágen por tags"
      />
      <div className="flex flex-row-reverse space-x-reverse space-x-10">
        <button
          className="rounded-full h-10 w-10 flex items-center justify-center bg-green-500"
          onClick={() => {
            setShowMenu((state) => !state);
          }}
        >
          {user.charAt(0).toUpperCase()}
        </button>
      </div>
      {showMenu && <Menu setShowMenu={setShowMenu}></Menu>}
    </nav>
  );
};

export default Navbar;
