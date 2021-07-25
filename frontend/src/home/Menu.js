import { SignOut, UserGear } from "phosphor-react";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { user_logout } from "../utils/user-api";

const Menu = ({ setShowMenu }) => {
  const queryClient = useQueryClient();
  const { mutate: userLogout } = useMutation(user_logout, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
      queryClient.removeQueries("repos");
    },
  });
  return (
    <div className="absolute overflow-auto w-40 grid grid-flow-row md:right-6 lg:right-14 top-16 rounded-2xl bg-gray-700 divide-y-2 divide-gray-600 z-10">
      <Link
        className="h-12 flex flex-row items-center text-left hover:bg-gray-600 group transition-colors ease-out"
        to="/home/settings"
        onClick={() => setShowMenu(false)}
      >
        <UserGear
          className="mx-4 group-hover:text-green-500 transition-colors ease-out"
          weight="duotone"
          size={24}
        />
        <h6 className="flex-1 font-normal">Ajustes</h6>
      </Link>
      <button
        className="h-12 flex flex-row items-center hover:bg-gray-600 group transition-colors ease-out"
        onClick={() => {
          userLogout();
        }}
      >
        <SignOut
          className="mx-4 group-hover:text-red-500 transition-colors ease-out"
          size={24}
          weight="duotone"
        />
        <h6 className="flex-1 text-left">Cerrar sesión</h6>
      </button>
    </div>
  );
};

export default Menu;
