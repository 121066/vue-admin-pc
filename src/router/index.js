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
  },
]
export const routerPath = [...Home, ...admin]
const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: adminRouter.concat(routerPath),
})
export default router
