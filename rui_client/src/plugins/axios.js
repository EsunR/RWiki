import axios from 'axios';
import baseConfig from '../config/base_config'

axios.defaults.baseURL = baseConfig.apiUrl
axios.defaults.headers.common['Authorization'] = localStorage.getItem('login_token')
axios.interceptors.response.use(function (response) {
  if (response.data && response.data.msg && response.data.msg !== 'ok') {
    console.log(`Message Error: ${response.data.msg}`);
    return Promise.reject(response.data.msg);
  } else {
    return response;
  }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default axios