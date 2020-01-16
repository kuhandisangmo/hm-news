import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/login.vue'
import Register from '../pages/Register.vue'
import Profile from '../pages/profile.vue'
import Focus from '../pages/focus.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  // 配置路由规则
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' },
    { path: '/profile', component: Profile, name: 'profile' },
    { path: '/focus', component: Focus, name: 'focus' }

  ]
})

export default router
