import React from "react";
import { useQuery } from "react-query";
import Loading from "../common/Loading";
import PicComponent from "../common/PicComponent";
import { getDate, processPictures, processTags } from "../utils/general-utils";
import { getPicture } from "../utils/pictures-api";
import Tag from "./Tag";

const HomePictures = ({ search, setSearch }) => {
  let { data: { data } = {}, isLoading } = useQuery("pictures", getPicture);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="grid grid-flow-row my-6 mx-14 place-items-center gap-y-8 grid-cols-1 md:grid-cols-2 lg:mx-28 lg:grid-cols-3">
      {/* Images loading & filtering */}
      {processPictures(data, search).map((pic) => (
        <PicComponent key={pic.pic_id} pic={pic}>
          {/* Picture body. Usando composition */}
          <div className="p-5 space-y-1 truncate">
            <h4 className="group-hover:text-green-500 transition-colors duration-300 ease-out font-bold truncate">
              {pic.pic_name}
            </h4>
            <div className="space-y-2">
              <p className="text-sm text-gray-400">
                {getDate(pic.uploaded_date)}
              </p>
              <div class="flex text-sm justify-center space-x-2">
                {processTags(pic.tags).map((tag) => (
                  <Tag key={tag} tag={tag} onClick={() => setSearch(tag)}></Tag>
                ))}
              </div>
            </div>
          </div>
        </PicComponent>
      ))}
    </div>
  );
};

export default HomePictures;
