import React from "react";
import { Link } from "react-router-dom";
import { getDate } from "../utils/general-utils";

const RepoCard = ({ repo }) => {
  return (
    <article className="bg-gray-800 flex flex-col justify-center h-44 w-48 p-6 rounded-2xl text-center space-y-4 break-words group">
      <h4 className="font-heading font-bold tracking-widest truncate">
        <Link
          className="group-hover:text-green-500 transition-colors"
          to={`/home/repo/${repo.repo_id}`}
        >
          {repo.repo_name}
        </Link>
      </h4>
      <p className="text-sm text-gray-400">
        Últ. mod. <strong>{getDate(repo.last_mod)}</strong>
      </p>
      <p className="text-xs text-gray-400">
        <strong>{repo.number_pics}</strong> imágenes
      </p>
    </article>
  );
};

export default RepoCard;
