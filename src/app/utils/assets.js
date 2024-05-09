export const BASE_URL = "https://urchin-app-44s76.ondigitalocean.app/api/v1";

import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
