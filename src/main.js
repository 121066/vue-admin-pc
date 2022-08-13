import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'

import './style/elementui.scss'
import './style/index.css'
import './style/index.scss'
// import 'element-ui/lib/theme-chalk/index.css'
import './permission'
Vue.config.productionTip = false
Vue.use(Element)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
