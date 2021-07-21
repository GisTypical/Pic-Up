import axios from "axios";

export const user_signup = (user) => {
  return axios.post("api/signup", user);
};

export const user_login = (user) => {
  return axios.post("api/login", user);
};

export const user_loggedin = () => {
  return axios.get("api/loggedin");
};

export const user_logout = () => {
  return axios.delete("api/logout");
};
