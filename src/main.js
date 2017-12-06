// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import VueResource from 'vue-resource'
import axios from 'axios'
// import qs from 'qs'
import ElementUI from 'element-ui'
import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css'

// Vue.use(VueResource)
Vue.use(ElementUI)
Vue.config.productionTip = false
// 开启debug模式
Vue.config.debug = true
axios.defaults.withCredentials = true
axios.defaults.baseURL = '/xdy'
/* 跨域请求跟路径 */
Vue.prototype.HOST = '/xdy'
Vue.prototype.$ajax = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    globalHeader: null
  },
  router,
  template: '<App/>',
  components: { App },
  render: h => h(App)
})
