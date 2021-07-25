import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../common/Logo";
import Menu from "./Menu";

const Navbar = ({ username, children }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="grid grid-flow-col py-4 px-24 items-center">
      <div className="flex space-x-10 items-center">
        <Logo></Logo>
        <NavLink activeClassName="text-green-500" to="/home/upload">
          Subir una imagen
        </NavLink>
      </div>

      {children}

      <div className="flex justify-end space-x-10 items-center">
        <NavLink to={`/home/repo`} activeClassName="text-green-500">
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
