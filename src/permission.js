import router from './router'
import store from './store'
import { getCookies } from '@/utils/cookies'
const whiteList = ['/login', '/auth-redirect']
router.beforeEach(async (to, from, next) => {
  console.log(to, '???')
  if (getCookies()) {
    if (to.path === '/login') return next({ path: '/' })
    const tokenStr = getCookies('web-token')
    if (!tokenStr) return next('/login')
    next()
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
    next()
  }
})
