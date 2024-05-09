import { axiosInstance } from "../utils/assets";

import { BASE_URL } from "../utils/assets";

export const poServices = {
  getAllPo: async (data) => {
    try {
      const token = localStorage.getItem("x-access-token");
      if (token) {
        axiosInstance.defaults.headers.common["x-access-token"] = token;
        const response = await axiosInstance.get(`${BASE_URL}/getAllPO`);
        console.log("response from allpo service=====", response.data);

        return response.data;
      } else {
        throw new Error("Token not available");
      }
    } catch (error) {
      throw { message: error.response.data };
    }
  },

  createPO: async (data) => {
    try {
      const token = localStorage.getItem("x-access-token");
      if (token) {
        axiosInstance.defaults.headers.common["x-access-token"] = token;
        const response = await axiosInstance.post(
          `${BASE_URL}/createNewPO`,
          data
        );
        console.log("response from create service=====", response.data);
        return response.data;
      } else {
        throw new Error("Token not available");
      }
    } catch (error) {
      throw { message: error.response.data };
    }
  },

  updatePoStatus: async (poId, data) => {
    try {
      const token = localStorage.getItem("x-access-token");
      if (token) {
        axiosInstance.defaults.headers.common["x-access-token"] = token;
        const response = await axiosInstance.patch(
          `${BASE_URL}/updatePO/${poId}`,
          data
        );
        return response.data;
      } else {
        throw new Error("Token not available");
      }
    } catch (error) {
      throw { message: error.response.data };
    }
  },
};
