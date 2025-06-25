import { createApp } from "vue";
import "@/scss/style.scss";
import App from "@/App.vue";
import router from "@/router/index";
import { createPinia } from "pinia";

const pinia = createPinia();
createApp(App).use(pinia).use(router).mount("#app");
