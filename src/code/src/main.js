import Vue from 'vue'
import App from './App'

import 'element-ui/lib/theme-chalk/index.css'
import {Button, Row, Col, Icon, Cascader, Dialog} from 'element-ui'

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Icon)
Vue.use(Cascader)
Vue.use(Dialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
