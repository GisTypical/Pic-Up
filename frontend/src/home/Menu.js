import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { user_logout } from "../utils/user-api";

const Menu = () => {
  const queryClient = useQueryClient();
  const history = useHistory();
  const { mutate: userLogout } = useMutation(user_logout, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
  });
  return (
    <div className="absolute grid grid-flow-row py-5 px-3 right-20 top-16 rounded-2xl bg-gray-700 divide-y-2">
      <button
        className="h-10"
        onClick={() => {
          history.replace(`/settings`);
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
