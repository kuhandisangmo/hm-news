import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/login.vue'
import Register from '../pages/Register.vue'
import Profile from '../pages/profile.vue'
import Focus from '../pages/focus.vue'
import EditProfile from '../pages/eidtProfile.vue'
import Test from '../pages/test.vue'
import MyComments from '../pages/myComments.vue'
import MyStar from '../pages/myStar.vue'
import Home from '../pages/home.vue'
import PostDetail from '../pages/postDetail.vue'
import TabManager from '../pages/tabManager.vue'
import Search from '../pages/search.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  // 配置路由规则
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home, name: 'home' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' },
    { path: '/profile', component: Profile, name: 'profile' },
    { path: '/focus', component: Focus, name: 'focus' },
    { path: '/edit-profile', component: EditProfile, name: 'edit-profile' },
    { path: '/test', component: Test, name: 'test' },
    { path: '/my-comments', component: MyComments, name: 'my-comments' },
    { path: '/my-star', component: MyStar, name: 'my-star' },
    // 动态路由参数
    { path: '/post-detail/:id', component: PostDetail, name: 'post-detail' },
    { path: '/tab-manager', component: TabManager, name: 'tab-manager' },
    { path: '/search', component: Search, name: 'search' }
  ]
})
// 给路由注册前置导航守卫
// to 到哪去
// from 从哪来
// next 是一个函数， next(),代表放行

// 需要授权的路径
const AuthUrls = [
  '/profile',
  '/edit-profile',
  '/focus',
  '/my-comments',
  '/my-star'
]
router.beforeEach(function (to, from, next) {
// 判断用户是否登陆
  const token = localStorage.getItem('token')
  // 如果去个人中心，需要判断是否登录
  //   如果有token，说明，登录了，继续
  //   如果没有token，没有没有登录，去登录
  // 如果不是去个人中心，不判断，直接去
  // 判断数组是否包含某个值

  if (AuthUrls.includes(to.path)) {
    if (token) {
      next()
    } else {
      // next('/login')
      router.push('/login')
    }
  } else {
    next()
  }
})

export default router
