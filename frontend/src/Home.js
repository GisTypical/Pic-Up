import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { user_logout } from "./utils/user-api";

const Home = ({ user }) => {
  const queryClient = useQueryClient();
  const { mutate: userLogout } = useMutation(user_logout, {
    onSuccess: () => {
      console.log(user);
      queryClient.invalidateQueries("user");
    },
  });

  return (
    <div>
      <p>Estás logeado {user}</p>
      <button
        onClick={() => {
          userLogout();
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default Home;
