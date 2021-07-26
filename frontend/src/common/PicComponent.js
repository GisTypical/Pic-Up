import { LinkBreak } from "phosphor-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const PicComponent = ({ pic, children }) => {
  const [error, setError] = useState(false);
  return (
    <article className="grid grid-flow-row grid-rows-2 text-center bg-gray-800 h-64 w-48 rounded-2xl overflow-hidden group">
      <Link
        to={`/home/picture/${pic.pic_id}`}
        className="grid place-items-center overflow-hidden"
      >
        {!error ? (
          <img
            className="transform group-hover:scale-110 transition-transform ease-out duration-300"
            onError={() => {
              setError(true);
            }}
            src={`/uploads/${pic.img_path}`}
            alt={pic.pic_name}
          />
        ) : (
          <figure className="grid place-items-center">
            <LinkBreak size={34} weight="duotone" />
          </figure>
        )}
      </Link>
      {children}
    </article>
  );
};

export default PicComponent;
