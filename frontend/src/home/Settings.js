import React from "react";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import CardForm from "../common/CardForm";
import Loading from "../common/Loading";
import { get_full_name, user_delete, user_update } from "../utils/user-api";
import { useQueryClient } from "react-query";

const Settings = () => {
  const history = useHistory();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery("full_name", get_full_name);

  const { mutate: updateUser, status } = useMutation(user_update, {
    onSuccess: () => {
      queryClient.invalidateQueries("full_name");
    },
  });
  const { mutate: deleteUser } = useMutation(user_delete, {
    onSuccess: () => {
      history.push("/");
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let data = Object.fromEntries(formData.entries());
    updateUser(data);
  };

  const handleDelete = () => {
    deleteUser();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="grid place-items-center">
      <CardForm onSubmit={onSubmit}>
        <h1 className="font-heading font-bold tracking-widest text-xl text-center">
          Ajustes
        </h1>
        <p className="text-sm overflow-ellipsis">
          Hola {data.data.full_name}, ¿Desea cambiar algo?
        </p>
        <fieldset className="flex flex-col space-y-1">
          <h2 className="font-heading font-bold tracking-widest text-center">
            Perfil
          </h2>
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
          <h2 className="font-heading font-bold tracking-widest text-center">
            Seguridad
          </h2>
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
          className="font-bold rounded-lg py-2 text-gray-800 bg-green-500 outline-none border-transparent border-2 focus:border-gray-800 focus:ring-2 focus:ring-green-400 hover:bg-green-600 transition-colors ease-out"
          type="submit"
        >
          Aceptar cambios
        </button>
        {status === "loading" && <Loading />}
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
        <div className="delete space-y-2">
          <h6 className="mt text-xs text-gray-400" htmlFor="username">
            Eliminar su usuario implica la{" "}
            <strong className="text-red-500">
              eliminación de repositorios
            </strong>{" "}
            y <strong className="text-red-500">fotos subidas</strong>.
          </h6>
          <button
            className="font-bold rounded-lg py-2 text-gray-800 bg-red-500 outline-none border-transparent border-2 focus:border-gray-800 focus:ring-2 focus:ring-red-500 w-full hover:bg-red-600 transition-colors ease-out"
            onClick={() => handleDelete()}
          >
            Eliminar usuario
          </button>
        </div>
      </CardForm>
    </div>
  );
};

export default Settings;
