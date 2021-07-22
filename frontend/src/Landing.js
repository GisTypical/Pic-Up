import React from "react";
import { useQuery } from "react-query";
import { Link, useHistory } from "react-router-dom";
import Logo from "./common/Logo";
import { user_loggedin } from "./utils/user-api";

const Landing = () => {
  const history = useHistory();
  const { isLoading } = useQuery("user", user_loggedin, {
    onSuccess: ({ data }) => {
      if (data) {
        history.push("/home");
      }
    },
  });

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="w-full">
      <nav className="flex py-4 h-16 px-24 items-center">
        <Logo></Logo>
        <div className="flex-1 flex flex-row-reverse space-x-reverse space-x-10">
          <Link to="/signup">Registro</Link>
          <Link to="/login">Iniciar sesión</Link>
        </div>
      </nav>
      <p>Estamos en el landing page</p>
    </div>
  );
};

export default Landing;
