import { LinkBreak } from "phosphor-react";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import Loading from "../common/Loading";
import { getDate } from "../utils/general-utils";
import { deletePicture, getPictureInfo } from "../utils/pictures-api";
import Tag from "./Tag";

const PicturePage = ({ username }) => {
  const params = useParams();
  const queryClient = useQueryClient();
  const history = useHistory();
  const [error, setError] = useState(false);

  const { data, isLoading } = useQuery(["pic_info", params], async () => {
    const a = await getPictureInfo(params.pic_id);
    return a.data;
  });

  const { mutate: deletePic } = useMutation(deletePicture, {
    onSuccess: () => {
      history.push("/home");
      queryClient.invalidateQueries("pictures");
    },
  });

  const handleClick = () => {
    deletePic({ pic_id: data.pic_id });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="grid place-items-center">
      {
        <article className="flex flex-row bg-gray-800 rounded-2xl py-10 px-8 w-[700px]">
          <div className="flex flex-col w-1/2 justify-center space-y-2 ml-3">
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
          <div className="flex-1 flex flex-col space-y-5 ml-14 px-4 justify-center">
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
                {getDate(data.uploaded_date)}
              </strong>
            </p>
            {/* Tags */}
            <div class="flex flex-wrap space-x-2">
              {data.tags.sort().map((tag) => (
                <Tag key={tag} tag={tag} onClick={() => {}}></Tag>
              ))}
            </div>
            {username === data.username && (
              <button
                className="bg-red-500 px-3 py-2 text-sm font-bold text-gray-800 rounded-lg"
                onClick={handleClick}
              >
                Eliminar imagen
              </button>
            )}
          </div>
        </article>
      }
    </div>
  );
};

export default PicturePage;
