import { createNamespacedHelpers } from "vuex";
import axiosInstance from "../../util/index";
export const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers("account");

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async SIGNIN_USER({ commit }, payload) {
      try {
        const response = await axiosInstance.post(`/api/v1/account/signin`, payload);
        return response.data.data;
      } catch (e) {
        return null;
      }
    },
    async SIGNUP_USER({ commit }, payload) {
      try {
        const response = await axiosInstance.post(`/api/v1/account/signup`, payload);
        return response.data.data;
      } catch (e) {
        return null;
      }
    },
  },
};
