import type { RouteRecordRaw } from "vue-router";
import { ERouterPath } from "@/model/const";
const routes: RouteRecordRaw[] = [
  {
    path: "/#",
    redirect: { name: ERouterPath.TodoHome }
  },
  {
    path: `/${ERouterPath.TodoHome}`,
    name: ERouterPath.TodoHome,
    component: () => import("../pages/TodoPage/HomeTodo.vue")
  },
  {
    path: `/${ERouterPath.InProgress}`,
    name: ERouterPath.InProgress,
    component: () => import("../pages/InProgress/InProgress.vue")
  }
];

export default routes;
