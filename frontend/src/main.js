import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./asstes/css/base.less";
import store from "./store";
import i18n from "./i18n";

createApp(App).use(router).use(store).use(i18n).mount("#app");
