import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'
import * as echarts from 'echarts'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import './styles/fonts.css'
import 'uno.css'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
})
app.config.globalProperties.$echarts = echarts
app.use(router)
app.mount('#app')
