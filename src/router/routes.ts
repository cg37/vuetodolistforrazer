import type { RouteRecordRaw } from "vue-router";
import { ERouterPath } from "@/model/const";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: { name: ERouterPath.TodoHome }
  },
  {
    path: `/${ERouterPath.TodoHome}`,
    name: ERouterPath.TodoHome,
    component: () => import("../pages/TodoPage/TodoHome.vue")
  },
  {
    path: `/${ERouterPath.InProgress}`,
    name: ERouterPath.InProgress,
    component: () => import("../pages/InProgress/InProgress.vue")
  },
  {
    path: `/${ERouterPath.Completed}`,
    name: ERouterPath.Completed,
    component: () => import("../pages/Completed/CompletedTasks.vue")
  }
];

export default routes;
