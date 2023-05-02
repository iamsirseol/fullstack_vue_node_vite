import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./asstes/css/base.less";

createApp(App).use(router).mount("#app");
