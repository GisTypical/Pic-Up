import React from "react";
import { useQuery } from "react-query";
import PicComponent from "../common/PicComponent";
import { getDate } from "../utils/date-utils";
import { getPicture } from "../utils/pictures-api";
import Tag from "./Tag";

const HomePictures = ({ search, setSearch }) => {
  const { data: { data } = {}, isLoading } = useQuery("pictures", getPicture);
  return (
    <div className="grid grid-flow-row my-6 mx-14 place-items-center gap-y-8 grid-cols-1 md:grid-cols-2 lg:mx-28 lg:grid-cols-3">
      {!isLoading &&
        data.pictures
          .filter((pic) => {
            if (!search) {
              return true;
            }
            return pic.tags.includes(search.toLowerCase());
          })
          .map((pic) => (
            <PicComponent key={pic.pic_id} pic={pic}>
              {/* Cuerpo del card. Usando composition, no quiero hacer más prop drilling*/}
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
                      <Tag
                        key={tag}
                        tag={tag}
                        onClick={() => setSearch(tag)}
                      ></Tag>
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
