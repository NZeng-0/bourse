import { createApp } from 'vue'
import * as echarts from 'echarts'
import App from './App.vue'
import type { UserModule } from './types'
import router from './router'
import pinia from './store'
// import loading from './components/loading'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import './styles/fonts.css'
import 'uno.css'

const app = createApp(App)

Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
  .forEach(i => i.install?.(app))
app.config.globalProperties.$echarts = echarts
app.use(router)
app.use(pinia)
// app.use(loading)
app.mount('#app')
