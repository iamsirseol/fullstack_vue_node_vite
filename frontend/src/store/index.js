import Vue from "vue";
import Vuex, { createStore } from "vuex";
import account from "./module/account";

Vue.use(Vuex);

const store = createStore({
  modules: {
    account,
  },
});

export default store;
// export default new Vuex.Store({
//   //   plugins: [createPersistedState()],
//   modules: {
//     account,
//   },
// });
