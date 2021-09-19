import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: () => import('../components/pages/index.vue')
  },
  {
    path: '/login',
    component: () => import('../components/pages/login.vue')
  },
  {
    path: '/register',
    component: () => import('../components/pages/register.vue')
  }
]

const router = new Router({
  routes,
  mode: 'history'
})

router.authTable = {
  '/': true,
  '/login': false,
  '/register': false
}

export default router
