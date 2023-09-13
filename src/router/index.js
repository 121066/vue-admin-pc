import Layout from "@/layout/index.vue";
import Vue from "vue";
import Router from "vue-router";
import { admin } from "./modules/admin";
import { chart } from "./modules/chart";
import { Home } from "./modules/home";
import { jsPlumb } from "./modules/jsPlumb";
import { keyProject } from "./modules/keyProject";
Vue.use(Router);
export const adminRouter = [
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        component: () => import("@/pages/home/index"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/pages/login/index"),
    hidden: true,
  },
];
export const routerPath = [
  ...Home,
  ...admin,
  ...keyProject,
  ...chart,
  ...jsPlumb,
];
const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: adminRouter.concat(routerPath),
  });
const router = createRouter();
export default router;
