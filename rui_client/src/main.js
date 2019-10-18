import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import globalAxios from './plugins/axios';
import VueAxios from 'vue-axios';
import './plugins/element.js'
import './plugins/filters';
import './global/global.scss';


Vue.config.productionTip = false
Vue.use(VueAxios, globalAxios)




new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
