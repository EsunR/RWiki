import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import globalAxios from './plugins/axios';
import VueAxios from 'vue-axios';
import './plugins/element.js'
import './plugins/filters';
import './global/global.scss';
import _ from "lodash";
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.config.productionTip = false
Vue.prototype._ = _

Vue.use(VueAxios, globalAxios)
Vue.use(mavonEditor)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
