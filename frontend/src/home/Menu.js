import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { user_logout } from "../utils/user-api";

const Menu = ({ setShowMenu }) => {
  const queryClient = useQueryClient();
  const history = useHistory();
  const { mutate: userLogout } = useMutation(user_logout, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
      queryClient.removeQueries("repos");
    },
  });
  return (
    <div className="absolute grid grid-flow-row py-2 px-3 right-20 top-16 rounded-2xl bg-gray-700 divide-y-2 z-10">
      <button
        className="h-10"
        onClick={() => {
          setShowMenu(false);
          history.replace(`/home/settings`);
        }}
      >
        Ajustes
      </button>
      <button
        className="h-10"
        onClick={() => {
          userLogout();
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default Menu;
