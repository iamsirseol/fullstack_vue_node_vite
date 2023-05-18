import { createNamespacedHelpers } from "vuex";
import axiosInstance from "../../util/index";
export const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers("modal");

export default {
  namespaced: true,
  state: {
    IS_OPEN: false,
    MODAL_DATA: { header: "", body: "" },
  },
  getters: {},
  mutations: {
    SET_IS_OPEN(state, payload) {
      state.IS_OPEN = payload;
    },
    SET_MODAL_DATA(state, payload) {
      state.MODAL_DATA = payload;
    },
  },
  actions: {
    CLOSE_MODAL({ commit }) {
      commit("SET_IS_OPEN", false);
      commit("SET_MODAL_DATA", null);
    },
    OPEN_MODAL({ commit }, payload) {
      commit("SET_IS_OPEN", true);
      commit("SET_MODAL_DATA", payload);
    },
  },
};
