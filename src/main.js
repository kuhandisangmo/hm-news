import Vue from 'vue'
import App from './App.vue'
// 导入通用样式
import './styles/base.css'
import './styles/iconfont.css'
import 'lib-flexible'
import router from './router/index'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
