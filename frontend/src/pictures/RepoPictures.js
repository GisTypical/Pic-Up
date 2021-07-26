import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../common/Loading";
import PicComponent from "../common/PicComponent";
import { getDate, processTags } from "../utils/general-utils";
import { getRepoPictures } from "../utils/repos-api";
import Tag from "./Tag";

const RepoPictures = () => {
  const params = useParams();
  const { data: { data } = {}, isLoading } = useQuery(
    ["repo_pics", params],
    () => getRepoPictures(params.repo_id)
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {!isLoading && (
        <>
          <div className="grid grid-flow-row mx-14 place-items-center grid-cols-2 gap-y-8 lg:mx-28 lg:grid-cols-3">
            <h2 className="absolute heading text-xl font-bold top-4 w-1/2 text-center truncate">
              {data.repo_name}
            </h2>
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
