import { FolderSimplePlus } from "phosphor-react";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { getRepos } from "../utils/repos-api";
import { sortReposByTime } from "../utils/general-utils";
import NewRepo from "./NewRepo";
import Repo from "./Repo";
import Loading from "../common/Loading";

const Repositories = () => {
  const [createRepo, setCreateRepo] = useState(false);

  let { isLoading, data: { data } = {} } = useQuery("repos", getRepos);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="grid grid-flow-row my-6 mx-14 place-items-center grid-cols-2 gap-y-8 lg:mx-28 lg:grid-cols-3">
      <article className="new-repo bg-gray-800 h-44 w-48 p-8 rounded-2xl text-center space-y-4 overflow-hidden">
        {createRepo ? (
          <NewRepo setCreateRepo={setCreateRepo}></NewRepo>
        ) : (
          <>
            <div className="flex justify-center">
              <FolderSimplePlus
                size={32}
                className="text-green-500"
                weight="duotone"
              />
            </div>
            <button
              className="font-bold rounded-lg py-2 text-gray-800 bg-green-500 outline-none w-full hover:bg-green-600 transition-colors ease-out"
              onClick={() => setCreateRepo(true)}
            >
              Nuevo repo
            </button>
          </>
        )}
      </article>
      {!isLoading ? (
        sortReposByTime(data.repos).map((repo) => (
          <Repo key={repo.repo_id} repo={repo}></Repo>
        ))
      ) : (
        <p>Cargando sus repositorios...</p>
      )}
    </div>
  );
};

export default Repositories;
