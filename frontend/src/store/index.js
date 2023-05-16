import { createStore } from "vuex";
import account from "./module/account";

export default createStore({
  modules: {
    account,
  },
});
