import { FolderSimplePlus, PlusCircle } from "phosphor-react";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { getRepos } from "../utils/repos-api";
import Repo from "./Repo";

const Repositories = ({ user }) => {
  const [showNewRepo, setShowNewRepo] = useState(false);
  let { isLoading, data: { data } = {} } = useQuery("repos", () =>
    getRepos(user)
  );

  return (
    <div className="grid mx-28 my-10 grid-cols-3 place-items-center gap-y-4">
      <div className="bg-gray-700 h-44 w-48 p-8 rounded-2xl text-center space-y-4">
        <div className="grid place-items-center">
          <FolderSimplePlus size={32} weight="duotone" />
        </div>
        <p className="font-heading text-lg">Nuevo repo</p>
      </div>
      {!isLoading &&
        data.repos.map((repo) => <Repo key={repo.repo_id} repo={repo}></Repo>)}
    </div>
  );
};

export default Repositories;
