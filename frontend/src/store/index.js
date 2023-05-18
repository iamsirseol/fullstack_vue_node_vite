import { createStore } from "vuex";
import account from "./module/account";
import modal from "./module/modal";

export default createStore({
  modules: {
    account,
    modal,
  },
});
