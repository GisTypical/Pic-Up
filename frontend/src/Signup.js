import React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import Logo from "./common/Logo";
import { user_signup } from "./utils/user-api";

const Signup = () => {
  const history = useHistory();
  const mutation = useMutation(user_signup, {
    onSuccess: () => {
      history.push("/login");
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
      <div>
        <Logo></Logo>
        <form
          className="px-10 py-8 mt-10 w-96 bg-gray-800 rounded-2xl flex flex-col space-y-4"
          onSubmit={onSubmit}
        >
          <h2 className="text-center text-xl font-heading">Registro</h2>

          <fieldset className="flex flex-col space-y-1">
            <label htmlFor="name">Nombre completo</label>
            <input
              className="rounded-lg border-transparent bg-gray-700 focus:ring-green-500 focus:border-green-500"
              type="text"
              name="full_name"
              id="full_name"
              placeholder="p.e. Gerardo Torres"
              required
            />
          </fieldset>

          <fieldset className="flex flex-col space-y-1">
            <label htmlFor="username">Nombre de usuario</label>
            <label className="text-xs opacity-60" htmlFor="username">
              Sin espacios
            </label>
            <input
              className="rounded-lg border-transparent bg-gray-700 focus:ring-green-500 focus:border-green-500 selection:bg-green-400"
              type="text"
              name="username"
              id="username"
              placeholder="p.e. gistypical"
              pattern="[\w]+"
              required
            />
          </fieldset>

          <fieldset className="flex flex-col space-y-1">
            <label htmlFor="password">Contraseña</label>
            <label className="text-xs opacity-60" htmlFor="username">
              Debe de tener 4 caracteres o más
            </label>
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
            className="bg-green-500 rounded-lg py-2 outline-none border-2 border-transparent focus:border-2 focus:border-gray-800 focus:ring-2 focus:ring-green-400"
          >
            Registrarse
          </button>

          {/* Status messages */}
          {mutation.isLoading && (
            <p className="text-sm text-center">
              Registrando usuario, espere...
            </p>
          )}
          {mutation.isError && mutation.error.response.status === 409 && (
            <p className="text-sm text-center text-yellow-500">
              El nombre de usuario ingresado ya existe
            </p>
          )}
          {mutation.isError && mutation.error.response.status !== 409 && (
            <p className="text-sm text-center text-red-500">
              Ha ocurrido un error al completar la solicitud
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signup;
