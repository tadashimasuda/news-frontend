import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {VueMasonryPlugin} from 'vue-masonry'
import store from  './store'

Vue.config.productionTip = false

Vue.use(VueMasonryPlugin,VueAxios, axios)
new Vue({
  vuetify,
  router,
  store,
  VueMasonryPlugin,
  render: h => h(App)
}).$mount('#app')
