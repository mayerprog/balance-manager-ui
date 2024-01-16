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
  async updateBalance(id, amount) {
    try {
      const response = await instance.post(`/updateBalance/${id}`, {
        amount: amount,
      });
      return response.data;
    } catch (err) {
      alert(err);
    }
  },
  async transferFunds(fromUserId, toUserId, amount) {
    try {
      const response = await instance.post(`/transferFunds`, {
        fromUserId: fromUserId,
        toUserId: toUserId,
        amount: amount,
      });
      return response.data;
    } catch (err) {
      alert(err);
    }
  },
};
