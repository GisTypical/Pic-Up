import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { postRepo } from "../utils/repos-api";

const NewRepo = ({ setCreateRepo }) => {
  const [repo, setRepo] = useState("");
  const queryClient = useQueryClient();

  const { mutate: createRepo } = useMutation(postRepo, {
    onSuccess: () => {
      setCreateRepo(false);
      queryClient.invalidateQueries("repos");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!repo) {
      setCreateRepo(false);
      return;
    }
    const data = {
      repo_name: repo,
    };
    createRepo(data);
  };

  return (
    <div className="grid place-items-center h-full">
      <form className="text-left space-y-1" onSubmit={handleSubmit}>
        <h2 className="font-heading font-bold text-center">Título</h2>
        <input
          className="rounded-lg w-full text-sm border-transparent bg-gray-700 focus:ring-green-500 focus:border-green-500"
          type="text"
          name="repo_name"
          id="repo_name"
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
          pattern="[\w ]{1,20}"
        />
      </form>
    </div>
  );
};

export default NewRepo;
