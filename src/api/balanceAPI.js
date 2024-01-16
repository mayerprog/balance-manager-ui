import axios from "axios";
const { baseURL } = require("../config.js");

const path = "/balance";

const instance = axios.create({
  baseURL: baseURL + path,
  withCredentials: true,
});

export const balanceAPI = {
  async getBalance(id) {
    try {
      const response = await instance.get(`/getBalance/${id}`);
      return response.data;
    } catch (err) {
      alert(err);
    }
  },
};
