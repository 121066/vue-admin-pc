import router from './router'
import store from './store'
import { getCookies } from '@/utils/cookies'
router.beforeEach(async (to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = getCookies('web-token')
  if (!tokenStr) return next('/login')
  next()
})
