import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./routes";

export default createRouter({
  routes,
  history: createWebHashHistory()
});
