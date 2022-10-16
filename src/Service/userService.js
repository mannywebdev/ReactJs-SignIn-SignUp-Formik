import axios from "axios";
import { Constants } from "../Constants";

const signIn = (data) => {
  return axios.post(`${Constants.baseUrl}/api/login`, data);
};

const signUp = (data) => {
  return axios.post(`${Constants.baseUrl}/api/register`, data);
};

export const userService = {
  signIn,
  signUp,
};
