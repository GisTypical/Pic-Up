import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import Loading from "../common/Loading";
import PicComponent from "../common/PicComponent";
import { getDate, processTags } from "../utils/general-utils";
import { deleteRepo, getRepoPictures } from "../utils/repos-api";
import Tag from "./Tag";

const RepoPictures = () => {
  const params = useParams();
  const history = useHistory();
  const queryClient = useQueryClient();

  const { data: { data } = {}, isLoading } = useQuery(
    ["repo_pics", params],
    () => getRepoPictures(params.repo_id)
  );

  const { mutate: removeRepo } = useMutation(deleteRepo, {
    onSuccess: () => {
      queryClient.invalidateQueries("repos");
      history.push("/home/repo");
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const handleClick = () => {
    const repo = {
      repo_id: params.repo_id,
    };
    removeRepo(repo);
  };

  return (
    <>
      {!isLoading && (
        <>
          <div className="grid grid-flow-row mx-14 place-items-center grid-cols-2 gap-y-8 lg:mx-28 lg:grid-cols-3">
            <h2 className="absolute heading text-xl font-bold top-5 md:hidden lg:block auto w-1/2 text-center truncate hidden md:block">
              {data.repo_name}
            </h2>
            <div className="absolute top-4 md:right-60 lg:right-80 group">
              <button
                className="text-sm font-bold text-center truncate bg-red-500 py-2 px-3 rounded-lg hidden md:block"
                onClick={handleClick}
              >
                Borrar repo
              </button>
              <div className="absolute hidden group-hover:block bg-gray-800 py-2 px-2 mt-3 transition text-sm w-48 rounded-lg">
                Esto resultará en la eliminación de{" "}
                <strong className="text-red-500">
                  todas las imágenes de este repo{" "}
                </strong>
              </div>
            </div>
            {data.pictures.map((pic) => (
              <PicComponent key={pic.pic_id} pic={pic}>
                {/* Picture body. Composition para asignar onClick */}
                <div className="p-5 space-y-1 truncate">
                  <h4 className="group-hover:text-green-500 transition-colors duration-300 ease-out font-bold">
                    {pic.pic_name}
                  </h4>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400">
                      {getDate(pic.uploaded_date)}
                    </p>
                    <div class="flex text-sm justify-center space-x-2">
                      {processTags(pic.tags).map((tag) => (
                        <Tag key={tag} tag={tag} onClick={() => {}}></Tag>
                      ))}
                    </div>
                  </div>
                </div>
              </PicComponent>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default RepoPictures;
