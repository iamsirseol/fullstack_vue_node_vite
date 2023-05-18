import { createNamespacedHelpers } from "vuex";
import axiosInstance from "../../util/index";
export const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers("account");

export default {
  namespaced: true,
  state: {
    SIGNIN_RESULT: null,
    SIGNUP_RESULT: null,
  },
  getters: {},
  mutations: {
    SET_SIGNIN(state, payload) {
      state.SIGNIN_RESULT = payload;
    },
    SET_SIGNUP(state, payload) {
      state.SIGNUP_RESULT = payload;
    },
  },
  actions: {
    async SIGNIN_USER({ commit }, payload) {
      try {
        const response = await axiosInstance.post(`/account/signin`, payload);
        commit("SET_SIGNIN", response);
      } catch (error) {
        commit("SET_SIGNIN", null);
        throw Error(error);
      }
    },
    async SIGNUP_USER({ commit }, payload) {
      try {
        const response = await axiosInstance.post(`/account/signup`, payload);
        commit("SET_SIGNUP", response);
      } catch (error) {
        commit("SET_SIGNUP", null);
        throw Error(error);
      }
    },
  },
};
