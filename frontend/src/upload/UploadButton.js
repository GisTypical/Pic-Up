import { CheckCircle, Upload } from "phosphor-react";
import React, { useRef } from "react";
import Loading from "../common/Loading";

const UploadButton = ({ isPosting }) => {
  const ref = useRef({ files: [] });

  return (
    <label
      htmlFor="picture"
      className="bg-gray-700 flex flex-col place-items-center rounded-2xl p-10 text-center cursor-pointer truncate"
    >
      {ref.current.files[0] ? (
        <>
          {!isPosting ? (
            <CheckCircle
              className="text-green-500"
              size={32}
              weight="duotone"
            ></CheckCircle>
          ) : (
            <Loading />
          )}
          <p className="text-green-500 font-bold">
            {ref.current.files[0].name}
          </p>
        </>
      ) : (
        <>
          <Upload size={32} weight="duotone"></Upload>
          <p>Seleccione una imágen</p>
        </>
      )}
      <input
        ref={ref}
        className="hidden"
        type="file"
        name="picture"
        id="picture"
      />
    </label>
  );
};

export default UploadButton;
