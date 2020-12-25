import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './static/css/reset.css'
import axios from 'axios'

// 全局设置 axios 发送请求带上cookie
axios.defaults.withCredentials = true
// 使用组件
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
