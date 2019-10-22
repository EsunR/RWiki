import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/center-views/home';

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/center',
    },
    {
      path: '/login',
      component: () => import('./views/login')
    },
    {
      path: '/center',
      component: () => import('./views/center'),
      redirect: '/center/home',
      children: [
        {
          path: 'home',
          component: Home
        }
      ]
    },
    {
      path: '/project/:pid',
      // 异步加载组件
      component: () => import('./views/project'),
      props: true
    }
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
