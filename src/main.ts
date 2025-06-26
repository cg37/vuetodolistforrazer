import { createApp } from "vue";
import "@/style.scss";
import App from "@/App.vue";
import router from "@/router/index";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createPinia } from "pinia";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
createApp(App).use(pinia).use(router).mount("#app");
