import Vue from 'vue'
import App from './App'
import router from './router'

import 'element-ui/lib/theme-chalk/index.css'
import {Button, Row, Col, Icon, Cascader, Dialog, Input} from 'element-ui'

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Icon)
Vue.use(Cascader)
Vue.use(Dialog)
Vue.use(Input)

router.beforeEach((to, from, next) => {
  if (router.authTable[to.path] && !localStorage.getItem('USER_LOKEN')) next('/login')
  else next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
