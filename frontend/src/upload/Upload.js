import React from "react";
import { useMutation, useQuery } from "react-query";
import CardForm from "../common/CardForm";
import { postPicture } from "../utils/pictures-api";
import { getRepos } from "../utils/repos-api";
import UploadButton from "./UploadButton";
import { useHistory } from "react-router-dom";
import Loading from "../common/Loading";

const PictureUpload = () => {
  const history = useHistory();
  const { data: { data } = {}, isLoading } = useQuery("repos", getRepos);

  const { mutate: uploadPic } = useMutation(postPicture, {
    onSuccess: () => {
      history.push("/home");
    },
  });

  const onSubmit = (e) => {
    let formData = new FormData(e.target);
    formData.set("tags", formData.get("tags").toLowerCase());
    uploadPic(formData);
    e.preventDefault();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="grid place-items-center min-w-min">
      <CardForm onSubmit={onSubmit}>
        <UploadButton></UploadButton>

        <fieldset className="flex flex-col space-y-1">
          <label className="heading font-bold" htmlFor="pic_name">
            Título de imagen
          </label>
          <input
            className="rounded-lg border-transparent bg-gray-700 focus:ring-green-500 focus:border-green-500"
            type="text"
            name="pic_name"
            id="pic_name"
            placeholder="e.g. Imágen increíble"
            required
          />
        </fieldset>

        <fieldset className="flex flex-col space-y-1">
          <label className="heading font-bold" htmlFor="pic_name">
            Tags
          </label>
          <label className="mt text-xs opacity-60" htmlFor="pic_name">
            Separados por comas
          </label>
          <input
            className="rounded-lg border-transparent bg-gray-700 focus:ring-green-500 focus:border-green-500"
            type="text"
            name="tags"
            id="tags"
            placeholder="e.g. viaje, comida, paisaje"
            required
          />
        </fieldset>

        <fieldset className="flex flex-col space-y-1">
          <label className="heading font-bold" htmlFor="pic_name">
            Repositorio
          </label>
          <select
            className="rounded-lg border-transparent bg-gray-700 focus:ring-green-500 focus:border-green-500"
            name="repo_id"
            id="repo_id"
            required
          >
            {!isLoading ? (
              data.repos.map((repo) => (
                <option key={repo.repo_id} value={repo.repo_id}>
                  {repo.repo_name}
                </option>
              ))
            ) : (
              <option>Cargando repos...</option>
            )}
          </select>
        </fieldset>
        <button
          className="font-bold rounded-lg py-2 text-gray-800 bg-green-500 outline-none border-transparent border-2 focus:border-gray-800 focus:ring-2 focus:ring-green-400"
          type="submit"
        >
          ¡Guardar imágen!
        </button>
      </CardForm>
    </div>
  );
};

export default PictureUpload;
