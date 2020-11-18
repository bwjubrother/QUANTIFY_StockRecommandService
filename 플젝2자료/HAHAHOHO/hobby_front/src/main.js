import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueFullPage from 'vue-fullpage.js'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$EventBus = new Vue()
Vue.use(VueFullPage)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
