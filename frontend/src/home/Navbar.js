import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Menu from "./Menu";

const Navbar = ({ username, children, logo }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="relative grid grid-cols-1 place-items-center md:place-items-stretch md:grid-cols-3 py-[15px] lg:px-20 md:px-11 text-sm font-bold">
      <div className="flex space-x-6 md:flex-none items-center">
        {logo}
        <NavLink
          className="hidden md:block bg-green-500 py-2 px-2 rounded-lg text-gray-800 font-bold hover:bg-green-600 transition-colors ease-out"
          activeClassName="text-green-600 bg-gray-900 bg-transparent hover:bg-transparent"
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
          className="rounded-full h-[35px] w-[35px] flex items-center justify-center bg-green-500 hover:bg-green-600 hover:text-gray-200 transition-colors ease-out"
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
