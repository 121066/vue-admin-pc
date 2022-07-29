import router from './router'
import store from './store'
router.beforeEach(async (to, from, next) => {
  // start progress bar
  // set page title
  // determine whether the user has logged in
  // if (true) {
  //   if (to.path === '/login') {
  //     // if is logged in, redirect to the home page
  //     next({ path: '/' })
  //   } else {
  //     // determine whether the user has obtained his permission roles through getInfo
  //     const hasRoles = store.getters.roles && store.getters.roles.length > 0
  //     const roles = ['admin']
  //     // generate accessible routes map based on roles
  //     // const accessRoutes = await store.dispatch(
  //     //   'permission/generateRoutes',
  //     //   roles
  //     // )
  //     // // dynamically add accessible routes
  //     // router.addRoutes(accessRoutes)
  //     // // hack method to ensure that addRoutes is complete
  //     // set the replace: true, so the navigation will not leave a history record
  //     next({ ...to, replace: true })
  //   }
  // } else {
  //   /* has no token*/
  // }
  console.log('??')
  next()
})
