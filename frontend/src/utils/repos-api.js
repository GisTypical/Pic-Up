import axios from "axios";

export const getRepos = (username) => {
  return axios.get(`/api/repos?username=${username}`);
};
