import axios from "axios";

export const postPicture = (form) => {
  return axios.post("/api/picture", form);
};

export const getPicture = () => {
  return axios.get("/api/picture");
};

export const deletePicture = (pic_id) => {
  return axios({
    method: "delete",
    url: "/api/picture",
    data: pic_id,
  });
};

export const getPictureInfo = (pic_id) => {
  return axios.get(`/api/picture/${pic_id}`);
};
