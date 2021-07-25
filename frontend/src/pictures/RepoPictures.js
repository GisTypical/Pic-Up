import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import PicComponent from "../common/PicComponent";
import { getRepoPictures } from "../utils/repos-api";
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
              <PicComponent key={pic.pic_id} pic={pic}></PicComponent>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default RepoPictures;
