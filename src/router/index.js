import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/index.vue'
import { admin } from './modules/admin'
import { Home } from './modules/home'
Vue.use(Router)
export const adminRouter = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/pages/home/index'),
      },
    ],
  },
  ...Home,
  ...admin,
  {
    path: '/login',
    component: () => import('@/pages/login/index'),
    hidden: true,
  },
]
export const routerPath = [...Home, ...admin]
const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: adminRouter,
  })
const router = createRouter()
export default router
