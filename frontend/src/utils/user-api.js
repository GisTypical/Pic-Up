import axios from "axios";

export const user_signup = (user) => {
  return axios.post("/api/signup", user);
};

export const user_login = (user) => {
  return axios.post("/api/login", user);
};

export const user_logout = () => {
  return axios.delete("/api/logout");
};

export const user_loggedin = () => {
  return axios.get("/api/loggedin");
};

export const user_update = (user) => {
  return axios.put("/api/user", user);
};

export const user_delete = () => {
  return axios.delete("/api/user");
};

export const get_full_name = () => {
  return axios.get("/api/user");
};
