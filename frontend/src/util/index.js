import Axios from "axios";

// console.log(process);
const axiosInstance = Axios.create({
  // baseURL: process.env.VUE_APP_LOCALHOST,
  baseURL: "http://localhost:3000",
  timeout: 10000,
});

axiosInstance.interceptors.response.use((res) => {
  return res;
});

axiosInstance.interceptors.request.use((res) => {
  // Token?
  return res;
});

export default axiosInstance;
