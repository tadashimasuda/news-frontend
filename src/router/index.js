import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'
import Articles from '../views/articles.vue'
import Callback from '../views/oauth/twitter/callback.vue'
import Redirect from '../views/oauth/twitter/redirect.vue'
import NotFoundComponent from '../components/NotfoundComponent'
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
  {
    path: '/oauth/twitter/redirect',
    name: 'redirect',
    component: Redirect
  },
  {
    path: '/oauth/twitter/callback',
    name: 'callback',
    component: Callback
  },
  {
    path: '*', 
    name: 'notFound',
    component: NotFoundComponent 
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
