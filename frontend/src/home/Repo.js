import React from "react";
import { getDate } from "../utils/date";

const Repo = ({ repo }) => {
  return (
    <div className="bg-gray-700 h-44 w-48 p-8 rounded-2xl text-center space-y-4 break-words">
      <h4 className="font-heading text-lg">{repo.repo_name}</h4>
      <p>
        Últ. mod.:
        <p>{getDate(repo.last_mod)}</p>
      </p>
    </div>
  );
};

export default Repo;
