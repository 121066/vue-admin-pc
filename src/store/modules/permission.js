import { adminRouter, routerPath } from '@/router'
export default {
  namespaced: true,
  state: {
    routes: [],
    rot: adminRouter,
  },
  mutations: {
    SET_ROUTES: (state, rot) => {
      state.routes = adminRouter
    },
  },
  actions: {
    // generateRoutes({ commit }, roles) {
    //   return new Promise((resolve) => {
    //     let accessedRoutes
    //     if (roles.includes('admin')) {
    //       accessedRoutes = routerPath || []
    //     } else {
    //       accessedRoutes = filterAsyncRoutes(routerPath, roles)
    //     }
    //     commit('SET_ROUTES', accessedRoutes)
    //     resolve(accessedRoutes)
    //   })
    // },
  },
  getters: {
    // getRout(state) {
    //   return state.rot
    // },
  },
}
