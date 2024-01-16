import axios from "axios";
const { baseURL } = require("../config.js");

const path = "/users";

const instance = axios.create({
  baseURL: baseURL + path,
  withCredentials: true,
});

export const usersAPI = {
  async getUsers() {
    try {
      const response = await instance.get(`/getUsers`);
      return response.data;
    } catch (err) {
      alert(err);
    }
  },
};
