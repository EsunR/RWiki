import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './plugins/element.js'
import axios from 'axios';
import VueAxios from 'vue-axios';
import serverConfig from './config/server_config'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

axios.defaults.baseURL = serverConfig.apiUrl

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
