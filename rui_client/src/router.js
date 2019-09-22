import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home';
import Login from './views/login';

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
  ]
})

router.beforeEach((to, from, next) => {
  let rootPath = to.fullPath.split('/').pop()
  let whiteList = [
    "login"
  ]
  if (localStorage.getItem('login_token') || whiteList.indexOf(rootPath) !== -1) {
    localStorage.setItem("token_overdue", "false")
    next();
  } else {
    localStorage.setItem("token_overdue", "true")
    console.warn("你需要先进行登录")
    next('/login')
  }
})


export default router
