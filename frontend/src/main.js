import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./asstes/css/base.less";
import store from "./store";

createApp(App).use(router).use(store).mount("#app");
