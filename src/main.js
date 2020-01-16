import Vue from 'vue'
import App from './App.vue'
// 导入通用样式
import './styles/base.css'
import './styles/iconfont.css'
import 'lib-flexible'
import router from './router/index'
import vant from 'vant'
import 'vant/lib/index.css'
import axios from 'axios'

// 导入自己封装的插件
import HmButton from './components/HmButton.vue'
import HmInput from './components/HmInput.vue'
import HmNav from './components/HmNav.vue'
import InfoTitle from './components/InfoTitle.vue'
import FocusContent from './components/FocusContent.vue'

Vue.component('HmButton', HmButton)
Vue.component('HmInput', HmInput)
Vue.component('HmNav', HmNav)
Vue.component('InfoTitle', InfoTitle)
Vue.component('FocusContent', FocusContent)

Vue.config.productionTip = false

// axios优化
Vue.prototype.$axios = axios
// 给axios设置默认的baseURL
axios.defaults.baseURL = 'http://localhost:3000'
Vue.use(vant)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
