import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'
import Articles from '../views/articles.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/articles',
    name: 'articles',
    component: Articles
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
