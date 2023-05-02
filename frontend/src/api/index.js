import axiosInstance from "../util";

export default {
  getHello: () => {
    return axiosInstance({
      url: "/hello",
      method: "get",
    });
  },
  getUsers: () => {
    return axiosInstance({
      url: "/users",
      method: "get",
    });
  },
};
