import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import PicComponent from "../common/PicComponent";
import { getDate } from "../utils/date-utils";
import { getRepoPictures } from "../utils/repos-api";
import Tag from "./Tag";
const RepoPictures = () => {
  const params = useParams();
  const { data: { data } = {}, isLoading } = useQuery(
    ["repo_pics", params],
    () => getRepoPictures(params.repo_id)
  );

  return (
    <>
      {!isLoading && (
        <>
          <div className="grid grid-flow-row mx-14 place-items-center grid-cols-2 gap-y-8 lg:mx-28 lg:grid-cols-3">
            {data.pictures.map((pic) => (
              <PicComponent key={pic.pic_id} pic={pic}>
                <div className="p-5 space-y-1 truncate">
                  <h4 className="group-hover:text-green-500 transition-colors duration-300 ease-out font-bold">
                    {pic.pic_name}
                  </h4>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400">
                      {getDate(pic.uploaded_date)}
                    </p>
                    <div class="flex text-sm justify-center space-x-2">
                      {pic.tags.sort().map((tag) => (
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
