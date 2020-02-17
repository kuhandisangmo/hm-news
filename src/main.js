import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
// 导入lib-flexible
import 'lib-flexible'
// 导入通用样式
import './styles/base.css'
// 导入字体图标
import './styles/iconfont.css'
// 导入axios
import axios from 'axios'
// 导入整个vant
import vant, { Toast } from 'vant'
import 'vant/lib/index.css'
// 导入自己封装的插件
import HmButton from './components/HmButton.vue'
import HmInput from './components/HmInput.vue'
import HmNav from './components/HmNav.vue'
import InfoTitle from './components/InfoTitle.vue'
import FocusContent from './components/FocusContent.vue'
import moment from 'moment'
import HmArticle from './components/HmArticle.vue'

Vue.component('HmButton', HmButton)
Vue.component('HmInput', HmInput)
Vue.component('HmNav', HmNav)
Vue.component('InfoTitle', InfoTitle)
Vue.component('FocusContent', FocusContent)
Vue.component('HmArticle', HmArticle)

Vue.use(vant)
Vue.config.productionTip = false

// axios优化
Vue.prototype.$axios = axios
// 给axios设置默认的baseURL
axios.defaults.baseURL = 'http://localhost:3000'

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做一些通用处理
  // 判断状态码是否是401，并且信息是否是用户信息验证失败
  if (response.data.statusCode === 401 && response.data.message === '用户信息验证失败') {
    // 只要token校验失败就去登录页
    router.push('/login')

    // 把过期的信息删除
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')

    // 再给一个提示消息
    Toast.fail('用户信息验证失败')
  }
  return response
}, function (error) {
  // 对此昂应错误有点表示
  return Promise.reject(error)
})

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log('拦截请求', config)
  // 如果有token，我们就给接口携带上token
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 提供一个通用的处理路径的方法
Vue.prototype.$fixUrl = function (url) {
  if (url.startsWith('http')) {
    return url
  } else {
    return axios.defaults.baseURL + url
  }
}
// -----------------过滤器-----------------------------
Vue.filter('time', function (input, format = 'YYYY-MM-DD') {
  return moment(input).format(format)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
