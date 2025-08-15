// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Register from '../components/Register.vue'
import Settings from '../components/Settings_page.vue'
import Log_manager from '../components/Log_manager.vue'
import Data_search from '../components/Data_search.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home', component: Home },
  { path: '/register', component: Register },
  { path: '/settings_page', component: Settings },
  { path: '/log_manager', component: Log_manager },
  { path: '/data_search', component: Data_search },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
