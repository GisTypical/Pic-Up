import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../common/Logo";
import Menu from "./Menu";

const Navbar = ({ username, children }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="grid grid-cols-1 place-items-center md:place-items-stretch md:grid-cols-3 py-4 lg:px-24 md:px-14">
      <div className="flex space-x-6 md:flex-none items-center">
        <Logo></Logo>
        <NavLink
          className="hidden md:block"
          activeClassName="text-green-500"
          to="/home/upload"
        >
          Nueva imagen
        </NavLink>
      </div>

      {children}

      <div className="flex-1 hidden space-x-6 md:flex justify-end items-center">
        <NavLink
          to={`/home/repo`}
          className="hover:text-green-500 transition-colors ease-out"
          activeClassName="text-green-500"
        >
          Repositorios
        </NavLink>
        <button
          className="rounded-full h-10 w-10 flex items-center justify-center bg-green-500"
          onClick={() => {
            setShowMenu((state) => !state);
          }}
        >
          {username.charAt(0).toUpperCase()}
        </button>
      </div>
      {showMenu && <Menu setShowMenu={setShowMenu}></Menu>}
    </nav>
  );
};

export default Navbar;
