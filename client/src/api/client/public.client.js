import axios from "axios";
import queryString from "query-string";

// const baseURL = "https://moonflix-api.vercel.app/api/v1/";
const baseURL = "http://localhost:5000/api/v1/";

const publicClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

publicClient.interceptors.request.use(async (config) => {
  console.log("inside the public client");

  return {
    ...config,
    headers: {
      Range: "bytes=0-1000000",
      "Content-Type": "application/json",
      // "Access-Control-Allow-Origin": "http://localhost:5500",
    },
  };
});

publicClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    throw err.response.data;
  }
);

export default publicClient;
