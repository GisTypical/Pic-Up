import React from "react";
import { useQuery } from "react-query";
import { Link, useHistory } from "react-router-dom";
import Loading from "./common/Loading";
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
    return <Loading />;
  }

  return (
    <div className="w-full">
      <nav className="flex items-center py-[15px] lg:px-20 md:px-14">
        <Logo url={""}></Logo>
        <div className="flex-1 flex flex-row-reverse space-x-reverse space-x-10">
          <Link to="/signup">Registro</Link>
          <Link to="/login">Iniciar sesión</Link>
        </div>
      </nav>
      <p>Un lugar donde guardar momentos es lo que vale</p>
    </div>
  );
};

export default Landing;
