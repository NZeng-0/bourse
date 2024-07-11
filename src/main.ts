import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'
import * as echarts from 'echarts'
import App from './App.vue'
import type { UserModule } from './types'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import './styles/fonts.css'
import 'uno.css'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
})

Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
  .forEach(i => i.install?.(app))
app.config.globalProperties.$echarts = echarts
app.use(router)
app.mount('#app')
