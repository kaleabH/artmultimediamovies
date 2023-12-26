import axios from "axios";
import queryString from "query-string";

// const baseURL = "https://moonflix-api.vercel.app/api/v1/";
const baseURL = "http://localhost:5000/api/v1/";

const privateFormClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

privateFormClient.interceptors.request.use(async (config) => {
  console.log("inside the private multipart client");
  return {
    ...config,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("actkn")}`,
      // "Access-Control-Allow-Origin": "http://localhost:5500",
    },
  };
});

privateFormClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    throw err.response.data;
  }
);

export default privateFormClient;
