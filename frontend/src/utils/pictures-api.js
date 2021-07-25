import axios from "axios";

export const postPicture = (form) => {
  return axios.post("/api/picture", form);
};

export const getPicture = () => {
  return axios.get("/api/picture");
};

export const getPictureInfo = (pic_id) => {
  return axios.get(`/api/picture/${pic_id}`);
};
