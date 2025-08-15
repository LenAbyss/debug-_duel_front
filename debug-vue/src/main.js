import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// import { BootstrapVue3, BTooltip } from 'bootstrap-vue-3'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import axios from 'axios'
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.warn('偵測到 401，自動跳轉首頁')
      router.push('/')  // 或 '/login'
    }
    return Promise.reject(error)// 把錯誤傳回去給原本的呼叫者
  }
)

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
app.use(pinia)
// app.use(BootstrapVue3)
// app.directive('b-tooltip', BTooltip)
app.use(router)
app.mount('#app')
