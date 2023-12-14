import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/kupine',
    name: 'Kupine',

    component: () => import(/* webpackChunkName: "about" */ '../views/Kupine.vue')
  },
  {
    path: '/maline',
    name: 'Maline',

    component: () => import(/* webpackChunkName: "about" */ '../views/Maline.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
