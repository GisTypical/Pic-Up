import { LinkBreak } from "phosphor-react";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../common/Loading";
import { getPictureInfo } from "../utils/pictures-api";
import Tag from "./Tag";

const PicturePage = () => {
  const params = useParams();
  const [error, setError] = useState(false);

  const { data, isLoading } = useQuery(["pic_info", params], async () => {
    const a = await getPictureInfo(params.pic_id);
    return a.data;
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="grid place-items-center">
      {!isLoading && (
        <article className="flex flex-row bg-gray-800 rounded-2xl p-10 w-[650px]">
          <div className="flex flex-col w-1/2 justify-center space-y-1">
            <h1 className="font-heading font-bold text-xl">{data.pic_name}</h1>
            {!error ? (
              <img
                className="transform group-hover:scale-110 transition-transform ease-out duration-300 rounded-lg"
                onError={() => {
                  setError(true);
                }}
                src={`/uploads/${data.img_path}`}
                alt={data.pic_name}
              />
            ) : (
              <figure className="grid place-items-center">
                <LinkBreak size={34} weight="duotone" />
              </figure>
            )}
          </div>
          <div className="flex-1 flex flex-col space-y-5 px-16 justify-center">
            <p>
              Subido por:
              <br />
              <strong className="font-bold text-green-500">
                {data.username}
              </strong>
            </p>
            <p>
              Fecha de subida:
              <br />
              <strong className="font-bold text-green-500">
                {data.uploaded_date}
              </strong>
            </p>
            <div class="flex space-x-2">
              {data.tags.sort().map((tag) => (
                <Tag key={tag} tag={tag} onClick={() => {}}></Tag>
              ))}
            </div>
          </div>
        </article>
      )}
    </div>
  );
};

export default PicturePage;
