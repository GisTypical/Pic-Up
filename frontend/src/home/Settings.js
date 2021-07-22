import React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import Card from "../common/Card";
import { user_delete, user_update } from "../utils/user-api";

const Settings = ({ user }) => {
  const history = useHistory();
  const { mutate: updateUser, status } = useMutation(user_update);
  const { mutate: deleteUser } = useMutation(user_delete, {
    onSuccess: () => {
      history.push("/");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let data = Object.fromEntries(formData.entries());
    data.username = user;
    updateUser(data);
  };

  const handleDelete = () => {
    const data = { username: user };
    deleteUser(data);
  };

  return (
    <div className="grid place-items-center">
      <Card>
        <h1 className="font-heading text-xl text-center">Ajustes</h1>

        <form
          autoComplete="off"
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit}
        >
          <fieldset className="flex flex-col space-y-1">
            <h2 className="font-heading text-center">Perfil</h2>
            <label htmlFor="full_name">Nombre completo</label>
            <input
              autoComplete="false"
              className="rounded-lg border-transparent bg-gray-700 focus:ring-green-500 focus:border-green-500"
              type="text"
              name="full_name"
              id="full_name"
            />
          </fieldset>

          <fieldset className="flex flex-col space-y-1">
            <h2 className="font-heading text-center">Seguridad</h2>
            <label htmlFor="full_name">Contraseña</label>
            <input
              autoComplete="false"
              className="rounded-lg border-transparent bg-gray-700 focus:ring-green-500 focus:border-green-500"
              type="password"
              name="password"
              id="password"
              pattern="[\w]{4,}"
            />
          </fieldset>

          <button
            className="bg-green-500 rounded-lg py-2 outline-none border-2 border-transparent focus:border-2 focus:border-gray-800 focus:ring-2 focus:ring-green-400"
            type="submit"
          >
            Aceptar cambios
          </button>
          {status === "loading" && (
            <p className="text-center text-sm">Actualizando datos...</p>
          )}
          {status === "success" && (
            <p className="text-center text-sm text-green-500">
              Datos actualizados correctamente
            </p>
          )}
          {status === "error" && (
            <p className="text-center text-sm text-yellow-400">
              No han ocurrido cambios
            </p>
          )}
        </form>
        <button
          className="bg-red-500 rounded-lg py-2 outline-none border-2 border-transparent focus:border-2 focus:border-gray-800 focus:ring-2 focus:ring-red-400 w-full"
          onClick={() => handleDelete()}
        >
          Eliminar usuario
        </button>
        <h6 className="text-xs opacity-60" htmlFor="username">
          Eliminar su usuario implica la eliminación de repositorios y fotos
          subidas, proceda si está completamente de acuerdo.
        </h6>
      </Card>
    </div>
  );
};

export default Settings;
