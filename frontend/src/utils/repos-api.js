import axios from "axios";

export const getRepos = () => {
  return axios.get(`/api/repos`);
};

export const postRepo = (repo) => {
  return axios.post(`/api/repos`, repo);
};

export const getRepoPictures = (repo) => {
  return axios.get(`/api/repos/${repo}`);
};
