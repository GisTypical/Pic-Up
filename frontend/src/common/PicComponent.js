import React from "react";
import { Link } from "react-router-dom";
import Tag from "../pictures/Tag";
import { getDate } from "../utils/date-utils";

const PicComponent = ({ pic }) => {
  return (
    <article className="grid grid-flow-row grid-rows-2 text-center bg-gray-800 h-64 w-48 rounded-2xl overflow-hidden group">
      <Link
        to={`/home/picture/${pic.pic_id}`}
        className="grid place-items-center overflow-hidden"
      >
        <img
          className="transform group-hover:scale-110 transition-transform ease-out duration-300"
          src={`/uploads/${pic.img_path}`}
          alt={pic.pic_name}
        />
      </Link>
      <div className="p-5 space-y-1 truncate">
        <h4 className="group-hover:text-green-500 transition-colors duration-300 ease-out font-bold">
          {pic.pic_name}
        </h4>
        <div className="space-y-2">
          <p className="text-sm text-gray-400">{getDate(pic.uploaded_date)}</p>
          <div class="flex text-sm justify-center space-x-2">
            {pic.tags.map((tag) => (
              <Tag key={tag} tag={tag}></Tag>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default PicComponent;
