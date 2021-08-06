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
    <div className="grid grid-flow-row grid-rows-[auto,1fr] h-full">
      <nav className="relative grid grid-flow-col items-center py-[15px] lg:px-20 md:px-11 text-sm font-bold">
        <Logo url={""} setSearch={() => {}}></Logo>
        <div className="flex-1 flex flex-row-reverse space-x-reverse space-x-10 items-center">
          <Link
            className="bg-green-500 py-2 px-3 rounded-lg hover:bg-green-600 transition-colors ease-out text-gray-900"
            to="/signup"
          >
            Registro
          </Link>
          <Link
            className="hover:text-green-500 transition-colors ease-out"
            to="/login"
          >
            Iniciar sesión
          </Link>
        </div>
      </nav>

      <div className="grid grid-cols-2">
        <div className="flex flex-col py-28 px-12 font-bold subpixel-antialiased space-y-5">
          <p className="font-heading text-5xl lg:text-[62px] leading-[0.95em]">
            Un lugar donde{" "}
            <strong className="text-green-500">guardar momentos</strong> es lo
            que vale.
          </p>
          <p className="text-gray-500">
            Con Pic-Up, puedes guardar todas tus fotos, donde quieras, cuando
            quieras.
          </p>
          <div>
            <Link
              className="bg-green-500 py-2 px-3 rounded-lg hover:bg-green-600 transition-colors ease-out text-gray-900"
              to="/signup"
            >
              ¡Únete ahora!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
