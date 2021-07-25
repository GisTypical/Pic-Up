import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getPictureInfo } from "../utils/pictures-api";
import Tag from "./Tag";

const ImagePage = () => {
  const params = useParams();
  const { data, isLoading } = useQuery(["pic_info", params], async () => {
    const a = await getPictureInfo(params.pic_id);
    return a.data;
  });
  return (
    <div className="grid place-items-center">
      {!isLoading && (
        <article className="flex flex-row bg-gray-800 rounded-2xl p-10 w-[650px]">
          <div className="flex flex-col w-1/2 justify-center space-y-1">
            <h1 className="font-heading font-bold text-xl">{data.pic_name}</h1>
            <img
              className="rounded-2xl"
              src={`/uploads/${data.img_path}`}
              alt={data.pic_name}
            />
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
            <div class="flex space-x-2 truncate">
              {data.tags.map((tag) => (
                <Tag key={tag} tag={tag}></Tag>
              ))}
            </div>
          </div>
        </article>
      )}
    </div>
  );
};

export default ImagePage;
