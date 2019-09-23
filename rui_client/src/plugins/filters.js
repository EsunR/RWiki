import Vue from 'vue';
import moment from 'moment';
Vue.filter('formatTime', function (val) {
  return moment(val).format('YYYY-MM-DD HH:MM')
})