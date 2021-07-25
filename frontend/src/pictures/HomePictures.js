import React from "react";
import { useQuery } from "react-query";
import PicComponent from "../common/PicComponent";
import { getPicture } from "../utils/pictures-api";

const HomePictures = ({ search }) => {
  const { data: { data } = {}, isLoading } = useQuery("pictures", getPicture);
  return (
    <div className="grid grid-flow-row mt-6 mx-14 place-items-center grid-cols-2 gap-y-8 lg:mx-28 lg:grid-cols-3">
      {!isLoading &&
        data.pictures
          .filter((pic) => {
            if (!search) {
              return true;
            }
            return pic.tags.includes(search.toLowerCase());
          })
          .map((pic) => (
            <PicComponent key={pic.pic_id} pic={pic}></PicComponent>
          ))}
    </div>
  );
};

export default HomePictures;
