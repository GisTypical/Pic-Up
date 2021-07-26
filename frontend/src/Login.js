import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { Link, useHistory } from "react-router-dom";
import Loading from "./common/Loading";
import Logo from "./common/Logo";
import { user_login } from "./utils/user-api";

const Login = () => {
  const queryClient = useQueryClient();
  const history = useHistory();
  const mutation = useMutation(user_login, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("user");
      history.push("/home");
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let data = Object.fromEntries(formData.entries());
    data.username = data.username.toLowerCase();
    mutation.mutate(data);
  };
  return (
    <div className="grid place-items-center h-full">
      <div class="super-centered-child">
        <div className="flex justify-center">
          <Logo url=""></Logo>
        </div>
        <form
          className="px-10 py-8 mt-10 w-96 bg-gray-800 rounded-2xl flex flex-col space-y-4"
          onSubmit={onSubmit}
        >
          <h2 className="text-center text-xl font-heading">Inicio de sesión</h2>

          <fieldset className="flex flex-col space-y-1">
            <label htmlFor="username">Nombre de usuario</label>
            <input
              className="rounded-lg border-transparent bg-gray-700 focus:ring-green-500 focus:border-green-500"
              type="text"
              name="username"
              id="username"
              placeholder="p.e. gerardo123"
              pattern="[\w]+"
              required
            />
          </fieldset>

          <fieldset className="flex flex-col space-y-1">
            <label htmlFor="password">Contraseña</label>
            <input
              className="rounded-lg border-transparent bg-gray-700 focus:ring-green-500 focus:border-green-500"
              type="password"
              name="password"
              id="password"
              pattern="[\w]{4,}"
              required
            />
          </fieldset>

          <button
            type="submit"
            className="font-bold rounded-lg py-2 text-gray-800 bg-green-500 outline-none border-transparent border-2 focus:border-gray-800 focus:ring-2 focus:ring-green-400"
          >
            Iniciar sesión
          </button>

          <p className="mt text-xs text-gray-400 font-bold text-center">
            ¿No tienes cuenta?{" "}
            <Link className="text-green-500" to="/signup">
              Regístrate
            </Link>
          </p>

          {/* Status messages */}
          {mutation.isLoading && <Loading />}
          {mutation.isError && mutation.error.response.status === 401 && (
            <p className="text-sm text-center text-yellow-500 italic">
              Usuario y/o contraseña son incorrectos
            </p>
          )}
          {mutation.isError && mutation.error.response.status !== 401 && (
            <p className="text-sm text-center text-red-500 italic">
              Ha ocurrido un error al completar la solicitud
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
